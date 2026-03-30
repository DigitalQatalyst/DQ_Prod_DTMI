import { useQuery } from "@tanstack/react-query";
import { fetchWeekHighlights, type WeekHighlightsResponse } from "../api/weekHighlights";

export const useWeekHighlights = () => {
  return useQuery<WeekHighlightsResponse, Error>({
    queryKey: ["week-highlights"],
    queryFn: fetchWeekHighlights,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
