import { Request, Response } from 'express';
import { exampleQuestions } from '../exampleQuestions';
import { Question } from '../types';
import path from 'path';

declare var process: any;

export class QuestionsController {
    private questions: Question[] = exampleQuestions;
    private questionsLoaded: Promise<void> = Promise.resolve();

    constructor() {}

    public getQuestions = async (req: Request, res: Response) => {
        try {
            await this.questionsLoaded;
            if (!this.questions.length) {
                return res.status(500).json({ error: 'No questions loaded. Check server logs for details.' });
            }
            res.json(this.questions);
        } catch (err) {
            res.status(500).json({ error: 'Failed to load questions.' });
        }
    };

    public getQuestionById = async (req: Request, res: Response) => {
        await this.questionsLoaded;
        const questionId = req.params.id;
        const question = this.questions.find(q => q.id === questionId);
        if (question) {
            res.json(question);
        } else {
            res.status(404).send('Question not found');
        }
    };
}