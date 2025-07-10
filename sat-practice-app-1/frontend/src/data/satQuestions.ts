// Main questions export combining all question sources
// Generated: 2025-07-01

export type { Question } from './mathQuestions';
import { mathQuestions, questionStats as mathStats } from './mathQuestions';

// Export all math questions as the primary source
function shuffleArray<T>(array: T[]): T[] {
  // Fisher-Yates shuffle
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export const satQuestions = shuffleArray(mathQuestions);

// Export by category
export const mathQuestionsList = mathQuestions;
export const verbalQuestionsList: any[] = []; // To be populated later with verbal questions

// Export by domain (from new TXT source)
export const algebraQuestions = mathQuestions.filter(q => q.domain === 'Algebra');
export const geometryQuestions = mathQuestions.filter(q => q.domain === 'Geometry and Trigonometry');
export const advancedMathQuestions = mathQuestions.filter(q => q.domain === 'Advanced Math');
export const problemSolvingQuestions = mathQuestions.filter(q => q.domain === 'Problem-Solving and Data Analysis');
export const additionalTopicsQuestions = mathQuestions.filter(q => q.domain === 'Additional Topics in Math');

// Export by difficulty
export const easyQuestions = mathQuestions.filter(q => q.difficulty === 'easy');
export const mediumQuestions = mathQuestions.filter(q => q.difficulty === 'medium');
export const hardQuestions = mathQuestions.filter(q => q.difficulty === 'hard');

// Utility functions
export const getQuestionsByCategory = (category: 'math' | 'verbal') => {
  return mathQuestions.filter(q => q.category === category);
};

export const getQuestionsByDomain = (domain: string) => {
  return mathQuestions.filter(q => q.domain === domain);
};

export const getQuestionsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => {
  return mathQuestions.filter(q => q.difficulty === difficulty);
};

export const getRandomQuestions = (count: number, category?: 'math' | 'verbal', domain?: string) => {
  let pool = mathQuestions;
  
  if (category) {
    pool = pool.filter(q => q.category === category);
  }
  
  if (domain) {
    pool = pool.filter(q => q.domain === domain);
  }
  
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Updated statistics
export const questionStats = {
  total: mathQuestions.length,
  math: mathQuestions.filter(q => q.category === 'math').length,
  verbal: mathQuestions.filter(q => q.category === 'verbal').length,
  byDomain: {
    algebra: algebraQuestions.length,
    geometry: geometryQuestions.length,
    advancedMath: advancedMathQuestions.length,
    problemSolving: problemSolvingQuestions.length,
    additionalTopics: additionalTopicsQuestions.length
  },
  byDifficulty: {
    easy: easyQuestions.length,
    medium: mediumQuestions.length,
    hard: hardQuestions.length
  },
  source: 'College Board TXT Import'
};

// Legacy exports for backward compatibility
export const satMathQuestions = mathQuestions;
export default satQuestions;
