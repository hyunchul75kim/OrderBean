import { Product } from '../models/Product';

export const productRepository = {
  findAll: async (): Promise<Product[]> => {
    // TODO: 데이터베이스에서 상품 목록 조회
    return [];
  },
  findById: async (id: string): Promise<Product | null> => {
    // TODO: 데이터베이스에서 상품 조회
    return null;
  },
  create: async (product: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
    // TODO: 데이터베이스에 상품 생성
    throw new Error('Not implemented');
  },
  update: async (id: string, product: Partial<Product>): Promise<Product> => {
    // TODO: 데이터베이스에서 상품 수정
    throw new Error('Not implemented');
  },
  delete: async (id: string): Promise<boolean> => {
    // TODO: 데이터베이스에서 상품 삭제
    return false;
  },
};

