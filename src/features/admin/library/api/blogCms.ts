import { supabase } from "@/lib/supabase";

export interface AdminBlog {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  heroImage: string;
  type: "blog" | "article";
  publishDate: string | null;
  readTime: number;
  featured: boolean;
  tags: string[];
  authorId: string | null;
  categoryId: string | null;
  sectionId: string | null;
  filterCategoryIds?: string[];
}

interface RawBlog {
  id: string;
  slug: string | null;
  title: string | null;
  excerpt: string | null;
  content: string | null;
  hero_image: string | null;
  type: string | null;
  publish_date: string | null;
  read_time: number | null;
  featured: boolean | null;
  tags: string[] | null;
  author_id: string | null;
  category_id: string | null;
  categories?: {
    parent_id?: string | null;
  } | null;
}

export interface AdminAuthorOption {
  id: string;
  name: string;
  avatarUrl: string | null;
  title: string | null;
}

export interface AdminCategoryOption {
  id: string;
  name: string;
  parentId: string | null;
}

export interface UpsertAdminBlogInput {
  title: string;
  slug?: string;
  excerpt: string;
  content: string;
  heroImage?: string | null;
  readTime: number;
  featured?: boolean;
  tags?: string[];
  authorId: string;
  categoryId: string;
  categoryName: string;
  // Filter category IDs from the junction table
  filterCategoryIds?: string[]; // All selected filter category IDs
}

export type AdminContentItem = AdminBlog;
export type UpsertAdminContentInput = UpsertAdminBlogInput;

export interface BlogSidebarFilterOptions {
  contentTypes: HierarchicalCategory[];
  digitalSectors: HierarchicalCategory[];
  contentFormats: HierarchicalCategory[];
  popularityTags: HierarchicalCategory[];
  dbpDomains: HierarchicalCategory[];
}

export interface HierarchicalCategory {
  id: string;
  name: string;
  parentId: string | null;
  children?: HierarchicalCategory[];
}

type FilterTagKey =
  | "perspective"
  | "stream"
  | "sector"
  | "format"
  | "popularity"
  | "domain";

type CategoryMappingRow = {
  category_id: string;
  categories?: {
    filter_group?: string | null;
    filter_type?: string | null;
  } | null;
};

const BLOG_SELECT =
  "id, slug, title, excerpt, content, hero_image, type, publish_date, read_time, featured, tags, author_id, category_id, categories:category_id(parent_id)";

const FILTER_GROUP_TO_TAG_KEY: Record<string, FilterTagKey | null> = {
  "digital-perspectives": "perspective",
  "digital-streams": "stream",
  "digital-sectors": "sector",
  "content-format": "format",
  "popularity-tags": "popularity",
  "dbp-domains": "domain",
  "content-types": null,
};

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replaceAll(/[^a-z0-9\s-]/g, "")
    .replaceAll(/\s+/g, "-")
    .replaceAll(/-+/g, "-")
    .replaceAll(/^-+|-+$/g, "");
}

function normalizeBlog(raw: RawBlog): AdminBlog {
  return {
    id: raw.id,
    slug: raw.slug || "",
    title: raw.title || "",
    excerpt: raw.excerpt || "",
    content: raw.content || "",
    heroImage: raw.hero_image || "",
    type: raw.type === "article" ? "article" : "blog",
    publishDate: raw.publish_date,
    readTime: raw.read_time ?? 5,
    featured: Boolean(raw.featured),
    tags: raw.tags || [],
    authorId: raw.author_id,
    categoryId: raw.category_id,
    sectionId: raw.categories?.parent_id || null,
  };
}

function normalizeContentItem(raw: RawBlog): AdminContentItem {
  return normalizeBlog(raw);
}

function toFilterTag(key: FilterTagKey, categoryId: string): string {
  return `filter:${key}:${categoryId}`;
}

