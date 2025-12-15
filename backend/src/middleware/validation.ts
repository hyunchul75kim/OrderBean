import { Request, Response, NextFunction } from 'express';

export const validateSurvey = (req: Request, res: Response, next: NextFunction) => {
  // TODO: 설문 데이터 검증 로직 구현
  next();
};

export const validateOrder = (req: Request, res: Response, next: NextFunction) => {
  // TODO: 주문 데이터 검증 로직 구현
  next();
};

