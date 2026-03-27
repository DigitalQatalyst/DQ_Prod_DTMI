import { useQuery } from '@tanstack/react-query';
import { fetchFeaturedInsights, FeaturedInsightsResponse } from '../api/featuredInsights';

export const useFeaturedInsights = () => {
  return useQuery<FeaturedInsightsResponse, Error>({
    queryKey: ['featured-insights'],
    queryFn: fetchFeaturedInsights,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};