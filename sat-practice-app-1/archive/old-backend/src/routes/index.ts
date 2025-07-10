import { Router, Application } from 'express';
import { SatService } from '../services/satService';

const router = Router();
const satService = new SatService();

export function setRoutes(app: Application) {
    app.use('/api/questions', router);

    router.get('/', async (req, res) => {
        try {
            const questions = await satService.getQuestions();
            res.json(questions);
        } catch (error) {
            res.status(500).json({ message: 'Error fetching questions' });
        }
    });

    router.post('/score', async (req, res) => {
        const { answers } = req.body;
        try {
            const score = await satService.scoreTest(answers);
            res.json({ score });
        } catch (error) {
            res.status(500).json({ message: 'Error scoring test' });
        }
    });

    router.post('/session', async (req, res) => {
        const { sessionData } = req.body;
        try {
            await satService.saveSession(sessionData);
            res.status(201).json({ message: 'Session saved' });
        } catch (error) {
            res.status(500).json({ message: 'Error saving session' });
        }
    });
}