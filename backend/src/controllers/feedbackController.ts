import { Request, Response } from 'express';

export const submitFeedback = async (req: Request, res: Response) => {
  try {
    // TODO: 피드백 저장 로직 구현
    res.json({ message: 'Feedback submitted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error submitting feedback' });
  }
};

