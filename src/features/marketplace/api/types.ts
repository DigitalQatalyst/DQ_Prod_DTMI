export type ContentTab = "signals" | "insights" | "deep-analysis";

/**
 * ContentType maps 1:1 to the `type` column in content_items.
 * This single value drives: badge, URL route, layout, and tab placement.
 * Current DB values: "blog", "article", "future-insight"
 */
export type ContentType =
  | "blog"
  | "article"
  | "future-insight"
  | "whitepaper"
  | "research-report"
  | "podcast"
  | "video"
  | "expert-interview"
  | "infographic"
  | "case-study";

/** Human-readable badge label per type */
export const TYPE_LABELS: Record<string, string> = {
  "blog": "Blog",
  "article": "Article",
  "future-insight": "Future Insight",
  "whitepaper": "Whitepaper",
  "research-report": "Research Report",
  "podcast": "Podcast",
  "video": "Video",
  "expert-interview": "Expert Interview",
  "infographic": "Infographic",
  "case-study": "Case Study",
};

/** Which marketplace tab each type belongs to */
export const TYPE_TO_TAB: Record<string, ContentTab> = {
  "blog": "signals",
  "article": "insights",
  "future-insight": "insights",
  "whitepaper": "deep-analysis",
  "research-report": "deep-analysis",
  "podcast": "signals",
  "video": "signals",
  "expert-interview": "insights",
  "infographic": "insights",
  "case-study": "insights",
};

export interface ContentItem {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  contentType: ContentType;    // raw DB type — drives route + layout
  contentTypeLabel: string;    // human-readable badge label
  tab: ContentTab;
  publishDate: string;
  year: number;
  readTime: number;
  heroImage: string;
  slug: string | null;
  link: string;
  tags: string[];
}

export interface ContentFilters {
  search: string;
  types: string[];
  categories: string[];
  years: number[];
}

export const TAB_META: Record<ContentTab, { label: string; emoji: string; description: string }> = {
  signals: {
    label: "Signals",
    emoji: "⚡",
    description: "Short-form intellectual assets highlighting emerging trends and early digital patterns.",
  },
  insights: {
    label: "Insights",
    emoji: "🔎",
    description: "Structured analysis and concept explainers for deeper understanding.",
  },
  "deep-analysis": {
    label: "Deep Analysis",
    emoji: "🧠",
    description: "Strategic intellectual assets — research reports and comprehensive analysis.",
  },
};
