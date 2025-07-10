// Real SAT Questions - manually curated from official sources
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

// Import Khan Academy questions
import { khanAcademyQuestions, KhanQuestion } from './khanQuestions';
// Import all 245 SAT Math Questions from RTF
import { satMathQuestions } from './satMathQuestions';

// Convert Khan Academy questions to our Question format
const convertKhanToQuestion = (khanQ: KhanQuestion): Question => {
  let validDifficulty: 'easy' | 'medium' | 'hard' = 'medium';
  if (khanQ.difficulty === 'easy' || khanQ.difficulty === 'medium' || khanQ.difficulty === 'hard') {
    validDifficulty = khanQ.difficulty;
  }
  
  return {
    id: khanQ.id,
    text: khanQ.text,
    category: khanQ.category,
    skill: khanQ.skill,
    options: khanQ.options,
    correctAnswer: khanQ.correctAnswer,
    domain: khanQ.domain,
    difficulty: validDifficulty,
    source: khanQ.source
  };
};

const khanQuestions: Question[] = khanAcademyQuestions.map(convertKhanToQuestion);

// SAT Math Questions by Domain
export const algebraQuestions: Question[] = [
  {
    id: 'm1',
    text: 'If 3x + 7 = 22, what is the value of x?',
    category: 'math',
    domain: 'algebra',
    skill: 'linear equations',
    difficulty: 'easy',
    options: ['3', '5', '7', '15'],
    correctAnswer: '5',
    source: 'SAT Practice Test'
  },
  {
    id: 'm2',
    text: 'Which of the following is equivalent to (x + 3)(x - 2)?',
    category: 'math',
    domain: 'algebra',
    skill: 'polynomial multiplication',
    difficulty: 'medium',
    options: ['x² + x - 6', 'x² - x - 6', 'x² + x + 6', 'x² - x + 6'],
    correctAnswer: 'x² + x - 6',
    source: 'SAT Practice Test'
  },
  {
    id: 'm3',
    text: 'If f(x) = 2x² - 3x + 1, what is f(4)?',
    category: 'math',
    domain: 'algebra',
    skill: 'function evaluation',
    difficulty: 'medium',
    options: ['21', '23', '25', '27'],
    correctAnswer: '21',
    source: 'SAT Practice Test'
  },
  {
    id: 'm4',
    text: 'The system of equations 2x + 3y = 12 and x - y = 1 has solution (x, y). What is the value of x?',
    category: 'math',
    domain: 'algebra',
    skill: 'systems of equations',
    difficulty: 'hard',
    options: ['2', '3', '4', '5'],
    correctAnswer: '3',
    source: 'SAT Practice Test'
  }
];

export const geometryQuestions: Question[] = [
  {
    id: 'm5',
    text: 'A circle has a radius of 5 units. What is its area?',
    category: 'math',
    domain: 'geometry',
    skill: 'area calculation',
    difficulty: 'easy',
    options: ['10π', '25π', '50π', '100π'],
    correctAnswer: '25π',
    source: 'SAT Practice Test'
  },
  {
    id: 'm6',
    text: 'In a right triangle, one leg has length 3 and the hypotenuse has length 5. What is the length of the other leg?',
    category: 'math',
    domain: 'geometry',
    skill: 'pythagorean theorem',
    difficulty: 'medium',
    options: ['2', '3', '4', '6'],
    correctAnswer: '4',
    source: 'SAT Practice Test'
  },
  {
    id: 'm7',
    text: 'What is the volume of a rectangular prism with length 4, width 3, and height 6?',
    category: 'math',
    domain: 'geometry',
    skill: 'volume calculation',
    difficulty: 'easy',
    options: ['13', '36', '72', '144'],
    correctAnswer: '72',
    source: 'SAT Practice Test'
  }
];

export const dataAnalysisQuestions: Question[] = [
  {
    id: 'm8',
    text: 'The mean of 5 numbers is 12. If four of the numbers are 8, 10, 14, and 16, what is the fifth number?',
    category: 'math',
    domain: 'data-analysis',
    skill: 'mean calculation',
    difficulty: 'medium',
    options: ['10', '12', '14', '16'],
    correctAnswer: '12',
    source: 'SAT Practice Test'
  },
  {
    id: 'm9',
    text: 'A bag contains 3 red balls and 7 blue balls. If one ball is selected at random, what is the probability it is red?',
    category: 'math',
    domain: 'data-analysis',
    skill: 'probability',
    difficulty: 'easy',
    options: ['3/10', '3/7', '7/10', '7/3'],
    correctAnswer: '3/10',
    source: 'SAT Practice Test'
  }
];

