import { useQuery } from '@tanstack/react-query';
import { fetchPredictionAnalysis, PredictionAnalysisResponse } from '../api/predictionAnalysis';

export const usePredictionAnalysis = () => {
  return useQuery<PredictionAnalysisResponse, Error>({
    queryKey: ['prediction-analysis'],
    queryFn: fetchPredictionAnalysis,
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000, // 10 minutes
    refetchOnWindowFocus: false,
  });
};