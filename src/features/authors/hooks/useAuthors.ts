import { useQuery } from "@tanstack/react-query";
import { fetchAuthors, fetchAuthorBySlug } from "../api/authors";

export function useAuthors(contributorType?: string) {
  return useQuery({
    queryKey: ["authors", contributorType ?? "all"],
    queryFn: () => fetchAuthors(contributorType),
    staleTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}

export function useAuthorBySlug(slug: string) {
  return useQuery({
    queryKey: ["author", slug],
    queryFn: () => fetchAuthorBySlug(slug),
    staleTime: 10 * 60 * 1000,
    enabled: !!slug,
  });
}
