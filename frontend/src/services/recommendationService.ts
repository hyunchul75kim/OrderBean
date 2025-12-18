import { apiClient } from './api';

export interface RecommendedProduct {
  id: string;
  name: string;
  reason: string;
  imageUrl?: string;
}

export const recommendationService = {
  getRecommendations: async (surveyId: string): Promise<RecommendedProduct[]> => {
    return apiClient.get<RecommendedProduct[]>(`/recommendations/${surveyId}`);
  },
};

