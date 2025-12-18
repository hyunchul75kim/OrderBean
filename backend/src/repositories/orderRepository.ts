import { Order } from '../models/Order';

export const orderRepository = {
  create: async (order: Omit<Order, 'id' | 'createdAt' | 'updatedAt'>): Promise<Order> => {
    // TODO: 데이터베이스에 주문 생성
    throw new Error('Not implemented');
  },
  findAll: async (): Promise<Order[]> => {
    // TODO: 데이터베이스에서 모든 주문 조회
    return [];
  },
  findById: async (id: string): Promise<Order | null> => {
    // TODO: 데이터베이스에서 주문 조회
    return null;
  },
  findByOrderNumber: async (orderNumber: string): Promise<Order | null> => {
    // TODO: 데이터베이스에서 주문 번호로 조회
    return null;
  },
  update: async (id: string, order: Partial<Order>): Promise<Order> => {
    // TODO: 데이터베이스에서 주문 수정
    throw new Error('Not implemented');
  },
};

