import { Request, Response } from 'express';

export const getRecommendations = async (req: Request, res: Response) => {
  try {
    const { surveyId } = req.params;
    // TODO: 추천 로직 구현
    res.json({ recommendations: [] });
  } catch (error) {
    res.status(500).json({ message: 'Error getting recommendations' });
  }
};

