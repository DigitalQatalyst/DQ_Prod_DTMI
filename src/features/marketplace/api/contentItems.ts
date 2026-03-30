import { supabase } from "@/lib/supabase";
import type { ContentItem, ContentTab, ContentType } from "./types";
import { TYPE_TO_TAB, TYPE_LABELS } from "./types";

const TAB_TO_TYPES: Record<ContentTab, string[]> = {
  signals: Object.entries(TYPE_TO_TAB)
    .filter(([, tab]) => tab === "signals")
    .map(([type]) => type),
  insights: Object.entries(TYPE_TO_TAB)
    .filter(([, tab]) => tab === "insights")
    .map(([type]) => type),
  "deep-analysis": Object.entries(TYPE_TO_TAB)
    .filter(([, tab]) => tab === "deep-analysis")
    .map(([type]) => type),
};

interface RawContentItem {
  id: string;
  slug: string | null;
  title: string | null;
  excerpt: string | null;
  content: string | null;
  hero_image: string | null;
  category: string | null;
  publish_date: string | null;
  read_time: number | null;
  type: string | null;
  tags: string[] | null;
  authors?: { name?: string | null } | null;
  categories?: { name?: string | null } | null;
}

function normalize(raw: RawContentItem): ContentItem {
  const type = (raw.type || "article").toLowerCase().trim() as ContentType;
  const tab: ContentTab = TYPE_TO_TAB[type] ?? "insights";
  const publishDate = raw.publish_date
    ? new Date(raw.publish_date)
    : new Date();

  return {
    id: raw.id,
    title: raw.title || "Untitled",
    excerpt: raw.excerpt || raw.content?.substring(0, 200) + "..." || "",
    category: raw.category || raw.categories?.name || "Digital Transformation",
    contentType: type,
    contentTypeLabel: TYPE_LABELS[type] ?? type,
    tab,
    publishDate: publishDate.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
    year: publishDate.getFullYear(),
    readTime: raw.read_time ?? 5,
    heroImage: raw.hero_image || "/images/Article 01_hero image.png",
    slug: raw.slug,
    link: raw.slug ? `/${type}/${raw.slug}` : `/${type}/${raw.id}`,
    tags: raw.tags || [],
  };
}

export async function fetchContentItems(
  tab: ContentTab,
  filterSlugs: string[] = [],
  limit = 30,
): Promise<ContentItem[]> {
  const tabTypes = TAB_TO_TYPES[tab] || [];
  const baseSelect =
    "id, slug, title, excerpt, content, hero_image, category, publish_date, read_time, type, tags, authors:author_id(name), categories:category_id(name)";

  const query =
    filterSlugs.length > 0
      ? supabase
          .rpc("get_content_by_hierarchical_filters", {
            filter_slugs: filterSlugs,
          })
          .select(baseSelect)
      : supabase.from("content_items").select(baseSelect);

  const typedQuery = tabTypes.length > 0 ? query.in("type", tabTypes) : query;
  const { data, error } = await typedQuery
    .order("publish_date", { ascending: false })
    .limit(limit);

  if (error) throw error;

  return ((data || []) as RawContentItem[]).map(normalize);
}
