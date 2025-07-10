"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class Question {
    constructor(questionText, options, correctAnswer) {
        this.questionText = questionText;
        this.options = options;
        this.correctAnswer = correctAnswer;
    }
    validateAnswer(answer) {
        return answer === this.correctAnswer;
    }
    getQuestionDetails() {
        return {
            questionText: this.questionText,
            options: this.options,
        };
    }
}
exports.default = Question;
