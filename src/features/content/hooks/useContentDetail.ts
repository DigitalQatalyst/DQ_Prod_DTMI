import { useQuery } from "@tanstack/react-query";
import { fetchContentDetail, fetchRelatedContent } from "../api/contentDetail";

export function useContentDetail(slugOrId: string) {
  return useQuery({
    queryKey: ["content-detail", slugOrId],
    queryFn: () => fetchContentDetail(slugOrId),
    staleTime: 10 * 60 * 1000,
    gcTime: 15 * 60 * 1000,
    refetchOnWindowFocus: false,
    enabled: !!slugOrId,
  });
}

export function useRelatedContent(currentId: string, category: string) {
  return useQuery({
    queryKey: ["related-content", currentId, category],
    queryFn: () => fetchRelatedContent(currentId, category),
    staleTime: 10 * 60 * 1000,
    enabled: !!currentId && !!category,
  });
}
