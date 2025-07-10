import { Router } from 'express';
import { ScoringController } from '../controllers/scoringController';

const router = Router();

export function setScoringRoutes(app: Router) {
    app.use('/scoring', router);
    router.post('/calculate', ScoringController.getScores);
}