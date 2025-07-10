// Real SAT Questions - Only authentic questions from official PDF sources
export interface Question {
  id: string;
  text: string;
  category: 'math' | 'verbal';
  skill: string;
  options: string[];
  correctAnswer: string;
  domain?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  source?: string;
}

// Import all 245 authentic SAT Math Questions from RTF/PDF
import { satMathQuestions } from './satMathQuestions';

// Main questions array - Only authentic PDF questions
export const satQuestions: Question[] = [
  ...satMathQuestions  // 245 authentic SAT questions from official PDF
];

// Math questions only (all current questions are math from PDF)
export const mathQuestions: Question[] = satMathQuestions;

// Verbal questions (currently empty - awaiting PDF extraction)
export const verbalQuestions: Question[] = [];

// Legacy export for backward compatibility
export const exampleQuestions = satQuestions;

// Filter functions for easy question selection
export const getQuestionsByCategory = (category: 'math' | 'verbal'): Question[] => 
  satQuestions.filter(q => q.category === category);

export const getQuestionsBySkill = (skill: string): Question[] => 
  satQuestions.filter(q => q.skill === skill);

export const getQuestionsByDomain = (domain: string): Question[] => 
  satQuestions.filter(q => q.domain === domain);

export const getQuestionsByDifficulty = (difficulty: string): Question[] => 
  satQuestions.filter(q => q.difficulty === difficulty);

// Get random questions
export const getRandomQuestions = (count: number, category?: 'math' | 'verbal'): Question[] => {
  const pool = category ? getQuestionsByCategory(category) : satQuestions;
  const shuffled = [...pool].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
};

// Summary statistics
export const getQuestionStats = () => {
  const byDomain: any = {};
  const byDifficulty: any = {};
  
  satQuestions.forEach(q => {
    const domain = q.domain || 'unknown';
    byDomain[domain] = (byDomain[domain] || 0) + 1;
    
    const difficulty = q.difficulty || 'unknown';
    byDifficulty[difficulty] = (byDifficulty[difficulty] || 0) + 1;
  });

  return {
    total: satQuestions.length,
    math: mathQuestions.length,
    verbal: verbalQuestions.length,
    byDomain,
    byDifficulty
  };
};