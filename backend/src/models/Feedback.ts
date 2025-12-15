export interface Feedback {
  id: string;
  orderId: string;
  productId: string;
  userId?: string;
  rating: number; // 1-5
  comment?: string;
  createdAt: Date;
}

