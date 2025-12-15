import { Product } from '../models/Product';
import { SurveyAnswer } from '../models/Survey';

export interface RecommendationWeights {
  acidity: number;
  bitterness: number;
  nuttiness: number;
  milkCompatible: number;
}

export const calculateProductScore = (
  product: Product,
  surveyAnswers: SurveyAnswer[],
  weights: RecommendationWeights
): number => {
  // TODO: 추천 점수 계산 로직 구현
  return 0;
};

export const generateRecommendationReason = (
  product: Product,
  surveyAnswers: SurveyAnswer[]
): string => {
  // TODO: 추천 사유 생성 로직 구현
  return '';
};

