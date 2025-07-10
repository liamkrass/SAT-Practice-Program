export interface Question {
    id: string;
    text: string;
    category: 'math' | 'verbal';
    skill: string;
    options?: string[];
    correctAnswer?: string;
}

export interface Score {
    overall: number;
    math: number;
    verbal: number;
    detailedBreakdown: {
        [skill: string]: number;
    };
}

export interface Skill {
    name: string;
    description: string;
}