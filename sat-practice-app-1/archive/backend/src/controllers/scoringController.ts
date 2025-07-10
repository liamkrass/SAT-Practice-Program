import { Request, Response } from 'express';
import { calculateScores } from '../services/scoringService';
import { Score } from '../types';

export class ScoringController {
    public static async getScores(req: Request, res: Response): Promise<Response> {
        const userResponses = req.body.responses; // Assuming responses are sent in the request body
        const scores: Score = calculateScores(userResponses);
        
        return res.json(scores);
    }
}