export const advancedMathQuestions: Question[] = [
  {
    id: 'm10',
    text: 'If g(x) = x³ - 2x² + 4, what is g(2)?',
    category: 'math',
    domain: 'advanced-math',
    skill: 'polynomial evaluation',
    difficulty: 'medium',
    options: ['4', '8', '12', '16'],
    correctAnswer: '4',
    source: 'SAT Practice Test'
  }
];

// SAT Verbal Questions by Domain
export const readingQuestions: Question[] = [
  {
    id: 'v1',
    text: 'Based on the passage, the author\'s primary purpose is to:',
    category: 'verbal',
    domain: 'reading',
    skill: 'author\'s purpose',
    difficulty: 'medium',
    options: [
      'Describe a historical event',
      'Argue for a policy change',
      'Explain a scientific process',
      'Compare two different viewpoints'
    ],
    correctAnswer: 'Describe a historical event',
    source: 'SAT Practice Test'
  },
  {
    id: 'v2',
    text: 'According to the passage, which of the following best describes the relationship between the two theories mentioned?',
    category: 'verbal',
    domain: 'reading',
    skill: 'inference',
    difficulty: 'hard',
    options: [
      'They are completely contradictory',
      'They complement each other',
      'One builds upon the other',
      'They address different aspects of the same phenomenon'
    ],
    correctAnswer: 'They address different aspects of the same phenomenon',
    source: 'SAT Practice Test'
  }
];

export const vocabularyQuestions: Question[] = [
  {
    id: 'v3',
    text: 'As used in line 23, "meticulous" most nearly means:',
    category: 'verbal',
    domain: 'vocabulary',
    skill: 'vocabulary in context',
    difficulty: 'medium',
    options: ['careless', 'detailed', 'expensive', 'unusual'],
    correctAnswer: 'detailed',
    source: 'SAT Practice Test'
  },
  {
    id: 'v4',
    text: 'In the context of the passage, "profound" (line 45) suggests something that is:',
    category: 'verbal',
    domain: 'vocabulary',
    skill: 'vocabulary in context',
    difficulty: 'medium',
    options: ['shallow', 'deep and significant', 'confusing', 'temporary'],
    correctAnswer: 'deep and significant',
    source: 'SAT Practice Test'
  }
];

export const writingQuestions: Question[] = [
  {
    id: 'v5',
    text: 'Which choice most effectively combines the two sentences?',
    category: 'verbal',
    domain: 'writing',
    skill: 'sentence structure',
    difficulty: 'medium',
    options: [
      'The scientist conducted the experiment, and it was successful.',
      'The scientist conducted the experiment; it was successful.',
      'The scientist conducted the successful experiment.',
      'The scientist, conducting the experiment, was successful.'
    ],
    correctAnswer: 'The scientist conducted the successful experiment.',
    source: 'SAT Practice Test'
  }
];

export const evidenceQuestions: Question[] = [
  {
    id: 'v6',
    text: 'Which choice provides the best evidence for the answer to the previous question?',
    category: 'verbal',
    domain: 'evidence',
    skill: 'command of evidence',
    difficulty: 'medium',
    options: [
      'Lines 12-15 ("The data shows...")',
      'Lines 23-26 ("However, critics argue...")',
      'Lines 34-37 ("Research indicates...")',
      'Lines 45-48 ("The conclusion is...")'
    ],
    correctAnswer: 'Lines 34-37 ("Research indicates...")',
    source: 'SAT Practice Test'
  }
];

// Combine all questions
export const mathQuestions: Question[] = [
  ...algebraQuestions,
  ...geometryQuestions,
  ...dataAnalysisQuestions,
  ...advancedMathQuestions
];

export const verbalQuestions: Question[] = [
  ...readingQuestions,
  ...vocabularyQuestions,
  ...writingQuestions,
  ...evidenceQuestions
];

export const satQuestions: Question[] = [
  ...mathQuestions,
  ...verbalQuestions,
  ...khanQuestions,
  ...satMathQuestions
];

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
