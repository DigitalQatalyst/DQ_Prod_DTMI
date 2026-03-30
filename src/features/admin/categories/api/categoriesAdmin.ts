import { supabase } from "@/lib/supabase";

export interface AdminCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parentId: string | null;
  filterGroup: string;
  isFilterEnabled: boolean;
  filterDisplayOrder: number;
}

interface RawCategory {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  parent_id: string | null;
  filter_group: string;
  is_filter_enabled: boolean | null;
  filter_display_order: number | null;
}

export interface UpsertAdminCategoryInput {
  name: string;
  slug: string;
  description?: string | null;
  parentId?: string | null;
  filterGroup: string;
  isFilterEnabled?: boolean;
  filterDisplayOrder?: number;
}

const BASE_SELECT =
  "id, name, slug, description, parent_id, filter_group, is_filter_enabled, filter_display_order";

function normalizeCategory(raw: RawCategory): AdminCategory {
  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    description: raw.description,
    parentId: raw.parent_id,
    filterGroup: raw.filter_group,
    isFilterEnabled: raw.is_filter_enabled ?? true,
    filterDisplayOrder: raw.filter_display_order ?? 0,
  };
}

function toDbPayload(input: UpsertAdminCategoryInput) {
  return {
    name: input.name.trim(),
    slug: input.slug.trim(),
    description: input.description?.trim() || null,
    parent_id: input.parentId || null,
    filter_group: input.filterGroup.trim(),
    is_filter_enabled: input.isFilterEnabled ?? true,
    filter_display_order: input.filterDisplayOrder ?? 0,
  };
}

export async function fetchCategoryFilterGroups(): Promise<string[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("filter_group")
    .eq("is_filter_enabled", true)
    .not("filter_group", "is", null);

  if (error) throw error;

  const groups = Array.from(
    new Set((data || []).map((row) => row.filter_group).filter(Boolean)),
  ) as string[];

  return groups.sort((a, b) => a.localeCompare(b));
}

export async function fetchCategoriesByFilterGroup(
  filterGroup: string,
): Promise<AdminCategory[]> {
  const { data, error } = await supabase
    .from("categories")
    .select(BASE_SELECT)
    .eq("filter_group", filterGroup)
    .eq("is_filter_enabled", true)
    .order("filter_display_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) throw error;

  return ((data || []) as RawCategory[]).map(normalizeCategory);
}

export async function createAdminCategory(
  input: UpsertAdminCategoryInput,
): Promise<AdminCategory> {
  const { data, error } = await supabase
    .from("categories")
    .insert(toDbPayload(input))
    .select(BASE_SELECT)
    .single();

  if (error) throw error;

  return normalizeCategory(data as RawCategory);
}

export async function updateAdminCategory(
  id: string,
  input: UpsertAdminCategoryInput,
): Promise<AdminCategory> {
  const { data, error } = await supabase
    .from("categories")
    .update(toDbPayload(input))
    .eq("id", id)
    .select(BASE_SELECT)
    .single();

  if (error) throw error;

  return normalizeCategory(data as RawCategory);
}

export async function deleteAdminCategories(ids: string[]): Promise<void> {
  if (ids.length === 0) return;

  const { error } = await supabase.from("categories").delete().in("id", ids);
  if (error) throw error;
}
