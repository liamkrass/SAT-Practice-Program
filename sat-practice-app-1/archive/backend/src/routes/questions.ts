import { Router } from 'express';
import { QuestionsController } from '../controllers/questionsController';

const router = Router();
const questionsController = new QuestionsController();

export function setQuestionsRoutes(app: Router) {
    app.use('/api/questions', router);
    router.get('/', questionsController.getQuestions.bind(questionsController));
    router.get('/:id', questionsController.getQuestionById.bind(questionsController));
}