import { Router } from 'express';
import { createOrder, getOrder } from '../controllers/orderController';

const router = Router();

router.post('/', createOrder);
router.get('/:id', getOrder);

export default router;

