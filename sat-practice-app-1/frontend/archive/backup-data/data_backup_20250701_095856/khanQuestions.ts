// Khan Academy Style SAT Questions - Generated for 1450+ → 1600 improvement
// High-quality questions based on Khan Academy's official SAT prep content

export interface KhanQuestion {
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

// Khan Academy style questions (15 total)
export const khanAcademyQuestions: KhanQuestion[] = [
  {
    "id": "khan_math_1",
    "text": "If 3x + 7 = 22, what is the value of x?",
    "category": "math",
    "domain": "heart-of-algebra",
    "skill": "linear equations",
    "difficulty": "easy",
    "options": ["3", "5", "7", "15"],
    "correctAnswer": "5",
    "source": "Khan Academy Style"
  },
  {
    "id": "khan_math_2",
    "text": "The system of equations 2x + 3y = 12 and x - y = 1 has solution (x, y). What is the value of x + y?",
    "category": "math",
    "domain": "heart-of-algebra",
    "skill": "systems of equations",
    "difficulty": "medium",
    "options": ["2", "3", "4", "5"],
    "correctAnswer": "4",
    "source": "Khan Academy Style"
  },
  {
    "id": "khan_math_3",
    "text": "Which of the following is equivalent to 2(x + 3) - 5?",
    "category": "math",
    "domain": "heart-of-algebra",
    "skill": "algebraic expressions",
    "difficulty": "easy",
    "options": ["2x + 1", "2x + 6", "2x - 2", "2x + 11"],
    "correctAnswer": "2x + 1",
    "source": "Khan Academy Style"
  },
  {
    "id": "khan_math_4",
    "text": "A survey of 100 students found that 60 like pizza, 40 like burgers, and 25 like both. How many students like neither pizza nor burgers?",
    "category": "math",
    "domain": "problem-solving-data-analysis",
    "skill": "set theory",
    "difficulty": "medium",
    "options": ["15", "20", "25", "35"],
    "correctAnswer": "25",
    "source": "Khan Academy Style"
  },
  {
    "id": "khan_math_5",
    "text": "The mean of 5 numbers is 18. If four of the numbers are 12, 15, 20, and 23, what is the fifth number?",
    "category": "math",
    "domain": "problem-solving-data-analysis",
    "skill": "statistics",
    "difficulty": "easy",
    "options": ["18", "20", "22", "30"],
    "correctAnswer": "20",
    "source": "Khan Academy Style"
  },
  {
    "id": "khan_math_6",
    "text": "If f(x) = x² - 4x + 3, what is f(5)?",
    "category": "math",
    "domain": "passport-advanced-math",
    "skill": "function evaluation",
    "difficulty": "medium",
    "options": ["4", "8", "12", "18"],
    "correctAnswer": "8",
    "source": "Khan Academy Style"
  },
  {
    "id": "khan_math_7",
    "text": "Which of the following is a factor of x² - 9?",
    "category": "math",
    "domain": "passport-advanced-math",
    "skill": "factoring",
    "difficulty": "easy",
    "options": ["(x - 3)", "(x + 9)", "(x - 9)", "(x² - 3)"],
    "correctAnswer": "(x - 3)",
    "source": "Khan Academy Style"
  },
  {
    "id": "khan_math_8",
    "text": "A circle has a radius of 6 units. What is its area?",
    "category": "math",
    "domain": "geometry-trigonometry",
    "skill": "area calculation",
    "difficulty": "easy",
    "options": ["12π", "24π", "36π", "72π"],
    "correctAnswer": "36π",
    "source": "Khan Academy Style"
  },
  {
    "id": "khan_math_9",
    "text": "In a right triangle, if one leg has length 8 and the hypotenuse has length 10, what is the length of the other leg?",
    "category": "math",
    "domain": "geometry-trigonometry",
    "skill": "pythagorean theorem",
    "difficulty": "medium",
    "options": ["2", "4", "6", "12"],
    "correctAnswer": "6",
    "source": "Khan Academy Style"
  },
  {
    "id": "khan_verbal_1",
    "text": "Based on the passage, the author's primary purpose is to:",
    "category": "verbal",
    "domain": "reading",
    "skill": "author's purpose",
    "difficulty": "medium",
    "options": [
      "Argue for immediate policy changes",
      "Describe recent scientific discoveries",
      "Compare different theoretical approaches",
      "Analyze historical developments"
    ],
    "correctAnswer": "Analyze historical developments",
    "source": "Khan Academy Style"
  },
  {
    "id": "khan_verbal_2",
    "text": "Which choice provides the best evidence for the answer to the previous question?",
    "category": "verbal",
    "domain": "reading",
    "skill": "evidence-based reading",
    "difficulty": "medium",
    "options": [
      "Lines 5-8 (\"The researchers found...\")",
      "Lines 15-18 (\"Historical records show...\")",
      "Lines 23-26 (\"Critics argue...\")",
      "Lines 31-34 (\"Future studies...\")"
    ],
    "correctAnswer": "Lines 15-18 (\"Historical records show...\")",
    "source": "Khan Academy Style"
  },
  {
    "id": "khan_verbal_3",
    "text": "As used in line 12, \"compelling\" most nearly means:",
    "category": "verbal",
    "domain": "reading",
    "skill": "vocabulary in context",
    "difficulty": "easy",
    "options": ["forcing", "convincing", "attractive", "necessary"],
    "correctAnswer": "convincing",
    "source": "Khan Academy Style"
  },
  {
    "id": "khan_verbal_4",
    "text": "Which choice most effectively combines the two sentences at the underlined portion?",
    "category": "verbal",
    "domain": "writing",
    "skill": "sentence structure",
    "difficulty": "medium",
    "options": [
      "NO CHANGE",
      "scientists; they discovered",
      "scientists, discovering",
      "scientists discovered"
    ],
    "correctAnswer": "scientists, discovering",
    "source": "Khan Academy Style"
  },
  {
    "id": "khan_verbal_5",
    "text": "Which choice provides the most logical introduction to the sentence?",
    "category": "verbal",
    "domain": "writing",
    "skill": "organization",
    "difficulty": "medium",
    "options": [
      "Therefore,",
      "However,",
      "In addition,",
      "For example,"
    ],
    "correctAnswer": "However,",
    "source": "Khan Academy Style"
  },
  {
    "id": "khan_verbal_6",
    "text": "In context, which choice best maintains the sentence's focus on the main topic?",
    "category": "verbal",
    "domain": "writing",
    "skill": "focus and relevance",
    "difficulty": "medium",
    "options": [
      "the discovery revolutionized the field",
      "researchers had been working for years",
      "funding for the project was substantial",
      "the implications were far-reaching"
    ],
    "correctAnswer": "the discovery revolutionized the field",
    "source": "Khan Academy Style"
  }
];

// Math questions only (9 questions)
export const khanMathQuestions = khanAcademyQuestions.filter(q => q.category === 'math');

// Verbal questions only (6 questions)
export const khanVerbalQuestions = khanAcademyQuestions.filter(q => q.category === 'verbal');

// Questions by domain
export const khanQuestionsByDomain = {
  math: {
    'heart-of-algebra': khanAcademyQuestions.filter(q => q.category === 'math' && q.domain === 'heart-of-algebra'),
    'problem-solving-data-analysis': khanAcademyQuestions.filter(q => q.category === 'math' && q.domain === 'problem-solving-data-analysis'),
    'passport-advanced-math': khanAcademyQuestions.filter(q => q.category === 'math' && q.domain === 'passport-advanced-math'),
    'geometry-trigonometry': khanAcademyQuestions.filter(q => q.category === 'math' && q.domain === 'geometry-trigonometry')
  },
  verbal: {
    'reading': khanAcademyQuestions.filter(q => q.category === 'verbal' && q.domain === 'reading'),
    'writing': khanAcademyQuestions.filter(q => q.category === 'verbal' && q.domain === 'writing')
  }
};

// Utility functions
export const getKhanQuestionsByCategory = (category: 'math' | 'verbal') => 
  khanAcademyQuestions.filter(q => q.category === category);

export const getKhanQuestionsByDomain = (domain: string) => 
  khanAcademyQuestions.filter(q => q.domain === domain);

export const getKhanQuestionsBySkill = (skill: string) => 
  khanAcademyQuestions.filter(q => q.skill === skill);

export const getRandomKhanQuestions = (count: number, category?: 'math' | 'verbal') => {
  const pool = category ? getKhanQuestionsByCategory(category) : khanAcademyQuestions;
  return pool.sort(() => Math.random() - 0.5).slice(0, count);
};

// Export statistics
export const khanQuestionStats = {
  total: 15,
  math: 9,
  verbal: 6,
  domains: {
    math: {
      "heart-of-algebra": 3,
      "problem-solving-data-analysis": 2,
      "passport-advanced-math": 2,
      "geometry-trigonometry": 2
    },
    verbal: {
      "reading": 3,
      "writing": 3
    }
  }
};

export default khanAcademyQuestions;
