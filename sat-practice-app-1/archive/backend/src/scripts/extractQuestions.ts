import { extractSATQuestions, ExtractedQuestion } from '../services/satPdfExtractor';
import fs from 'fs';
import path from 'path';

// Convert ExtractedQuestion to frontend Question format
interface FrontendQuestion {
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

async function convertAndSaveQuestions() {
  try {
    console.log('Starting SAT question extraction...');
    
    // Extract questions from PDFs
    const extractedQuestions = await extractSATQuestions();
    
    // Convert to frontend format
    const frontendQuestions: FrontendQuestion[] = extractedQuestions.map((q: ExtractedQuestion) => ({
      id: q.id,
      text: q.text,
      category: q.category,
      skill: q.skill,
      options: q.options,
      correctAnswer: q.correctAnswer,
      domain: q.domain,
      difficulty: q.difficulty,
      source: q.source
    }));
    
    // Separate math and verbal questions
    const mathQuestions = frontendQuestions.filter(q => q.category === 'math');
    const verbalQuestions = frontendQuestions.filter(q => q.category === 'verbal');
    
    // Create the new questions file content
    const questionsFileContent = `// SAT Questions extracted from official PDFs
export interface Question {
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

// Math Questions (${mathQuestions.length} total)
export const mathQuestions: Question[] = ${JSON.stringify(mathQuestions, null, 2)};

// Verbal Questions (${verbalQuestions.length} total)
export const verbalQuestions: Question[] = ${JSON.stringify(verbalQuestions, null, 2)};

// All Questions Combined (${frontendQuestions.length} total)
export const satQuestions: Question[] = [
  ...mathQuestions,
  ...verbalQuestions
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
`;

    // Save to frontend data file
    const frontendDataPath = path.join(__dirname, '../../frontend/src/data/satQuestions.ts');
    fs.writeFileSync(frontendDataPath, questionsFileContent);
    
    // Also update the existing exampleQuestions file for compatibility
    const exampleQuestionsPath = path.join(__dirname, '../../frontend/src/data/exampleQuestions.ts');
    const compatibilityContent = `// Updated with real SAT questions - redirecting to satQuestions.ts
export { Question, satQuestions as exampleQuestions } from './satQuestions';
`;
    fs.writeFileSync(exampleQuestionsPath, compatibilityContent);
    
    // Create a summary report
    const summaryReport = `SAT Question Extraction Summary
=====================================

Total Questions Extracted: ${frontendQuestions.length}
Math Questions: ${mathQuestions.length}
Verbal Questions: ${verbalQuestions.length}

Math Questions by Domain:
${Object.entries(
  mathQuestions.reduce((acc, q) => {
    acc[q.domain || 'unknown'] = (acc[q.domain || 'unknown'] || 0) + 1;
    return acc;
  }, {} as Record<string, number>)
).map(([domain, count]) => `  ${domain}: ${count}`).join('\n')}

Verbal Questions by Domain:
${Object.entries(
  verbalQuestions.reduce((acc, q) => {
    acc[q.domain || 'unknown'] = (acc[q.domain || 'unknown'] || 0) + 1;
    return acc;
  }, {} as Record<string, number>)
).map(([domain, count]) => `  ${domain}: ${count}`).join('\n')}

Math Questions by Skill:
${Object.entries(
  mathQuestions.reduce((acc, q) => {
    acc[q.skill] = (acc[q.skill] || 0) + 1;
    return acc;
  }, {} as Record<string, number>)
).map(([skill, count]) => `  ${skill}: ${count}`).join('\n')}

Verbal Questions by Skill:
${Object.entries(
  verbalQuestions.reduce((acc, q) => {
    acc[q.skill] = (acc[q.skill] || 0) + 1;
    return acc;
  }, {} as Record<string, number>)
).map(([skill, count]) => `  ${skill}: ${count}`).join('\n')}

Files Created:
- frontend/src/data/satQuestions.ts (main questions file)
- frontend/src/data/exampleQuestions.ts (updated for compatibility)
`;

    console.log(summaryReport);
    
    // Save summary report
    const reportPath = path.join(__dirname, '../extraction-report.txt');
    fs.writeFileSync(reportPath, summaryReport);
    
    console.log(`\\nExtraction complete!`);
    console.log(`Questions saved to: ${frontendDataPath}`);
    console.log(`Summary report saved to: ${reportPath}`);
    
  } catch (error) {
    console.error('Error during question extraction:', error);
    process.exit(1);
  }
}

// Run the extraction if this file is executed directly
if (require.main === module) {
  convertAndSaveQuestions();
}

export { convertAndSaveQuestions };
