import { useQuery } from '@tanstack/react-query';
import { fetchEditorsPickDeepAnalysis, EditorsPickDeepAnalysisResponse } from '../api/editorsPickDeepAnalysis';

export const useEditorsPickDeepAnalysis = () => {
  return useQuery<EditorsPickDeepAnalysisResponse, Error>({
    queryKey: ['editors-pick-deep-analysis'],
    queryFn: fetchEditorsPickDeepAnalysis,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};