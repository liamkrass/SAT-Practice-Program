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

export function calculateScores(userResponses: any[]): Score {
    let totalScore = 0;
    let mathScore = 0;
    let verbalScore = 0;
    const mathBreakdown: { [skill: string]: number } = {};
    const verbalBreakdown: { [skill: string]: number } = {};

    userResponses.forEach(response => {
        const { category, skill, correct } = response;
        if (correct) {
            totalScore++;
            if (category === 'math') {
                mathScore++;
                mathBreakdown[skill] = (mathBreakdown[skill] || 0) + 1;
            } else if (category === 'verbal') {
                verbalScore++;
                verbalBreakdown[skill] = (verbalBreakdown[skill] || 0) + 1;
            }
        }
    });

    return {
        overall: totalScore,
        math: {
            score: mathScore,
            breakdown: mathBreakdown,
        },
        verbal: {
            score: verbalScore,
            breakdown: verbalBreakdown,
        },
    };
}