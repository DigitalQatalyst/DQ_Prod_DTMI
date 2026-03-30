export const GROUP_LABELS: Record<string, string> = {
  "content-types": "Content Types",
  "digital-perspectives": "Digital Perspectives",
  "digital-streams": "Digital Streams",
  "digital-sectors": "Digital Sectors",
  "content-format": "Content Format",
  "popularity-tags": "Popularity Tags",
  "dbp-domains": "DBP Domains",
};

export const DEFAULT_GROUP_ORDER = [
  "content-types",
  "digital-perspectives",
  "digital-streams",
  "digital-sectors",
  "content-format",
  "popularity-tags",
  "dbp-domains",
] as const;

export const HIERARCHICAL_GROUPS = new Set<string>([
  "content-types",
  "digital-streams",
  "dbp-domains",
]);
