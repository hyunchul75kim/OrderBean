import { Router } from 'express';
import { submitSurvey } from '../controllers/surveyController';

const router = Router();

router.post('/', submitSurvey);

export default router;

