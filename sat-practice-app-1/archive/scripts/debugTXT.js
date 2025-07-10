const fs = require('fs');
const path = require('path');

console.log('🚀 Starting TXT Math Questions Import...');

try {
  // Read the TXT file
  const txtPath = '/Users/liamkrass/Documents/satProjectV2/MathQuestionSat.txt';
  console.log(`📖 Reading TXT file: ${txtPath}`);
  
  const txtContent = fs.readFileSync(txtPath, 'utf8');
  console.log(`📄 TXT file size: ${txtContent.length.toLocaleString()} characters`);
  
  // Split into question blocks
  const questionBlocks = txtContent.split(/(?=QUESTION_\d+)/);
  console.log(`🔍 Found ${questionBlocks.length} question blocks`);
  
  // Show first few blocks for debugging
  console.log('First 3 blocks:');
  questionBlocks.slice(0, 3).forEach((block, i) => {
    console.log(`Block ${i}: ${block.substring(0, 100)}...`);
  });
  
  const questions = [];
  const errors = [];
  
  questionBlocks.forEach((block, index) => {
    if (block.trim().startsWith('QUESTION_')) {
      try {
        console.log(`\nProcessing block ${index}:`);
        console.log(block.substring(0, 200) + '...');
        
        const question = parseQuestion(block);
        
        console.log('Parsed question:', {
          id: question.id,
          hasText: !!question.text,
          hasOptions: !!question.options,
          hasAnswer: !!question.correctAnswer,
          domain: question.domain
        });
        
        if (question.id && question.text && question.options && question.correctAnswer) {
          questions.push(question);
          console.log(`✅ Successfully parsed ${question.id}`);
        } else {
          const missing = [];
          if (!question.id) missing.push('id');
          if (!question.text) missing.push('text');
          if (!question.options) missing.push('options');
          if (!question.correctAnswer) missing.push('answer');
          errors.push(`Question ${index}: Missing ${missing.join(', ')}`);
          console.log(`❌ Missing fields: ${missing.join(', ')}`);
        }
        
        // Only process first 3 questions for debugging
        if (index >= 3) return;
        
      } catch (error) {
        errors.push(`Question ${index}: ${error.message}`);
        console.log(`❌ Error parsing question ${index}: ${error.message}`);
      }
    }
  });
  
  console.log(`\n📊 Successfully parsed ${questions.length} questions`);
  if (errors.length > 0) {
    console.log(`⚠️  ${errors.length} parsing errors:`);
    errors.slice(0, 5).forEach(error => console.log(`   ${error}`));
  }
  
} catch (error) {
  console.error('❌ Error:', error.message);
  console.error('Stack:', error.stack);
}

function parseQuestion(questionBlock) {
  console.log('Parsing question block...');
  const lines = questionBlock.trim().split('\n');
  const question = {};
  
  // Extract question number from first line
  const questionMatch = lines[0].match(/QUESTION_(\d+)/);
  if (questionMatch) {
    question.id = `math_${questionMatch[1]}`;
    console.log('Found ID:', question.id);
  }
  
  // Find the line that contains all the question data
  const dataLine = lines.find(line => line.includes('Question:'));
  if (!dataLine) {
    throw new Error('No question data line found');
  }
  
  console.log('Data line found:', dataLine.substring(0, 100) + '...');
  
  // Extract question text
  const questionMatch2 = dataLine.match(/Question:\s*(.*?)\s*Visual:/);
  if (questionMatch2) {
    question.text = questionMatch2[1].trim();
    console.log('Found question text:', question.text.substring(0, 50) + '...');
  }
  
  // Extract visual description
  const visualMatch = dataLine.match(/Visual:\s*(.*?)\s*A\)/);
  if (visualMatch) {
    const visual = visualMatch[1].trim();
    if (visual && visual !== 'None') {
      question.visual = visual;
      console.log('Found visual:', visual.substring(0, 50) + '...');
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
    console.log('Found options:', question.options.length);
  }
  
  // Extract answer
  const answerMatch = dataLine.match(/Answer:\s*([A-D])/);
  if (answerMatch) {
    question.correctAnswer = answerMatch[1];
    console.log('Found answer:', question.correctAnswer);
  }
  
  // Extract category
  const categoryMatch = dataLine.match(/Category:\s*(\w+)/);
  if (categoryMatch) {
    question.category = categoryMatch[1];
    console.log('Found category:', question.category);
  }
  
  // Extract domain
  const domainMatch = dataLine.match(/Domain:\s*(.*?)\s*Skill:/);
  if (domainMatch) {
    question.domain = domainMatch[1].trim();
    console.log('Found domain:', question.domain);
  }
  
  // Extract skill
  const skillMatch = dataLine.match(/Skill:\s*(.*?)\s*Difficulty:/);
  if (skillMatch) {
    question.skill = skillMatch[1].trim();
    console.log('Found skill:', question.skill);
  }
  
  // Extract difficulty
  const difficultyMatch = dataLine.match(/Difficulty:\s*(\w+)/);
  if (difficultyMatch) {
    question.difficulty = difficultyMatch[1];
    console.log('Found difficulty:', question.difficulty);
  }
  
  // Set source
  question.source = 'College Board';
  
  return question;
}
