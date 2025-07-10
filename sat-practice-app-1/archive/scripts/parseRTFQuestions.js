const fs = require('fs');
const path = require('path');

// Read the RTF file
const rtfPath = '/Users/liamkrass/Documents/satProjectV2/MathQuestionSat.rtf';
const rtfContent = fs.readFileSync(rtfPath, 'utf8');

// Function to clean RTF formatting and extract plain text
function cleanRTFText(text) {
  // Remove RTF formatting codes
  let cleaned = text
    .replace(/\\[a-z]+\d*\s?/g, '') // Remove RTF commands
    .replace(/\{|\}/g, '') // Remove braces
    .replace(/\\\*/g, '') // Remove escaped asterisks
    .replace(/\\'/g, "'") // Fix apostrophes
    .replace(/\\\\/g, '\\') // Fix backslashes
    .replace(/\s+/g, ' ') // Normalize whitespace
    .trim();

  // Handle Unicode characters
  cleaned = cleaned
    .replace(/\\u(\d+)/g, (match, code) => {
      const charCode = parseInt(code);
      if (charCode === 8722) return '-'; // minus sign
      if (charCode === 8804) return '≤'; // less than or equal
      if (charCode === 8805) return '≥'; // greater than or equal
      return String.fromCharCode(charCode);
    });

  return cleaned;
}

// Function to parse individual question
function parseQuestion(questionText) {
  const lines = questionText.split('\\');
  let question = {};
  
  // Extract question number
  const questionMatch = questionText.match(/QUESTION_(\d+)/);
  if (questionMatch) {
    question.id = `rtf_math_${questionMatch[1]}`;
  }

  // Clean the text and extract components
  const cleanText = cleanRTFText(questionText);
  
  // Extract question text
  const questionMatch2 = cleanText.match(/Question:\s*(.*?)\s*Visual:/s);
  if (questionMatch2) {
    question.text = questionMatch2[1].trim();
  }

  // Extract visual description
  const visualMatch = cleanText.match(/Visual:\s*(.*?)\s*A\)/s);
  if (visualMatch) {
    const visual = visualMatch[1].trim();
    if (visual && visual !== 'None') {
      question.visual = visual;
    }
  }

  // Extract options
  const optionsMatch = cleanText.match(/A\)\s*(.*?)\s*B\)\s*(.*?)\s*C\)\s*(.*?)\s*D\)\s*(.*?)\s*Answer:/s);
  if (optionsMatch) {
    question.options = [
      `A) ${optionsMatch[1].trim()}`,
      `B) ${optionsMatch[2].trim()}`,
      `C) ${optionsMatch[3].trim()}`,
      `D) ${optionsMatch[4].trim()}`
    ];
  }

  // Extract answer
  const answerMatch = cleanText.match(/Answer:\s*([A-D])/);
  if (answerMatch) {
    question.correctAnswer = answerMatch[1];
  }

  // Extract category
  const categoryMatch = cleanText.match(/Category:\s*(\w+)/);
  if (categoryMatch) {
    question.category = categoryMatch[1];
  }

  // Extract domain
  const domainMatch = cleanText.match(/Domain:\s*(.*?)\s*Skill:/s);
  if (domainMatch) {
    question.domain = domainMatch[1].trim();
  }

  // Extract skill
  const skillMatch = cleanText.match(/Skill:\s*(.*?)\s*Difficulty:/s);
  if (skillMatch) {
    question.skill = skillMatch[1].trim();
  }

  // Extract difficulty
  const difficultyMatch = cleanText.match(/Difficulty:\s*(\w+)/);
  if (difficultyMatch) {
    question.difficulty = difficultyMatch[1];
  }

  // Set source
  question.source = 'College Board RTF';

  return question;
}

// Split the RTF content into individual questions
const questionBlocks = rtfContent.split(/(?=\\f0\\b\\fs36[^\\]*QUESTION_\d+)/);
const questions = [];

console.log(`Found ${questionBlocks.length} question blocks`);

questionBlocks.forEach((block, index) => {
  if (block.includes('QUESTION_')) {
    try {
      const question = parseQuestion(block);
      if (question.id && question.text && question.options && question.correctAnswer) {
        questions.push(question);
        console.log(`Parsed question ${question.id}: ${question.text.substring(0, 50)}...`);
      } else {
        console.warn(`Question ${index} missing required fields:`, {
          hasId: !!question.id,
          hasText: !!question.text,
          hasOptions: !!question.options,
          hasAnswer: !!question.correctAnswer
        });
      }
    } catch (error) {
      console.error(`Error parsing question ${index}:`, error.message);
    }
  }
});

console.log(`Successfully parsed ${questions.length} questions`);

