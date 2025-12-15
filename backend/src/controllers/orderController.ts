import { Request, Response } from 'express';

export const createOrder = async (req: Request, res: Response) => {
  try {
    // TODO: 주문 생성 로직 구현
    res.json({ orderId: '', orderNumber: '' });
  } catch (error) {
    res.status(500).json({ message: 'Error creating order' });
  }
};

export const getOrder = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    // TODO: 주문 조회 로직 구현
    res.json({ order: {} });
  } catch (error) {
    res.status(500).json({ message: 'Error getting order' });
  }
};

