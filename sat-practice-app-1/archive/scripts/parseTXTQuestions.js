const fs = require('fs');

console.log('🚀 Starting TXT Math Questions Import...');

// Read the TXT file
const txtPath = '/Users/liamkrass/Documents/satProjectV2/MathQuestionSat.txt';
console.log(`📖 Reading TXT file: ${txtPath}`);

try {
  const txtContent = fs.readFileSync(txtPath, 'utf8');
  console.log(`📄 TXT file size: ${txtContent.length.toLocaleString()} characters`);
  
  // Split into question blocks
  const questionBlocks = txtContent.split(/(?=QUESTION_\d+)/);
  console.log(`🔍 Found ${questionBlocks.length} question blocks`);
  
  const questions = [];
  const errors = [];
  
  questionBlocks.forEach((block, index) => {
    if (block.trim().startsWith('QUESTION_')) {
      try {
        const question = parseQuestion(block);
        if (question.id && question.text && question.options && question.correctAnswer) {
          questions.push(question);
          console.log(`✅ Parsed ${question.id}: ${question.text.substring(0, 50)}...`);
        } else {
          const missing = [];
          if (!question.id) missing.push('id');
          if (!question.text) missing.push('text');
          if (!question.options) missing.push('options');
          if (!question.correctAnswer) missing.push('answer');
          errors.push(`Question ${index}: Missing ${missing.join(', ')}`);
        }
      } catch (error) {
        errors.push(`Question ${index}: ${error.message}`);
      }
    }
  });
  
  console.log(`\n📊 Successfully parsed ${questions.length} questions`);
  if (errors.length > 0) {
    console.log(`⚠️  ${errors.length} parsing errors:`);
    errors.slice(0, 5).forEach(error => console.log(`   ${error}`));
  }
  
  // Generate TypeScript file
  generateQuestionsFile(questions);
  
  // Generate summary report
  generateSummaryReport(questions);
  
  console.log('\n🎉 TXT import completed successfully!');
  
} catch (error) {
  console.error('❌ Error:', error.message);
}

function parseQuestion(questionBlock) {
  const lines = questionBlock.trim().split('\n');
  const question = {};
  
  // Extract question number from first line
  const questionMatch = lines[0].match(/QUESTION_(\d+)/);
  if (questionMatch) {
    question.id = `math_${questionMatch[1]}`;
  }
  
  // Find the line that contains all the question data
  const dataLine = lines.find(line => line.includes('Question:'));
  if (!dataLine) {
    throw new Error('No question data line found');
  }
  
  // Extract question text
  const questionMatch2 = dataLine.match(/Question:\s*(.*?)\s*Visual:/);
  if (questionMatch2) {
    question.text = questionMatch2[1].trim();
  }
  
  // Extract visual description
  const visualMatch = dataLine.match(/Visual:\s*(.*?)\s*A\)/);
  if (visualMatch) {
    const visual = visualMatch[1].trim();
    if (visual && visual !== 'None') {
      question.visual = visual;
    }
  }
  
  // Extract options
  const optionsMatch = dataLine.match(/A\)\s*(.*?)\s*B\)\s*(.*?)\s*C\)\s*(.*?)\s*D\)\s*(.*?)\s*Answer:/);
  if (optionsMatch) {
    question.options = [
      `A) ${optionsMatch[1].trim()}`,
      `B) ${optionsMatch[2].trim()}`,
      `C) ${optionsMatch[3].trim()}`,
      `D) ${optionsMatch[4].trim()}`
    ];
  }
  
  // Extract answer
  const answerMatch = dataLine.match(/Answer:\s*([A-D])/);
  if (answerMatch) {
    question.correctAnswer = answerMatch[1];
  }
  
  // Extract category
  const categoryMatch = dataLine.match(/Category:\s*(\w+)/);
  if (categoryMatch) {
    question.category = categoryMatch[1];
  }
  
  // Extract domain
  const domainMatch = dataLine.match(/Domain:\s*(.*?)\s*Skill:/);
  if (domainMatch) {
    question.domain = domainMatch[1].trim();
  }
  
  // Extract skill
  const skillMatch = dataLine.match(/Skill:\s*(.*?)\s*Difficulty:/);
  if (skillMatch) {
    question.skill = skillMatch[1].trim();
  }
  
  // Extract difficulty
  const difficultyMatch = dataLine.match(/Difficulty:\s*(\w+)/);
  if (difficultyMatch) {
    question.difficulty = difficultyMatch[1];
  }
  
  // Set source
  question.source = 'College Board';
  
  return question;
}