// Generate TypeScript interface and questions array
const generateQuestionsFile = (questions) => {
  const header = `// Generated from MathQuestionSat.rtf - ${new Date().toISOString()}
// Total questions: ${questions.length}

export interface Question {
  id: string;
  text: string;
  category: 'math' | 'verbal';
  domain: string;
  skill: string;
  difficulty: 'easy' | 'medium' | 'hard';
  options: string[];
  correctAnswer: string;
  visual?: string;
  source: string;
}

export const rtfMathQuestions: Question[] = [`;

  const questionStrings = questions.map((q, index) => {
    const visualProp = q.visual ? `\n    visual: ${JSON.stringify(q.visual)},` : '';
    
    return `  {
    id: ${JSON.stringify(q.id)},
    text: ${JSON.stringify(q.text)},
    category: ${JSON.stringify(q.category)},
    domain: ${JSON.stringify(q.domain)},
    skill: ${JSON.stringify(q.skill)},
    difficulty: ${JSON.stringify(q.difficulty)},
    options: ${JSON.stringify(q.options, null, 6).replace(/\n/g, '\n    ')},
    correctAnswer: ${JSON.stringify(q.correctAnswer)},${visualProp}
    source: ${JSON.stringify(q.source)}
  }`;
  });

  const footer = `];

// Export by domain for easier filtering
export const algebraQuestions = rtfMathQuestions.filter(q => q.domain === 'Algebra');
export const geometryQuestions = rtfMathQuestions.filter(q => q.domain === 'Geometry and Trigonometry');
export const advancedMathQuestions = rtfMathQuestions.filter(q => q.domain === 'Advanced Math');
export const dataAnalysisQuestions = rtfMathQuestions.filter(q => q.domain === 'Problem-Solving and Data Analysis');

// Statistics
export const questionStats = {
  total: rtfMathQuestions.length,
  byDomain: {
    algebra: algebraQuestions.length,
    geometry: geometryQuestions.length,
    advancedMath: advancedMathQuestions.length,
    dataAnalysis: dataAnalysisQuestions.length
  },
  byDifficulty: {
    easy: rtfMathQuestions.filter(q => q.difficulty === 'easy').length,
    medium: rtfMathQuestions.filter(q => q.difficulty === 'medium').length,
    hard: rtfMathQuestions.filter(q => q.difficulty === 'hard').length
  }
};

export default rtfMathQuestions;
`;

  return header + '\n' + questionStrings.join(',\n') + '\n' + footer;
};

// Write the questions to a new file
const outputPath = '/Users/liamkrass/Documents/satProjectV2/sat-practice-app-1/frontend/src/data/rtfMathQuestions.ts';
const questionsFileContent = generateQuestionsFile(questions);

fs.writeFileSync(outputPath, questionsFileContent, 'utf8');

console.log(`\n✅ Generated ${outputPath} with ${questions.length} questions`);

// Generate summary report
const domains = {};
const skills = {};
const difficulties = {};

questions.forEach(q => {
  domains[q.domain] = (domains[q.domain] || 0) + 1;
  skills[q.skill] = (skills[q.skill] || 0) + 1;
  difficulties[q.difficulty] = (difficulties[q.difficulty] || 0) + 1;
});

console.log('\n📊 SUMMARY REPORT:');
console.log('================');
console.log(`Total Questions: ${questions.length}`);
console.log('\nBy Domain:');
Object.entries(domains).forEach(([domain, count]) => {
  console.log(`  ${domain}: ${count}`);
});
console.log('\nBy Difficulty:');
Object.entries(difficulties).forEach(([diff, count]) => {
  console.log(`  ${diff}: ${count}`);
});
console.log('\nTop Skills:');
Object.entries(skills)
  .sort(([,a], [,b]) => b - a)
  .slice(0, 10)
  .forEach(([skill, count]) => {
    console.log(`  ${skill}: ${count}`);
  });

// Create a summary markdown file
const summaryContent = `# RTF Math Questions Import - ${new Date().toISOString().split('T')[0]}

## Summary
- **Total Questions**: ${questions.length}
- **Source**: MathQuestionSat.rtf
- **Generated File**: rtfMathQuestions.ts

## Distribution by Domain
${Object.entries(domains).map(([domain, count]) => `- **${domain}**: ${count} questions`).join('\n')}

## Distribution by Difficulty
${Object.entries(difficulties).map(([diff, count]) => `- **${diff}**: ${count} questions`).join('\n')}

## Top Skills
${Object.entries(skills)
  .sort(([,a], [,b]) => b - a)
  .slice(0, 15)
  .map(([skill, count]) => `- **${skill}**: ${count} questions`)
  .join('\n')}

## Sample Questions
${questions.slice(0, 3).map((q, i) => `
### Question ${i + 1} (${q.id})
**Domain**: ${q.domain}  
**Skill**: ${q.skill}  
**Difficulty**: ${q.difficulty}

**Question**: ${q.text}

**Options**:
${q.options.join('\n')}

**Answer**: ${q.correctAnswer}
${q.visual ? `**Visual**: ${q.visual}` : ''}
`).join('\n')}
`;

const summaryPath = '/Users/liamkrass/Documents/satProjectV2/sat-practice-app-1/RTF_QUESTIONS_IMPORT_SUMMARY.md';
fs.writeFileSync(summaryPath, summaryContent, 'utf8');

console.log(`\n📄 Generated summary report: ${summaryPath}`);
