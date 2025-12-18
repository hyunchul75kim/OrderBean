import { Router } from 'express';
import {
  getDashboardStats,
  getInventory,
  getOrders,
  updateInventory,
  updateOrderStatus,
  updateRecommendationWeights,
} from '../controllers/adminController';

const router = Router();

router.get('/dashboard/stats', getDashboardStats);
router.get('/inventory', getInventory);
router.get('/orders', getOrders);
router.put('/inventory/:productId', updateInventory);
router.put('/orders/:orderId/status', updateOrderStatus);
router.put('/recommendation-weights', updateRecommendationWeights);

export default router;

