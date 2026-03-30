import { supabase } from "@/lib/supabase";

export interface FlatCategory {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  filterType: string;
  displayOrder: number;
}

export interface CategoryNode {
  id: string;
  name: string;
  slug: string;
  parentId: string | null;
  filterType: string;
  children: CategoryNode[];
}

export interface CategoryTreeGroup {
  filterType: string;
  roots: CategoryNode[];
}

const FILTER_GROUP_ORDER = [
  "content-types",
  "digital-sectors",
  "digital-streams",
  "dbp-domains",
  "content-format",
  "popularity-tags",
];

function buildTree(rows: FlatCategory[]): CategoryNode[] {
  const nodeMap = new Map<string, CategoryNode>();

  for (const row of rows) {
    nodeMap.set(row.id, {
      id: row.id,
      name: row.name,
      slug: row.slug,
      parentId: row.parentId,
      filterType: row.filterType,
      children: [],
    });
  }

  const roots: CategoryNode[] = [];
  for (const row of rows) {
    const node = nodeMap.get(row.id);
    if (!node) continue;

    if (row.parentId && nodeMap.has(row.parentId)) {
      nodeMap.get(row.parentId)?.children.push(node);
    } else {
      roots.push(node);
    }
  }

  const sortNodes = (nodes: CategoryNode[]) => {
    nodes.sort((a, b) => a.name.localeCompare(b.name));
    nodes.forEach((node) => sortNodes(node.children));
  };

  sortNodes(roots);
  return roots;
}

export async function fetchCategoryTreeGroups(): Promise<CategoryTreeGroup[]> {
  const { data, error } = await supabase
    .from("categories")
    .select(
      "id, name, slug, parent_id, filter_group, filter_type, is_filter_enabled, filter_display_order",
    )
    .eq("is_filter_enabled", true)
    .order("filter_display_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) throw error;

  const rows = (data || []).map((row) => {
    const value = row as {
      id: string;
      name: string;
      slug: string;
      parent_id: string | null;
      filter_group?: string | null;
      filter_type?: string | null;
      filter_display_order?: number | null;
    };

    return {
      id: value.id,
      name: value.name,
      slug: value.slug,
      parentId: value.parent_id,
      filterType: value.filter_type || value.filter_group || "general",
      displayOrder: value.filter_display_order ?? 0,
    } satisfies FlatCategory;
  });

  const byGroup = new Map<string, FlatCategory[]>();
  for (const row of rows) {
    const items = byGroup.get(row.filterType) || [];
    items.push(row);
    byGroup.set(row.filterType, items);
  }

  const groups = Array.from(byGroup.entries()).map(([filterType, items]) => ({
    filterType,
    roots: buildTree(items),
  }));

  groups.sort((a, b) => {
    const aIdx = FILTER_GROUP_ORDER.indexOf(a.filterType);
    const bIdx = FILTER_GROUP_ORDER.indexOf(b.filterType);
    const safeA = aIdx === -1 ? Number.MAX_SAFE_INTEGER : aIdx;
    const safeB = bIdx === -1 ? Number.MAX_SAFE_INTEGER : bIdx;
    if (safeA === safeB) return a.filterType.localeCompare(b.filterType);
    return safeA - safeB;
  });

  return groups;
}

export function collectBranchSlugs(node: CategoryNode): string[] {
  const result = [node.slug];
  for (const child of node.children) {
    result.push(...collectBranchSlugs(child));
  }
  return result;
}

export function flattenCategoryTree(
  groups: CategoryTreeGroup[],
): CategoryNode[] {
  const nodes: CategoryNode[] = [];
  const walk = (item: CategoryNode) => {
    nodes.push(item);
    item.children.forEach(walk);
  };

  groups.forEach((group) => group.roots.forEach(walk));
  return nodes;
}
