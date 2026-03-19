/**
 * authorService.ts
 * CRUD operations for the authors table.
 * Authors are managed by admins and are separate from login users.
 */

import { getPrimarySupabase } from "../lib/supabaseClients";

export interface Author {
  id: string;
  name: string;
  slug?: string;
  title?: string;
  bio?: string;
  avatar_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  website_url?: string;
  email?: string;
  location?: string;
  is_active: boolean;
  created_by?: string;
  created_at: string;
  updated_at: string;
}

export interface CreateAuthorInput {
  name: string;
  title?: string;
  bio?: string;
  avatar_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  website_url?: string;
  email?: string;
  location?: string;
  created_by?: string;
}

export interface UpdateAuthorInput {
  name?: string;
  title?: string;
  bio?: string;
  avatar_url?: string;
  linkedin_url?: string;
  twitter_url?: string;
  website_url?: string;
  email?: string;
  location?: string;
  is_active?: boolean;
}

const db = () => getPrimarySupabase();

export async function getAuthors(activeOnly = true): Promise<Author[]> {
  let query = db().from("authors").select("*").order("name", { ascending: true });
  if (activeOnly) query = query.eq("is_active", true);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []) as Author[];
}

export async function getAuthorById(id: string): Promise<Author | null> {
  const { data, error } = await db()
    .from("authors")
    .select("*")
    .eq("id", id)
    .maybeSingle();
  if (error) throw error;
  return data as Author | null;
}

export async function getAuthorBySlug(slug: string): Promise<Author | null> {
  const { data, error } = await db()
    .from("authors")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (error) throw error;
  return data as Author | null;
}

export async function createAuthor(input: CreateAuthorInput): Promise<Author> {
  const { data, error } = await db()
    .from("authors")
    .insert([{ ...input, is_active: true }])
    .select()
    .single();
  if (error) throw error;
  return data as Author;
}

export async function updateAuthor(id: string, input: UpdateAuthorInput): Promise<Author> {
  const { data, error } = await db()
    .from("authors")
    .update({ ...input, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Author;
}

export async function deleteAuthor(id: string): Promise<void> {
  const { error } = await db().from("authors").delete().eq("id", id);
  if (error) throw error;
}
