import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { CartItem } from '../types/order.types';
import { ProductWithOptions } from '../../../shared/types/product.types';
import { logger } from '../../../shared/utils/logger';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: ProductWithOptions, selectedOptions: string[]) => void;
  removeFromCart: (itemId: string) => void;
  updateQuantity: (itemId: string, quantity: number) => void;
  clearCart: () => void;
  getTotal: () => number;
  getItemCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'orderbean_cart';

/**
 * 장바구니 아이템의 고유 ID 생성
 */
function generateCartItemId(product: ProductWithOptions, selectedOptions: string[]): string {
  const optionsKey = selectedOptions.sort().join(',');
  return `${product.id}_${optionsKey}`;
}

/**
 * 로컬 스토리지에서 장바구니 데이터 로드
 */
function loadCartFromStorage(): CartItem[] {
  try {
    const stored = localStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Date 객체 복원 (orderDate 등이 있다면)
      return parsed.map((item: CartItem) => ({
        ...item,
      }));
    }
  } catch (error) {
    logger.error('Failed to load cart from storage', error);
  }
  return [];
}

/**
 * 로컬 스토리지에 장바구니 데이터 저장
 */
function saveCartToStorage(cart: CartItem[]): void {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    logger.error('Failed to save cart to storage', error);
  }
}

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => loadCartFromStorage());

  // 로컬 스토리지와 동기화
  useEffect(() => {
    saveCartToStorage(cart);
  }, [cart]);

  /**
   * 장바구니에 아이템 추가
   */
  const addToCart = useCallback((product: ProductWithOptions, selectedOptions: string[]) => {
    const selectedOptionsData = product.customizationOptions.filter((opt) =>
      selectedOptions.includes(opt.id)
    );

    const optionsPrice = selectedOptionsData.reduce((sum, opt) => sum + opt.price, 0);
    const itemPrice = product.basePrice + optionsPrice;
    const itemId = generateCartItemId(product, selectedOptions);

    setCart((prevCart) => {
      // 동일한 아이템이 이미 있는지 확인 (id 또는 productId + options 조합으로)
      const existingItemIndex = prevCart.findIndex(
        (item) =>
          item.id === itemId ||
          (item.productId === product.id &&
            JSON.stringify(item.selectedOptions.map((opt) => opt.optionId).sort()) ===
              JSON.stringify(selectedOptions.sort()))
      );

      if (existingItemIndex >= 0) {
        // 기존 아이템의 수량 증가
        const updatedCart = [...prevCart];
        const existingItem = updatedCart[existingItemIndex];
        const newQuantity = existingItem.quantity + 1;
        updatedCart[existingItemIndex] = {
          ...existingItem,
          id: existingItem.id || itemId, // id가 없으면 추가
          quantity: newQuantity,
          totalPrice: itemPrice * newQuantity,
        };
        return updatedCart;
      }

      // 새 아이템 추가
      const newItem: CartItem = {
        id: itemId, // 고유 ID 추가
        productId: product.id,
        productName: product.name,
        basePrice: product.basePrice,
        selectedOptions: selectedOptionsData.map((opt) => ({
          optionId: opt.id,
          optionName: opt.name,
          optionPrice: opt.price,
        })),
        quantity: 1,
        totalPrice: itemPrice,
      };

      return [...prevCart, newItem];
    });
  }, []);

  /**
   * 장바구니에서 아이템 제거
   */
  const removeFromCart = useCallback((itemId: string) => {
    setCart((prevCart) => {
      // itemId로 아이템 찾기 (id 필드 또는 인덱스)
      const index = prevCart.findIndex((item) => item.id === itemId);
      if (index >= 0) {
        return prevCart.filter((_, i) => i !== index);
      }
      // id가 없는 경우 인덱스로 처리 (하위 호환성)
      const indexNum = parseInt(itemId, 10);
      if (!isNaN(indexNum) && indexNum >= 0 && indexNum < prevCart.length) {
        return prevCart.filter((_, i) => i !== indexNum);
      }
      return prevCart;
    });
  }, []);

  /**
   * 장바구니 아이템 수량 업데이트
   */
  const updateQuantity = useCallback((itemId: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    setCart((prevCart) => {
      // itemId로 아이템 찾기
      const index = prevCart.findIndex((item) => item.id === itemId);
      if (index >= 0) {
        const updatedCart = [...prevCart];
        const item = updatedCart[index];
        const itemPricePerUnit = item.totalPrice / item.quantity;
        updatedCart[index] = {
          ...item,
          quantity,
          totalPrice: itemPricePerUnit * quantity,
        };
        return updatedCart;
      }
      // id가 없는 경우 인덱스로 처리 (하위 호환성)
      const indexNum = parseInt(itemId, 10);
      if (!isNaN(indexNum) && indexNum >= 0 && indexNum < prevCart.length) {
        const updatedCart = [...prevCart];
        const item = updatedCart[indexNum];
        const itemPricePerUnit = item.totalPrice / item.quantity;
        updatedCart[indexNum] = {
          ...item,
          quantity,
          totalPrice: itemPricePerUnit * quantity,
        };
        return updatedCart;
      }
      return prevCart;
    });
  }, [removeFromCart]);

  /**
   * 장바구니 비우기
   */
  const clearCart = useCallback(() => {
    setCart([]);
    localStorage.removeItem(CART_STORAGE_KEY);
  }, []);

  /**
   * 장바구니 총 금액 계산
   */
  const getTotal = useCallback(() => {
    return cart.reduce((sum, item) => sum + item.totalPrice, 0);
  }, [cart]);

  /**
   * 장바구니 아이템 총 개수 계산
   */
  const getItemCount = useCallback(() => {
    return cart.reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const value: CartContextType = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotal,
    getItemCount,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/**
 * CartContext를 사용하는 커스텀 훅
 */
export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

