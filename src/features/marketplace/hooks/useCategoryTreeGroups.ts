import { useQuery } from "@tanstack/react-query";
import { fetchCategoryTreeGroups } from "../api/hierarchicalFilters";

export function useCategoryTreeGroups() {
  return useQuery({
    queryKey: ["marketplace-category-tree-groups"],
    queryFn: fetchCategoryTreeGroups,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
}
