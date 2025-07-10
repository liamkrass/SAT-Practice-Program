export interface Question {
    questionText: string;
    options: string[];
    correctAnswer: string;
    validateAnswer(answer: string): boolean;
    getQuestionDetails(): string;
}

export interface UserSession {
    userId: string;
    score: number;
    answeredQuestions: string[];
    startTime: Date;
    endTime: Date;
}