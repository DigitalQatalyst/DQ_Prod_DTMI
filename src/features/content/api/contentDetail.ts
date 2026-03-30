import { supabase } from "@/lib/supabase";
import type { ContentDetail, Author } from "./types";
import { normalizeType } from "./types";

interface RawAuthor {
  name: string | null;
  title: string | null;
  bio: string | null;
  avatar_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
}

interface RawRow {
  id: string;
  slug: string | null;
  title: string | null;
  excerpt: string | null;
  content: string | null;
  hero_image: string | null;
  category: string | null;
  type: string | null;
  publish_date: string | null;
  read_time: number | null;
  tags: string[] | null;
  whitepaper_url: string | null;
  authors: RawAuthor | null;
}

function mapAuthor(raw: RawAuthor | null): Author | null {
  if (!raw?.name) return null;
  return {
    name: raw.name,
    title: raw.title ?? undefined,
    bio: raw.bio ?? undefined,
    avatar: raw.avatar_url ?? undefined,
    linkedIn: raw.linkedin_url ?? undefined,
    twitter: raw.twitter_url ?? undefined,
  };
}

function mapRow(row: RawRow): ContentDetail {
  const type = normalizeType(row.type);
  const rawType = (row.type || "article").toLowerCase().trim();
  const publishDate = row.publish_date || new Date().toISOString();

  return {
    id: row.id,
    slug: row.slug,
    title: row.title || "Untitled",
    excerpt: row.excerpt || "",
    body: row.content || null,
    heroImage: row.hero_image || "/images/Article 01_hero image.png",
    category: row.category || "Digital Transformation",
    type,
    publishDate: new Date(publishDate).toLocaleDateString("en-US", {
      year: "numeric", month: "long", day: "numeric",
    }),
    readTime: row.read_time ?? 5,
    tags: row.tags || [],
    author: mapAuthor(row.authors),
    audioUrl: null,
    videoUrl: null,
    downloadUrl: row.whitepaper_url || null,
    link: row.slug ? `/${rawType}/${row.slug}` : `/${rawType}/${row.id}`,
  };
}

const SELECT = "id, slug, title, excerpt, content, hero_image, category, type, publish_date, read_time, tags, whitepaper_url, authors:author_id(name, title, bio, avatar_url, linkedin_url, twitter_url)";

export async function fetchContentDetail(slugOrId: string): Promise<ContentDetail> {
  const { data: bySlug } = await supabase
    .from("content_items")
    .select(SELECT)
    .eq("slug", slugOrId)
    .maybeSingle();

  if (bySlug) return mapRow(bySlug as unknown as RawRow);

  const { data: byId, error } = await supabase
    .from("content_items")
    .select(SELECT)
    .eq("id", slugOrId)
    .maybeSingle();

  if (error) throw error;
  if (!byId) throw new Error("Content not found");
  return mapRow(byId as unknown as RawRow);
}

export async function fetchRelatedContent(
  currentId: string,
  category: string,
  limit = 3,
): Promise<ContentDetail[]> {
  const { data } = await supabase
    .from("content_items")
    .select(SELECT)
    .neq("id", currentId)
    .eq("category", category)
    .order("publish_date", { ascending: false })
    .limit(limit);

  return (data || []).map((r) => mapRow(r as unknown as RawRow));
}
