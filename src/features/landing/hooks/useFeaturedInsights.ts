import { useQuery } from "@tanstack/react-query";
import { fetchFeaturedInsights, type FeaturedInsightsResponse } from "../api/featuredInsights";

export const useFeaturedInsights = () => {
  return useQuery<FeaturedInsightsResponse, Error>({
    queryKey: ["featured-insights"],
    queryFn: fetchFeaturedInsights,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
