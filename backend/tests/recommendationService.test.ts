import { recommendationService, RecommendedProduct } from '../src/services/recommendationService';

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

    it('should return recommended products with required fields (id, name, reason)', async () => {
      // Given: 유효한 설문 ID가 주어졌을 때
      const surveyId = 'survey-123';

      // When: 추천을 요청하면
      const recommendations = await recommendationService.getRecommendations(surveyId);

      // Then: 각 추천 상품은 id, name, reason 필드를 포함해야 함
      recommendations.forEach((product: RecommendedProduct) => {
        expect(product).toHaveProperty('id');
        expect(product).toHaveProperty('name');
        expect(product).toHaveProperty('reason');
        expect(typeof product.id).toBe('string');
        expect(typeof product.name).toBe('string');
        expect(typeof product.reason).toBe('string');
        expect(product.id.length).toBeGreaterThan(0);
        expect(product.name.length).toBeGreaterThan(0);
        expect(product.reason.length).toBeGreaterThan(0);
      });
    });

    it('should return recommendations based on survey answers', async () => {
      // Given: 특정 취향을 가진 설문 응답이 있을 때
      const surveyId = 'survey-123';

      // When: 추천을 요청하면
      const recommendations = await recommendationService.getRecommendations(surveyId);

      // Then: 설문 결과에 맞는 추천 상품이 반환되어야 함
      // (현재는 구현이 없으므로 이 테스트는 실패할 것임)
      expect(recommendations.length).toBeGreaterThan(0);
      
      // 각 추천 상품에는 추천 사유가 포함되어야 함
      recommendations.forEach((product: RecommendedProduct) => {
        expect(product.reason).toBeTruthy();
        expect(product.reason.length).toBeGreaterThan(10); // 의미있는 추천 사유
      });
    });
  });
});

