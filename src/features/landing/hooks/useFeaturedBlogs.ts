import { useQuery } from "@tanstack/react-query";
import { fetchFeaturedBlogs, type FeaturedBlogsResponse } from "../api/featuredBlogs";

export const useFeaturedBlogs = () => {
  return useQuery<FeaturedBlogsResponse, Error>({
    queryKey: ["featured-blogs"],
    queryFn: fetchFeaturedBlogs,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
