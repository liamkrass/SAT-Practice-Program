#!/usr/bin/env ts-node

import { generateKhanAcademyStyleQuestions } from '../services/simpleKhanScraper';
import { Question } from '../types';
import fs from 'fs';
import path from 'path';

async function generateAndSaveQuestions() {
  console.log('🎯 Khan Academy Style Question Generator');
  console.log('====================================\n');

  try {
    // Generate Khan Academy style questions
    const questions = await generateKhanAcademyStyleQuestions();

    // Create the frontend directory path
    const outputDir = path.join(__dirname, '../../../frontend/src/data');
    const outputPath = path.join(outputDir, 'khanQuestions.ts');

    // Ensure output directory exists
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Analyze questions
    const analysis = {
      total: questions.length,
      math: questions.filter(q => q.category === 'math').length,
      verbal: questions.filter(q => q.category === 'verbal').length,
      mathDomains: {} as Record<string, number>,
      verbalDomains: {} as Record<string, number>
    };

    questions.forEach(q => {
      if (q.category === 'math') {
        analysis.mathDomains[q.domain || 'unknown'] = (analysis.mathDomains[q.domain || 'unknown'] || 0) + 1;
      } else {
        analysis.verbalDomains[q.domain || 'unknown'] = (analysis.verbalDomains[q.domain || 'unknown'] || 0) + 1;
      }
    });

    // Generate TypeScript file content
    const fileContent = `// Khan Academy Style SAT Questions - Generated ${new Date().toISOString()}
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

// Khan Academy style questions (${analysis.total} total)
export const khanAcademyQuestions: KhanQuestion[] = ${JSON.stringify(questions, null, 2)};

// Math questions only (${analysis.math} questions)
export const khanMathQuestions = khanAcademyQuestions.filter(q => q.category === 'math');

// Verbal questions only (${analysis.verbal} questions)
export const khanVerbalQuestions = khanAcademyQuestions.filter(q => q.category === 'verbal');

// Questions by domain
export const khanQuestionsByDomain = {
  math: {
${Object.keys(analysis.mathDomains).map(domain => 
    `    '${domain}': khanAcademyQuestions.filter(q => q.category === 'math' && q.domain === '${domain}')`
  ).join(',\n')}
  },
  verbal: {
${Object.keys(analysis.verbalDomains).map(domain => 
    `    '${domain}': khanAcademyQuestions.filter(q => q.category === 'verbal' && q.domain === '${domain}')`
  ).join(',\n')}
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
  total: ${analysis.total},
  math: ${analysis.math},
  verbal: ${analysis.verbal},
  domains: {
    math: ${JSON.stringify(analysis.mathDomains, null, 2)},
    verbal: ${JSON.stringify(analysis.verbalDomains, null, 2)}
  }
};

export default khanAcademyQuestions;
`;

    // Write the file
    fs.writeFileSync(outputPath, fileContent);

    console.log('📊 Question Generation Summary:');
    console.log(`   Total Questions: ${analysis.total}`);
    console.log(`   Math Questions: ${analysis.math}`);
    console.log(`   Verbal Questions: ${analysis.verbal}`);
    
    console.log('\n🧮 Math Domains:');
    Object.entries(analysis.mathDomains).forEach(([domain, count]) => {
      console.log(`     ${domain}: ${count} questions`);
    });
    
    console.log('\n📖 Verbal Domains:');
    Object.entries(analysis.verbalDomains).forEach(([domain, count]) => {
      console.log(`     ${domain}: ${count} questions`);
    });

    console.log(`\n✅ Questions saved to: ${outputPath}`);

    // Update main satQuestions.ts file
    await updateMainQuestionsFile(questions);

    console.log('\n🎉 Khan Academy style questions generated successfully!');
    console.log('🚀 Ready to use in your SAT practice app for 1450+ → 1600 improvement!');

  } catch (error) {
    console.error('\n❌ Generation failed:', error);
    throw error;
  }
}

async function updateMainQuestionsFile(khanQuestions: Question[]) {
  const satQuestionsPath = path.join(__dirname, '../../../frontend/src/data/satQuestions.ts');
  
  try {
    if (fs.existsSync(satQuestionsPath)) {
      let existingContent = fs.readFileSync(satQuestionsPath, 'utf8');
      
      // Add import for Khan Academy questions if not already present
      if (!existingContent.includes('khanAcademyQuestions')) {
        // Add import at the top
        const importStatement = `import { khanAcademyQuestions } from './khanQuestions';\n`;
        existingContent = importStatement + existingContent;
        
        // Update the satQuestions array to include Khan Academy questions
        existingContent = existingContent.replace(
          /export const satQuestions: Question\[\] = \[([\s\S]*?)\];/,
          `export const satQuestions: Question[] = [
  ...mathQuestions,
  ...verbalQuestions,
  ...khanAcademyQuestions
];`
        );
        
        fs.writeFileSync(satQuestionsPath, existingContent);
        console.log('✅ Updated main satQuestions.ts with Khan Academy questions');
      }
    }
  } catch (error) {
    console.warn('⚠️  Could not update main questions file:', error);
  }
}

// Run if called directly
if (require.main === module) {
  generateAndSaveQuestions()
    .then(() => {
      console.log('\n🎯 Success! You now have high-quality Khan Academy style questions.');
      console.log('📚 Perfect for 1450+ → 1600 SAT score improvement.');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n💥 Generation failed:', error);
      process.exit(1);
    });
}

export { generateAndSaveQuestions };
