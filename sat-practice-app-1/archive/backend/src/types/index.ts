export interface Question {
    id: string;
    text: string;
    category: 'math' | 'verbal';
    skill: string;
    options: string[];
    correctAnswer: string;
    domain?: string;
    difficulty?: string;
    source?: string;
}

export interface Score {
    overall: number;
    math: {
        score: number;
        breakdown: { [skill: string]: number };
    };
    verbal: {
        score: number;
        breakdown: { [skill: string]: number };
    };
}

export interface Skill {
    name: string;
    description: string;
}