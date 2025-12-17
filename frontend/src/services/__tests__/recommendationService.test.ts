import { describe, it, expect } from 'vitest';
import { recommendationService, RecommendedProduct } from '../recommendationService';

describe('recommendationService', () => {
  describe('getRecommendations', () => {
    it('should return 3 to 5 recommended products for a valid survey ID', async () => {
      // Given: 유효한 설문 ID가 주어졌을 때
      const surveyId = 'survey-123';

      // When: 추천을 요청하면
      const recommendations = await recommendationService.getRecommendations(surveyId);

      // Then: 3~5개의 추천 상품이 반환되어야 함
      expect(recommendations.length).toBeGreaterThanOrEqual(3);
      expect(recommendations.length).toBeLessThanOrEqual(5);
    });
  });
});

