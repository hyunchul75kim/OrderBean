import { Feedback } from '../models/Feedback';

export const feedbackRepository = {
  create: async (feedback: Omit<Feedback, 'id' | 'createdAt'>): Promise<Feedback> => {
    // TODO: 데이터베이스에 피드백 생성
    throw new Error('Not implemented');
  },
  findByProductId: async (productId: string): Promise<Feedback[]> => {
    // TODO: 데이터베이스에서 상품별 피드백 조회
    return [];
  },
  findByUserId: async (userId: string): Promise<Feedback[]> => {
    // TODO: 데이터베이스에서 사용자별 피드백 조회
    return [];
  },
};

