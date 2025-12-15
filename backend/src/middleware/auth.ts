import { Request, Response, NextFunction } from 'express';

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  // TODO: 인증 로직 구현
  next();
};

export const authorizeAdmin = (req: Request, res: Response, next: NextFunction) => {
  // TODO: 관리자 권한 확인 로직 구현
  next();
};

