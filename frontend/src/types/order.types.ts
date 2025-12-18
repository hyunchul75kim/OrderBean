/**
 * 장바구니 아이템 타입
 */
export interface CartItemOption {
  optionId: string;
  optionName: string;
  optionPrice: number;
}

export interface CartItem {
  productId: string;
  productName: string;
  basePrice: number;
  selectedOptions: CartItemOption[];
  quantity: number;
  totalPrice: number;
}

