import { Router } from 'express';
import { getRecommendations } from '../controllers/recommendationController';

const router = Router();

router.get('/:surveyId', getRecommendations);

export default router;

