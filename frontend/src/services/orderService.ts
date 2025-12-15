import { apiClient } from './api';

export interface OrderRequest {
  productId: string;
  grindType: string;
  quantity: number;
}

export interface OrderResponse {
  orderId: string;
  orderNumber: string;
}

export const orderService = {
  createOrder: async (order: OrderRequest): Promise<OrderResponse> => {
    return apiClient.post('/orders', order);
  },
  getOrder: async (orderId: string) => {
    return apiClient.get(`/orders/${orderId}`);
  },
};

