export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl?: string;
  acidity: number; // 산미 (1-5)
  bitterness: number; // 쓴맛 (1-5)
  nuttiness: number; // 고소함 (1-5)
  milkCompatible: boolean; // 우유 호환 여부
  createdAt: Date;
  updatedAt: Date;
}

/**
 * 커스터마이징 옵션 타입
 */
export interface CustomizationOption {
  id: string;
  name: string;
  price: number;
}

/**
 * 주문 페이지에서 사용하는 상품 타입 (커스터마이징 옵션 포함)
 * 기본 Product 타입을 확장하여 주문 관련 필드 추가
 * 주문 페이지에서는 일부 필드를 선택적으로 사용
 */
export interface ProductWithOptions extends Partial<Omit<Product, 'price' | 'id' | 'name' | 'description'>> {
  id: string;
  name: string;
  description: string;
  basePrice: number; // 주문 페이지에서 사용하는 기본 가격
  customizationOptions: CustomizationOption[];
  // Product의 나머지 필드들은 선택적
  imageUrl?: string;
  acidity?: number;
  bitterness?: number;
  nuttiness?: number;
  milkCompatible?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}
