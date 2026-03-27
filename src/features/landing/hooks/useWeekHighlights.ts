import { useQuery } from '@tanstack/react-query';
import { fetchWeekHighlights, WeekHighlightsResponse } from '../api/weekHighlights';

export const useWeekHighlights = () => {
  return useQuery<WeekHighlightsResponse, Error>({
    queryKey: ['week-highlights'],
    queryFn: fetchWeekHighlights,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};