import { Router } from 'express';
import { getDashboardStats, updateRecommendationWeights } from '../controllers/adminController';

const router = Router();

router.get('/dashboard', getDashboardStats);
router.put('/recommendation-weights', updateRecommendationWeights);

export default router;

