import { supabase } from "@/lib/supabase";

export interface AdminLibraryItem {
  id: string;
  slug: string | null;
  title: string;
  excerpt: string;
  heroImage: string | null;
  type: string;
  category: string;
  publishDate: string | null;
  readTime: number;
  featured: boolean;
  authorName: string;
}

interface RawLibraryItem {
  id: string;
  slug: string | null;
  title: string | null;
  excerpt: string | null;
  hero_image: string | null;
  type: string | null;
  category: string | null;
  publish_date: string | null;
  read_time: number | null;
  featured: boolean | null;
  authors?: { name?: string | null } | null;
  categories?: { name?: string | null } | null;
}

const SELECT =
  "id, slug, title, excerpt, hero_image, type, category, publish_date, read_time, featured, authors:author_id(name), categories:category_id(name)";

function normalizeItem(raw: RawLibraryItem): AdminLibraryItem {
  return {
    id: raw.id,
    slug: raw.slug,
    title: raw.title || "Untitled",
    excerpt: raw.excerpt || "",
    heroImage: raw.hero_image,
    type: (raw.type || "blog").toLowerCase().trim(),
    category: raw.category || raw.categories?.name || "Uncategorized",
    publishDate: raw.publish_date,
    readTime: raw.read_time ?? 5,
    featured: Boolean(raw.featured),
    authorName: raw.authors?.name || "Unknown Author",
  };
}

export async function fetchLibraryItems(): Promise<AdminLibraryItem[]> {
  const { data, error } = await supabase
    .from("content_items")
    .select(SELECT)
    .order("publish_date", { ascending: false })
    .limit(300);

  if (error) throw error;

  return ((data || []) as RawLibraryItem[]).map(normalizeItem);
}

export async function deleteLibraryItem(id: string): Promise<void> {
  const { error } = await supabase.from("content_items").delete().eq("id", id);
  if (error) throw error;
}
