class Question {
    questionText: string;
    options: string[];
    correctAnswer: string;

    constructor(questionText: string, options: string[], correctAnswer: string) {
        this.questionText = questionText;
        this.options = options;
        this.correctAnswer = correctAnswer;
    }

    validateAnswer(answer: string): boolean {
        return answer === this.correctAnswer;
    }

    getQuestionDetails(): { questionText: string; options: string[] } {
        return {
            questionText: this.questionText,
            options: this.options,
        };
    }
}

export default Question;