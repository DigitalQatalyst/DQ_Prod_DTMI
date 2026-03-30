import { useQuery } from "@tanstack/react-query";
import { fetchContentItems } from "../api/contentItems";
import type { ContentTab } from "../api/types";

export function useContentItems(tab: ContentTab, selectedSlugs: string[]) {
  const normalizedSlugs = [...new Set(selectedSlugs)].sort((a, b) =>
    a.localeCompare(b),
  );

  return useQuery({
    queryKey: ["marketplace-content", tab, normalizedSlugs],
    queryFn: () => fetchContentItems(tab, normalizedSlugs, 30),
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
