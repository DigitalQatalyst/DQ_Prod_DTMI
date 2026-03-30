import { supabase } from "@/lib/supabase";

export interface AdminAuthor {
  id: string;
  name: string;
  slug: string | null;
  title: string | null;
  bio: string | null;
  bioHtml: string | null;
  avatarUrl: string | null;
  linkedinUrl: string | null;
  twitterUrl: string | null;
  affiliation: string | null;
  contributorType: string | null;
  subCategory: string | null;
  expertise: string | null;
  tags: string[];
  worksCount: number;
}

interface RawAuthor {
  id: string;
  name: string;
  slug: string | null;
  title: string | null;
  bio: string | null;
  bio_html: string | null;
  avatar_url: string | null;
  linkedin_url: string | null;
  twitter_url: string | null;
  affiliation: string | null;
  contributor_type: string | null;
  sub_category: string | null;
  expertise: string | null;
  tags: string[] | null;
  works_count: number | null;
  content_items?: { count: number }[];
}

export interface UpsertAuthorInput {
  name: string;
  title: string;
  bio: string;
  bioHtml: string;
  avatarUrl: string | null;
  linkedinUrl?: string | null;
  twitterUrl?: string | null;
  affiliation?: string | null;
  contributorType?: string | null;
  subCategory?: string | null;
  expertise?: string | null;
  tags?: string[];
}

const SELECT =
  "id, name, slug, title, bio, bio_html, avatar_url, linkedin_url, twitter_url, affiliation, contributor_type, sub_category, expertise, tags, works_count, content_items(count)";

function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replaceAll(/[^a-z0-9\s-]/g, "")
    .replaceAll(/\s+/g, "-")
    .replaceAll(/-+/g, "-")
    .replaceAll(/^-+|-+$/g, "");
}

function normalizeAuthor(raw: RawAuthor): AdminAuthor {
  const relatedCount = raw.content_items?.[0]?.count;

  return {
    id: raw.id,
    name: raw.name,
    slug: raw.slug,
    title: raw.title,
    bio: raw.bio,
    bioHtml: raw.bio_html,
    avatarUrl: raw.avatar_url,
    linkedinUrl: raw.linkedin_url,
    twitterUrl: raw.twitter_url,
    affiliation: raw.affiliation,
    contributorType: raw.contributor_type,
    subCategory: raw.sub_category,
    expertise: raw.expertise,
    tags: raw.tags || [],
    worksCount: relatedCount ?? raw.works_count ?? 0,
  };
}

export async function fetchAdminAuthors(
  search?: string,
): Promise<AdminAuthor[]> {
  let query = supabase.from("authors").select(SELECT).order("name");

  if (search?.trim()) {
    query = query.or(`name.ilike.%${search}%,title.ilike.%${search}%`);
  }

  const { data, error } = await query;
  if (error) throw error;

  return ((data || []) as RawAuthor[]).map(normalizeAuthor);
}

export async function fetchAdminAuthorById(
  id: string,
): Promise<AdminAuthor | null> {
  const { data, error } = await supabase
    .from("authors")
    .select(SELECT)
    .eq("id", id)
    .maybeSingle();

  if (error) throw error;
  if (!data) return null;
  return normalizeAuthor(data as RawAuthor);
}

function toDbPayload(input: UpsertAuthorInput) {
  return {
    name: input.name.trim(),
    slug: slugify(input.name),
    title: input.title.trim(),
    bio: input.bio,
    bio_html: input.bioHtml,
    avatar_url: input.avatarUrl,
    linkedin_url: input.linkedinUrl || null,
    twitter_url: input.twitterUrl || null,
    affiliation: input.affiliation || null,
    contributor_type: input.contributorType || null,
    sub_category: input.subCategory || null,
    expertise: input.expertise || null,
    tags: input.tags || [],
  };
}

export async function createAdminAuthor(
  input: UpsertAuthorInput,
): Promise<AdminAuthor> {
  const payload = toDbPayload(input);

  const { data, error } = await supabase
    .from("authors")
    .insert(payload)
    .select(SELECT)
    .single();

  if (error) throw error;
  return normalizeAuthor(data as RawAuthor);
}

export async function updateAdminAuthor(
  id: string,
  input: UpsertAuthorInput,
): Promise<AdminAuthor> {
  const payload = toDbPayload(input);

  const { data, error } = await supabase
    .from("authors")
    .update(payload)
    .eq("id", id)
    .select(SELECT)
    .single();

  if (error) throw error;
  return normalizeAuthor(data as RawAuthor);
}

export async function deleteAdminAuthor(id: string): Promise<void> {
  const { error } = await supabase.from("authors").delete().eq("id", id);
  if (error) throw error;
}

export async function deleteAdminAuthors(ids: string[]): Promise<void> {
  const { error } = await supabase.from("authors").delete().in("id", ids);
  if (error) throw error;
}

export async function uploadAuthorAvatar(file: File): Promise<string> {
  const extension = file.name.split(".").pop() || "jpg";
  const path = `author-avatars/${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;

  const { error } = await supabase.storage
    .from("media")
    .upload(path, file, { upsert: false, cacheControl: "3600" });

  if (error) {
    const fallbackPath = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`;
    const fallback = await supabase.storage
      .from("author-avatars")
      .upload(fallbackPath, file, { upsert: false, cacheControl: "3600" });

    if (fallback.error) throw fallback.error;

    const { data } = supabase.storage
      .from("author-avatars")
      .getPublicUrl(fallbackPath);
    return data.publicUrl;
  }

  const { data } = supabase.storage.from("media").getPublicUrl(path);
  return data.publicUrl;
}
