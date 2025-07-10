"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setRoutes = void 0;
const express_1 = require("express");
const satService_1 = require("../services/satService");
const router = (0, express_1.Router)();
const satService = new satService_1.SatService();
function setRoutes(app) {
    app.use('/api/questions', router);
    router.get('/', (req, res) => __awaiter(this, void 0, void 0, function* () {
        try {
            const questions = yield satService.getQuestions();
            res.json(questions);
        }
        catch (error) {
            res.status(500).json({ message: 'Error fetching questions' });
        }
    }));
    router.post('/score', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { answers } = req.body;
        try {
            const score = yield satService.scoreTest(answers);
            res.json({ score });
        }
        catch (error) {
            res.status(500).json({ message: 'Error scoring test' });
        }
    }));
    router.post('/session', (req, res) => __awaiter(this, void 0, void 0, function* () {
        const { sessionData } = req.body;
        try {
            yield satService.saveSession(sessionData);
            res.status(201).json({ message: 'Session saved' });
        }
        catch (error) {
            res.status(500).json({ message: 'Error saving session' });
        }
    }));
}
exports.setRoutes = setRoutes;
