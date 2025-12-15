export interface RecommendationWeights {
  acidity: number;
  bitterness: number;
  nuttiness: number;
  milkCompatible: number;
}

export const DEFAULT_RECOMMENDATION_WEIGHTS: RecommendationWeights = {
  acidity: 1.0,
  bitterness: 1.0,
  nuttiness: 1.0,
  milkCompatible: 1.0,
};

