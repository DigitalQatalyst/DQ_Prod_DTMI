export type ContentDetailType =
  | "blog"
  | "article"
  | "future-insight"
  | "whitepaper"
  | "podcast"
  | "video"
  | "research-report"
  | "expert-interview"
  | "infographic"
  | "case-study";

export interface Author {
  id?: string;
  name: string;
  title?: string;
  bio?: string;
  avatar?: string;
  linkedIn?: string;
  twitter?: string;
}

export interface ContentDetail {
  id: string;
  slug: string | null;
  title: string;
  excerpt: string;
  body: string | null;
  heroImage: string;
  category: string;
  type: ContentDetailType;
  publishDate: string;
  readTime: number;
  tags: string[];
  author: Author | null;
  // Media-specific
  audioUrl?: string | null;
  videoUrl?: string | null;
  downloadUrl?: string | null;
  // Computed
  link: string;
}

/** Maps raw DB type strings to our canonical ContentDetailType */
export function normalizeType(raw: string | null): ContentDetailType {
  const t = (raw || "").toLowerCase().trim();
  // Exact DB values first (from content_items.type)
  if (t === "blog") return "blog";
  if (t === "article") return "article";
  if (t === "future-insight") return "future-insight";
  if (t === "whitepaper" || t === "white paper") return "whitepaper";
  if (t === "podcast") return "podcast";
  if (t === "video") return "video";
  if (t === "research-report" || t.includes("research") || t.includes("report") || t.includes("forecast")) return "research-report";
  if (t === "expert-interview" || t.includes("interview")) return "expert-interview";
  if (t === "infographic") return "infographic";
  if (t === "case-study" || t.includes("case")) return "case-study";
  // Default fallback
  return "article";
}

/** Content types that share the Article/Blog layout */
export const ARTICLE_BLOG_TYPES: ContentDetailType[] = ["blog", "article", "case-study", "infographic"];
