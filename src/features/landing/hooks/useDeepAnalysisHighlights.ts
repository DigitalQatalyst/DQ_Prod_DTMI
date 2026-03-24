import { useQuery } from '@tanstack/react-query';
import { fetchDeepAnalysisHighlights, DeepAnalysisHighlightsResponse } from '../api/deepAnalysisHighlights';

export const useDeepAnalysisHighlights = () => {
  return useQuery<DeepAnalysisHighlightsResponse, Error>({
    queryKey: ['deep-analysis-highlights'],
    queryFn: fetchDeepAnalysisHighlights,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};