function generateQuestionsFile(questions) {
  console.log('\n🔨 Generating TypeScript file...');
  
  const outputPath = '/Users/liamkrass/Documents/satProjectV2/sat-practice-app-1/frontend/src/data/mathQuestions.ts';
  
  const header = `// Generated from MathQuestionSat.txt - ${new Date().toISOString()}
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

export const mathQuestions: Question[] = [`;

  const questionStrings = questions.map(q => {
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
export const algebraQuestions = mathQuestions.filter(q => q.domain === 'Algebra');
export const geometryQuestions = mathQuestions.filter(q => q.domain === 'Geometry and Trigonometry');
export const advancedMathQuestions = mathQuestions.filter(q => q.domain === 'Advanced Math');
export const problemSolvingQuestions = mathQuestions.filter(q => q.domain === 'Problem-Solving and Data Analysis');

// Export by difficulty
export const easyQuestions = mathQuestions.filter(q => q.difficulty === 'easy');
export const mediumQuestions = mathQuestions.filter(q => q.difficulty === 'medium');
export const hardQuestions = mathQuestions.filter(q => q.difficulty === 'hard');

// Statistics
export const questionStats = {
  total: mathQuestions.length,
  byDomain: {
    algebra: algebraQuestions.length,
    geometry: geometryQuestions.length,
    advancedMath: advancedMathQuestions.length,
    problemSolving: problemSolvingQuestions.length
  },
  byDifficulty: {
    easy: easyQuestions.length,
    medium: mediumQuestions.length,
    hard: hardQuestions.length
  }
};

export default mathQuestions;
`;

  const content = header + '\n' + questionStrings.join(',\n') + '\n' + footer;
  
  fs.writeFileSync(outputPath, content, 'utf8');
  console.log(`✅ Generated ${outputPath} with ${questions.length} questions`);
}

function generateSummaryReport(questions) {
  // Generate statistics
  const domains = {};
  const skills = {};
  const difficulties = {};
  
  questions.forEach(q => {
    const domain = q.domain || 'Unknown';
    const skill = q.skill || 'Unknown';
    const difficulty = q.difficulty || 'Unknown';
    
    domains[domain] = (domains[domain] || 0) + 1;
    skills[skill] = (skills[skill] || 0) + 1;
    difficulties[difficulty] = (difficulties[difficulty] || 0) + 1;
  });
  
  console.log('\n📊 SUMMARY REPORT:');
  console.log('=' * 50);
  console.log(`Total Questions: ${questions.length}`);
  console.log('\nBy Domain:');
  Object.entries(domains)
    .sort(([,a], [,b]) => b - a)
    .forEach(([domain, count]) => {
      console.log(`  ${domain}: ${count}`);
    });
  console.log('\nBy Difficulty:');
  Object.entries(difficulties)
    .sort(([,a], [,b]) => b - a)
    .forEach(([diff, count]) => {
      console.log(`  ${diff}: ${count}`);
    });
  console.log('\nTop Skills:');
  Object.entries(skills)
    .sort(([,a], [,b]) => b - a)
    .slice(0, 10)
    .forEach(([skill, count]) => {
      console.log(`  ${skill}: ${count}`);
    });
  
  // Create summary markdown
  const summaryContent = `# Math Questions Import from TXT - ${new Date().toISOString().split('T')[0]}

## Summary
- **Total Questions**: ${questions.length}
- **Source**: MathQuestionSat.txt  
- **Generated File**: mathQuestions.ts

## Distribution by Domain
${Object.entries(domains)
  .sort(([,a], [,b]) => b - a)
  .map(([domain, count]) => `- **${domain}**: ${count} questions`)
  .join('\n')}

## Distribution by Difficulty  
${Object.entries(difficulties)
  .sort(([,a], [,b]) => b - a)
  .map(([diff, count]) => `- **${diff}**: ${count} questions`)
  .join('\n')}

## Top Skills
${Object.entries(skills)
  .sort(([,a], [,b]) => b - a)
  .slice(0, 15)
  .map(([skill, count]) => `- **${skill}**: ${count} questions`)
  .join('\n')}

## Sample Questions

${questions.slice(0, 3).map((q, i) => `### Question ${i + 1} (${q.id})
**Domain**: ${q.domain}  
**Skill**: ${q.skill}  
**Difficulty**: ${q.difficulty}

**Question**: ${q.text}

**Options**:
${q.options.join('\n')}

**Answer**: ${q.correctAnswer}
${q.visual ? `**Visual**: ${q.visual}` : ''}
`).join('\n')}

## File Structure
- **Main export**: \`mathQuestions\` - Array of all questions
- **By domain**: \`algebraQuestions\`, \`geometryQuestions\`, \`advancedMathQuestions\`, \`problemSolvingQuestions\`
- **By difficulty**: \`easyQuestions\`, \`mediumQuestions\`, \`hardQuestions\`
- **Statistics**: \`questionStats\` - Breakdown by domain and difficulty
`;

  const summaryPath = '/Users/liamkrass/Documents/satProjectV2/sat-practice-app-1/MATH_QUESTIONS_IMPORT_SUMMARY.md';
  fs.writeFileSync(summaryPath, summaryContent, 'utf8');
  console.log(`\n📄 Generated summary report: ${summaryPath}`);
}
