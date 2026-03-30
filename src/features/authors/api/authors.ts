import { supabase } from "@/lib/supabase";

export interface Author {
  id: string;
  name: string;
  slug: string | null;
  title: string | null;
  bio: string | null;
  avatarUrl: string | null;
  contributorType: string | null;
  expertise: string | null;
  affiliation: string | null;
  worksCount: number;
  tags: string[];
}

interface RawAuthor {
  id: string;
  name: string;
  slug: string | null;
  title: string | null;
  bio: string | null;
  bio_html: string | null;
  avatar_url: string | null;
  contributor_type: string | null;
  expertise: string | null;
  affiliation: string | null;
  works_count: number | null;
  tags: string[] | null;
}

function htmlToPlainText(value: string | null): string {
  if (!value) return "";

  return value
    .replaceAll(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, " ")
    .replaceAll(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, " ")
    .replaceAll(/<[^>]+>/g, " ")
    .replaceAll(/&nbsp;/gi, " ")
    .replaceAll(/&amp;/gi, "&")
    .replaceAll(/&lt;/gi, "<")
    .replaceAll(/&gt;/gi, ">")
    .replaceAll(/\s+/g, " ")
    .trim();
}

function normalize(r: RawAuthor): Author {
  const richBioText = htmlToPlainText(r.bio_html);
  const displayBio = richBioText || r.bio;

  return {
    id: r.id,
    name: r.name,
    slug: r.slug,
    title: r.title,
    bio: displayBio,
    avatarUrl: r.avatar_url || null,
    contributorType: r.contributor_type,
    expertise: r.expertise,
    affiliation: r.affiliation || "DTMI",
    worksCount: r.works_count ?? 0,
    tags: r.tags || [],
  };
}

const SELECT =
  "id, name, slug, title, bio, bio_html, avatar_url, contributor_type, expertise, affiliation, works_count, tags, content_items(count)";

export async function fetchAuthors(
  contributorType?: string,
): Promise<Author[]> {
  let query = supabase
    .from("authors")
    .select(SELECT)
    .eq("is_active", true)
    .order("name");

  if (contributorType) {
    query = query.eq("contributor_type", contributorType);
  }

  const { data, error } = await query;
  if (error) throw error;
  return (data || []).map((r) => {
    const raw = r as unknown as RawAuthor & {
      content_items: { count: number }[];
    };
    const actualCount = raw.content_items?.[0]?.count ?? raw.works_count ?? 0;
    return { ...normalize(raw), worksCount: actualCount };
  });
}

export async function fetchAuthorBySlug(slug: string): Promise<Author | null> {
  const { data, error } = await supabase
    .from("authors")
    .select(SELECT)
    .eq("slug", slug)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  return normalize(data as unknown as RawAuthor);
}

export const CONTRIBUTOR_TYPES = [
  {
    id: "Research Leadership",
    label: "Research Leadership",
    description:
      "Strategic research direction and methodological oversight for DTMI's cognitive transformation initiatives.",
    expertise:
      "Strategic Research, Cognitive Analysis, Transformation Leadership",
    icon: "🎓",
    color: "bg-blue-50 border-blue-200 hover:border-blue-400",
    iconBg: "bg-blue-100",
  },
  {
    id: "Human Intelligence Analysts",
    label: "Human Intelligence Analysts",
    description:
      "Expert analysts specializing in digital transformation domains and cognitive organizational frameworks.",
    expertise: "Domain Analysis, Platform Architecture, Digital Strategy",
    icon: "🔍",
    color: "bg-green-50 border-green-200 hover:border-green-400",
    iconBg: "bg-green-100",
  },
  {
    id: "AI Research Agents",
    label: "AI Research Agents",
    description:
      "Specialized AI agents conducting autonomous research across the 6xD framework and digital transformation domains.",
    expertise: "AI Research, Autonomous Analysis, Framework Specialization",
    icon: "🤖",
    color: "bg-violet-50 border-violet-200 hover:border-violet-400",
    iconBg: "bg-violet-100",
  },
  {
    id: "Editorial Publication Team",
    label: "Editorial Publication Team",
    description:
      "Content curation, editorial oversight, and publication management for DTMI research outputs.",
    expertise: "Editorial Leadership, Content Strategy, Publication Management",
    icon: "✍️",
    color: "bg-orange-50 border-orange-200 hover:border-orange-400",
    iconBg: "bg-orange-100",
  },
] as const;
