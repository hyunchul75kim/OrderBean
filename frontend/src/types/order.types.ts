/**
 * 장바구니 아이템 타입
 */
export interface CartItemOption {
  optionId: string;
  optionName: string;
  optionPrice: number;
}

export interface CartItem {
  id?: string; // 고유 ID (선택적, 자동 생성)
  productId: string;
  productName: string;
  basePrice: number;
  selectedOptions: CartItemOption[];
  quantity: number;
  totalPrice: number;
}

