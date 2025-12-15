export interface OrderRequest {
  productId: string;
  grindType: string;
  quantity: number;
}

export const orderService = {
  createOrder: async (order: OrderRequest) => {
    // TODO: 주문 생성 로직 구현
    return {
      orderId: 'order-1',
      orderNumber: `ORD-${Date.now()}`,
    };
  },
  getOrderById: async (orderId: string) => {
    // TODO: 주문 조회 로직 구현
    return null;
  },
};

