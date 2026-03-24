import { useQuery } from '@tanstack/react-query';
import { fetchFeaturedBlogs, FeaturedBlogsResponse } from '../api/featuredBlogs';

export const useFeaturedBlogs = () => {
  return useQuery<FeaturedBlogsResponse, Error>({
    queryKey: ['featured-blogs'],
    queryFn: fetchFeaturedBlogs,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};