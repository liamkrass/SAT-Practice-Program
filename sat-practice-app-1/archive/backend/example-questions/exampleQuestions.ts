// Example SAT questions for development and testing
// You can later replace or extend this with real questions extracted from PDFs

import { Question } from '../src/types';

export const exampleQuestions: Question[] = [
  {
    id: 'q1',
    text: 'What is the value of x if 2x + 3 = 7?',
    category: 'math',
    skill: 'linear equations',
    options: ['1', '2', '3', '4'],
    correctAnswer: '2',
  },
  {
    id: 'q2',
    text: 'Which of the following best describes the main idea of the passage?',
    category: 'verbal',
    skill: 'main idea',
    options: [
      'A. The author describes a historical event.',
      'B. The author explains a scientific process.',
      'C. The author argues for a policy change.',
      'D. The author narrates a personal story.'
    ],
    correctAnswer: 'A. The author describes a historical event.',
  },
  {
    id: 'q3',
    text: 'If f(x) = x^2, what is f(3)?',
    category: 'math',
    skill: 'functions',
    options: ['6', '9', '3', '12'],
    correctAnswer: '9',
  },
];
