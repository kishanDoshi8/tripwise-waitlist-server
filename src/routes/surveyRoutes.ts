import express from 'express';
import { createSurvey, updateSurvey } from '../controllers/surveyController';

const router = express.Router();

router.post('/', createSurvey);
router.put('/:id', updateSurvey);

export default router;