function mergeFilterTagsIntoTags(
  baseTags: string[],
  mappings: CategoryMappingRow[],
): string[] {
  const withoutExistingFilterTags = baseTags.filter(
    (tag) => !tag.startsWith("filter:"),
  );

  const inferredTags = mappings
    .map((mapping) => {
      const group =
        mapping.categories?.filter_group || mapping.categories?.filter_type;
      if (!group) return null;

      const key = FILTER_GROUP_TO_TAG_KEY[group];
      if (!key) return null;

      return toFilterTag(key, mapping.category_id);
    })
    .filter((tag): tag is string => Boolean(tag));

  return [...new Set([...withoutExistingFilterTags, ...inferredTags])];
}

async function fetchFilterMappings(
  contentId: string,
): Promise<CategoryMappingRow[]> {
  const { data: newMappings, error: newMappingsError } = await supabase
    .from("content_categories")
    .select("category_id, categories:category_id(filter_group, filter_type)")
    .eq("content_id", contentId);

  if (!newMappingsError) {
    return (newMappings || []) as CategoryMappingRow[];
  }

  // Backward compatibility: fallback to legacy mapping table if needed.
  const { data: legacyMappings, error: legacyError } = await supabase
    .from("content_filter_category_mapping")
    .select("category_id, categories:category_id(filter_group, filter_type)")
    .eq("content_id", contentId);

  if (legacyError) throw legacyError;

  return (legacyMappings || []) as CategoryMappingRow[];
}

function toDbPayload(
  input: UpsertAdminContentInput,
  contentType: "blog" | "article" = "blog",
) {
  const slug = slugify(input.slug?.trim() || input.title);
  return {
    slug,
    title: input.title.trim(),
    excerpt: input.excerpt.trim(),
    content: input.content,
    hero_image: input.heroImage?.trim() || null,
    type: contentType,
    category: input.categoryName,
    read_time: input.readTime,
    featured: input.featured ?? false,
    tags: input.tags || [],
    author_id: input.authorId,
    category_id: input.categoryId,
  };
}

function findCategoryInHierarchy(
  items: HierarchicalCategory[],
  id: string,
): HierarchicalCategory | null {
  for (const item of items) {
    if (item.id === id) return item;
    if (item.children?.length) {
      const match = findCategoryInHierarchy(item.children, id);
      if (match) return match;
    }
  }
  return null;
}

export function getCategoryNameById(
  items: HierarchicalCategory[],
  id: string,
): string | null {
  const match = findCategoryInHierarchy(items, id);
  return match?.name || null;
}

