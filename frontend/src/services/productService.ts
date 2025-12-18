import { apiClient } from './api';
import { ProductWithOptions } from '../../../shared/types/product.types';

/**
 * 상품 관련 API 서비스
 */
export const productService = {
  /**
   * 모든 상품 목록 조회
   * @returns 상품 목록
   */
  getProducts: async (): Promise<ProductWithOptions[]> => {
    return apiClient.get<ProductWithOptions[]>('/products');
  },

  /**
   * 특정 상품 조회
   * @param productId - 상품 ID
   * @returns 상품 정보
   */
  getProduct: async (productId: string): Promise<ProductWithOptions> => {
    return apiClient.get<ProductWithOptions>(`/products/${productId}`);
  },
};

