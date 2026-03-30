import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface LandingContentItem {
  id: string;
  slug: string | null;
  title: string;
  excerpt: string;
  content: string;
  heroImage: string | null;
  category: string;
  publishDate: string;
  readTime: number;
  featured: boolean;
  type: string;
  authorName?: string;
}

interface ContentItemRow {
  id: string;
  slug: string | null;
  title: string | null;
  excerpt: string | null;
  content: string | null;
  hero_image: string | null;
  category: string | null;
  publish_date: string | null;
  read_time: number | null;
  featured: boolean | null;
  type: string | null;
  authors?: { name?: string | null } | null;
  categories?: { name?: string | null } | null;
}

const normalizeContentItem = (row: ContentItemRow): LandingContentItem => ({
  id: row.id,
  slug: row.slug,
  title: row.title || "Untitled",
  excerpt: row.excerpt || "",
  content: row.content || "",
  heroImage: row.hero_image,
  category: row.category || row.categories?.name || "Digital Transformation",
  publishDate: row.publish_date || new Date().toISOString(),
  readTime: row.read_time ?? 0,
  featured: Boolean(row.featured),
  type: row.type || "blog",
  authorName: row.authors?.name || undefined,
});

export const fetchLandingContentItems = async (
  limit: number,
): Promise<LandingContentItem[]> => {
  const { data, error } = await supabase
    .from("content_items")
    .select(
      "id, slug, title, excerpt, content, hero_image, category, publish_date, read_time, featured, type, authors:author_id(name), categories:category_id(name)",
    )
    .order("publish_date", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return ((data || []) as ContentItemRow[]).map(normalizeContentItem);
};