export async function uploadBlogHeroImage(file: File): Promise<string> {
  const extension = file.name.split(".").pop() || "jpg";
  const path = `blog-hero/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;

  const { error } = await supabase.storage
    .from("media")
    .upload(path, file, { upsert: false, cacheControl: "3600" });

  if (error) {
    const fallbackPath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
    const fallback = await supabase.storage
      .from("blog-hero")
      .upload(fallbackPath, file, { upsert: false, cacheControl: "3600" });

    if (fallback.error) throw fallback.error;

    const { data } = supabase.storage
      .from("blog-hero")
      .getPublicUrl(fallbackPath);
    return data.publicUrl;
  }

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}

export async function fetchAdminBlogById(
  id: string,
): Promise<AdminBlog | null> {
  return fetchAdminContentById(id, "blog");
}

export async function fetchAdminArticleById(
  id: string,
): Promise<AdminContentItem | null> {
  return fetchAdminContentById(id, "article");
}

export async function fetchAdminContentById(
  id: string,
  contentType: "blog" | "article",
): Promise<AdminContentItem | null> {
  const { data, error } = await supabase
    .from("content_items")
    .select(BLOG_SELECT)
    .eq("id", id)
    .eq("type", contentType)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;

  const item = normalizeContentItem(data as RawBlog);

  const mappings = await fetchFilterMappings(id);

  item.filterCategoryIds = mappings.map((mapping) => mapping.category_id);
  item.tags = mergeFilterTagsIntoTags(item.tags, mappings);

  return item;
}

export async function createAdminBlog(
  input: UpsertAdminBlogInput,
): Promise<AdminBlog> {
  const item = await createAdminContent(input, "blog");
  return item;
}

export async function createAdminArticle(
  input: UpsertAdminContentInput,
): Promise<AdminContentItem> {
  return createAdminContent(input, "article");
}

/**
 * Generic create used by the shared ContentEditorPage.
 * Falls back to "blog" when contentType is omitted.
 */
export async function createAdminContentItem(
  input: UpsertAdminContentInput,
  contentType: "blog" | "article" = "blog",
): Promise<AdminContentItem> {
  return createAdminContent(input, contentType);
}

export async function createAdminContent(
  input: UpsertAdminContentInput,
  contentType: "blog" | "article",
): Promise<AdminContentItem> {
  const { data, error } = await supabase
    .from("content_items")
    .insert(toDbPayload(input, contentType))
    .select(BLOG_SELECT)
    .single();

  if (error) throw error;

  const item = normalizeContentItem(data as RawBlog);

  // Insert filter relationships into the junction table
  if (input.filterCategoryIds && input.filterCategoryIds.length > 0) {
    await insertFilterMappings(item.id, input.filterCategoryIds);
  }

  return item;
}

export async function updateAdminBlog(
  id: string,
  input: UpsertAdminBlogInput,
): Promise<AdminBlog> {
  const item = await updateAdminContent(id, input, "blog");
  return item;
}

export async function updateAdminArticle(
  id: string,
  input: UpsertAdminContentInput,
): Promise<AdminContentItem> {
  return updateAdminContent(id, input, "article");
}

/**
 * Generic update used by the shared ContentEditorPage.
 * Falls back to "blog" when contentType is omitted.
 */
export async function updateAdminContentItem(
  id: string,
  input: UpsertAdminContentInput,
  contentType: "blog" | "article" = "blog",
): Promise<AdminContentItem> {
  return updateAdminContent(id, input, contentType);
}

export async function updateAdminContent(
  id: string,
  input: UpsertAdminContentInput,
  contentType: "blog" | "article",
): Promise<AdminContentItem> {
  const { data, error } = await supabase
    .from("content_items")
    .update(toDbPayload(input, contentType))
    .eq("id", id)
    .eq("type", contentType)
    .select(BLOG_SELECT)
    .single();

  if (error) throw error;

  // Clear and re-add filter relationships
  await deleteFilterMappings(id);
  if (input.filterCategoryIds && input.filterCategoryIds.length > 0) {
    await insertFilterMappings(id, input.filterCategoryIds);
  }

  return normalizeContentItem(data as RawBlog);
}

async function insertFilterMappings(
  contentId: string,
  categoryIds: string[],
): Promise<void> {
  const expandedCategoryIds = await expandWithAncestorCategoryIds(
    Array.from(new Set(categoryIds.filter(Boolean))),
  );

  const mappings = Array.from(expandedCategoryIds).map((categoryId) => ({
    content_id: contentId,
    category_id: categoryId,
  }));

  const { error: newError } = await supabase
    .from("content_categories")
    .insert(mappings);

  if (!newError) return;

  // Backward compatibility: fallback to legacy table if new table is unavailable.
  const { error: legacyError } = await supabase
    .from("content_filter_category_mapping")
    .insert(mappings);

  if (legacyError) throw legacyError;
}

async function expandWithAncestorCategoryIds(
  categoryIds: string[],
): Promise<Set<string>> {
  const resolved = new Set(categoryIds.filter(Boolean));
  let frontier = new Set(resolved);

  while (frontier.size > 0) {
    const ids = Array.from(frontier);
    frontier = new Set<string>();

    const { data, error } = await supabase
      .from("categories")
      .select("id, parent_id")
      .in("id", ids);

    if (error) {
      throw error;
    }

    for (const row of data || []) {
      const parentId = (row as { parent_id: string | null }).parent_id;
      if (!parentId || resolved.has(parentId)) continue;
      resolved.add(parentId);
      frontier.add(parentId);
    }
  }

  return resolved;
}

async function deleteFilterMappings(contentId: string): Promise<void> {
  const { error: newError } = await supabase
    .from("content_categories")
    .delete()
    .eq("content_id", contentId);

  if (!newError) return;

  // Backward compatibility: fallback to legacy table if new table is unavailable.
  const { error: legacyError } = await supabase
    .from("content_filter_category_mapping")
    .delete()
    .eq("content_id", contentId);

  if (legacyError) throw legacyError;
}

export async function fetchAdminAuthorOptions(): Promise<AdminAuthorOption[]> {
  const { data, error } = await supabase
    .from("authors")
    .select("id, name, avatar_url, title")
    .order("name", { ascending: true });

  if (error) throw error;

  return (
    (data || []) as Array<{
      id: string;
      name: string;
      avatar_url: string | null;
      title: string | null;
    }>
  ).map((row) => ({
    id: row.id,
    name: row.name,
    avatarUrl: row.avatar_url,
    title: row.title,
  }));
}

function normalizeCategoryOption(raw: {
  id: string;
  name: string;
  parent_id: string | null;
}): AdminCategoryOption {
  return {
    id: raw.id,
    name: raw.name,
    parentId: raw.parent_id,
  };
}

export async function fetchSectionOptions(): Promise<HierarchicalCategory[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, parent_id")
    .eq("filter_group", "digital-perspectives")
    .eq("is_filter_enabled", true)
    .order("filter_display_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) throw error;

  const items = (data || []).map((row) =>
    normalizeCategoryOption(
      row as { id: string; name: string; parent_id: string | null },
    ),
  );

  return buildHierarchy(items);
}

export async function fetchCategoryOptionsBySection(): Promise<
  HierarchicalCategory[]
> {
  // Note: Digital Streams are NOT children of Digital Perspectives
  // They have their own independent hierarchy
  // sectionId parameter is kept for API consistency but not used in filtering

  const { data, error } = await supabase
    .from("categories")
    .select("id, name, parent_id")
    .eq("filter_group", "digital-streams")
    .eq("is_filter_enabled", true)
    .order("filter_display_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) throw error;

  const items = (data || []).map((row) =>
    normalizeCategoryOption(
      row as { id: string; name: string; parent_id: string | null },
    ),
  );

  return buildHierarchy(items);
}

async function fetchCategoryOptionsByFilterGroup(
  filterGroup: string,
): Promise<AdminCategoryOption[]> {
  const { data, error } = await supabase
    .from("categories")
    .select("id, name, parent_id")
    .eq("filter_group", filterGroup)
    .eq("is_filter_enabled", true)
    .order("filter_display_order", { ascending: true })
    .order("name", { ascending: true });

  if (error) throw error;

  return (data || []).map((row) =>
    normalizeCategoryOption(
      row as { id: string; name: string; parent_id: string | null },
    ),
  );
}

function buildHierarchy(items: AdminCategoryOption[]): HierarchicalCategory[] {
  if (items.length === 0) return [];

  // Create a map of items by ID for quick lookup
  const itemMap = new Map<string, HierarchicalCategory>();

  // First pass: create all items
  items.forEach((item) => {
    itemMap.set(item.id, {
      id: item.id,
      name: item.name,
      parentId: item.parentId,
      children: [],
    });
  });

  // Second pass: build parent-child relationships
  const roots: HierarchicalCategory[] = [];
  itemMap.forEach((item) => {
    if (item.parentId) {
      const parent = itemMap.get(item.parentId);
      if (parent?.children) {
        parent.children.push(item);
      }
    } else {
      roots.push(item);
    }
  });

  // If no roots found (all items have parents), return all items as flat list
  // This handles cases where items are already filtered to a parent context
  if (roots.length === 0) {
    return Array.from(itemMap.values());
  }

  return roots;
}

export async function fetchBlogSidebarFilterOptions(): Promise<BlogSidebarFilterOptions> {
  const [
    contentTypes,
    digitalSectors,
    contentFormats,
    popularityTags,
    dbpDomains,
  ] = await Promise.all([
    fetchCategoryOptionsByFilterGroup("content-types"),
    fetchCategoryOptionsByFilterGroup("digital-sectors"),
    fetchCategoryOptionsByFilterGroup("content-format"),
    fetchCategoryOptionsByFilterGroup("popularity-tags"),
    fetchCategoryOptionsByFilterGroup("dbp-domains"),
  ]);

  return {
    contentTypes: buildHierarchy(contentTypes),
    digitalSectors: buildHierarchy(digitalSectors),
    contentFormats: buildHierarchy(contentFormats),
    popularityTags: buildHierarchy(popularityTags),
    dbpDomains: buildHierarchy(dbpDomains),
  };
}
