import { ProductWithOptions } from '../../../shared/types/product.types';

/**
 * 임시 상품 데이터 (개발/테스트용)
 * TODO: API 연동 후 제거하고 productService를 통해 동적으로 가져오기
 */
export const MOCK_PRODUCTS: ProductWithOptions[] = [
  {
    id: '1',
    name: '아메리카노(ICE)',
    basePrice: 4000,
    description: '시원한 아이스 아메리카노',
    customizationOptions: [
      { id: 'shot', name: '샷 추가', price: 500 },
      { id: 'syrup', name: '시럽 추가', price: 0 },
    ],
  },
  {
    id: '2',
    name: '아메리카노(HOT)',
    basePrice: 4000,
    description: '따뜻한 핫 아메리카노',
    customizationOptions: [
      { id: 'shot', name: '샷 추가', price: 500 },
      { id: 'syrup', name: '시럽 추가', price: 0 },
    ],
  },
  {
    id: '3',
    name: '카페라떼',
    basePrice: 5000,
    description: '부드러운 카페라떼',
    customizationOptions: [
      { id: 'shot', name: '샷 추가', price: 500 },
      { id: 'syrup', name: '시럽 추가', price: 0 },
    ],
  },
];

