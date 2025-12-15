export interface FeedbackData {
  orderId: string;
  productId: string;
  rating: number; // 1-5
  comment?: string;
}

export const feedbackService = {
  submitFeedback: async (feedback: FeedbackData) => {
    // TODO: 피드백 저장 로직 구현
    return { feedbackId: 'feedback-1' };
  },
};

