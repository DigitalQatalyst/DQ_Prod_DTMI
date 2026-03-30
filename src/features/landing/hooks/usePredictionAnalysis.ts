import { useQuery } from "@tanstack/react-query";
import { fetchPredictionAnalysis, type PredictionAnalysisResponse } from "../api/predictionAnalysis";

export const usePredictionAnalysis = () => {
  return useQuery<PredictionAnalysisResponse, Error>({
    queryKey: ["prediction-analysis"],
    queryFn: fetchPredictionAnalysis,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    refetchOnWindowFocus: false,
  });
};
