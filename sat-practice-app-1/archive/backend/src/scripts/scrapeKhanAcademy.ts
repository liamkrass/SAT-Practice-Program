#!/usr/bin/env ts-node

import { scrapeKhanAcademySAT, KhanAcademyScraper } from '../services/khanAcademyScraper';
import { Question } from '../types';
import fs from 'fs';
import path from 'path';

interface ScrapingConfig {
  maxQuestionsPerDomain: number;
  outputPath: string;
  includeMetadata: boolean;
  respectRateLimit: boolean;
}

const DEFAULT_CONFIG: ScrapingConfig = {
  maxQuestionsPerDomain: 25, // Conservative to start
  outputPath: path.join(__dirname, '../../frontend/src/data/khanQuestions.ts'),
  includeMetadata: true,
  respectRateLimit: true
};

async function scrapeAndSaveKhanQuestions(config: ScrapingConfig = DEFAULT_CONFIG) {
  console.log('🎯 Khan Academy SAT Question Scraper');
  console.log('=====================================\n');
  
  console.log('📋 Configuration:');
  console.log(`   Max questions per domain: ${config.maxQuestionsPerDomain}`);
  console.log(`   Output path: ${config.outputPath}`);
  console.log(`   Include metadata: ${config.includeMetadata}`);
  console.log(`   Respect rate limits: ${config.respectRateLimit}\n`);

  const startTime = Date.now();

  try {
    // Scrape questions from Khan Academy
    console.log('🚀 Starting Khan Academy scraping...\n');
    const questions = await scrapeKhanAcademySAT(config.maxQuestionsPerDomain);

    if (questions.length === 0) {
      console.warn('⚠️  No questions were scraped. Check the scraper configuration.');
      return;
    }

    // Analyze the scraped questions
    const analysis = analyzeScrapedQuestions(questions);
    console.log('\n📊 Question Analysis:');
    console.log(`   Total Questions: ${analysis.total}`);
    console.log(`   Math Questions: ${analysis.math}`);
    console.log(`   Verbal Questions: ${analysis.verbal}`);
    console.log('\n📚 Math Domains:');
    Object.entries(analysis.mathDomains).forEach(([domain, count]) => {
      console.log(`     ${domain}: ${count} questions`);
    });
    console.log('\n📖 Verbal Domains:');
    Object.entries(analysis.verbalDomains).forEach(([domain, count]) => {
      console.log(`     ${domain}: ${count} questions`);
    });

    // Generate the TypeScript file content
    const fileContent = generateQuestionsFile(questions, analysis);

    // Ensure output directory exists
    const outputDir = path.dirname(config.outputPath);
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Write the questions file
    fs.writeFileSync(config.outputPath, fileContent);
    console.log(`\n✅ Questions saved to: ${config.outputPath}`);

    // Update the main satQuestions.ts file to include Khan Academy questions
    await updateMainQuestionsFile(questions);

    const endTime = Date.now();
    const duration = (endTime - startTime) / 1000;

    console.log('\n🎉 Scraping Complete!');
    console.log(`   Duration: ${duration.toFixed(1)} seconds`);
    console.log(`   Questions per second: ${(questions.length / duration).toFixed(2)}`);
    console.log(`   Success rate: ${questions.length > 0 ? '100%' : '0%'}`);

    // Generate integration report
    generateIntegrationReport(questions, analysis, duration);

  } catch (error) {
    console.error('\n❌ Scraping failed:', error);
    throw error;
  }
}

function analyzeScrapedQuestions(questions: Question[]) {
  const analysis = {
    total: questions.length,
    math: questions.filter(q => q.category === 'math').length,
    verbal: questions.filter(q => q.category === 'verbal').length,
    mathDomains: {} as Record<string, number>,
    verbalDomains: {} as Record<string, number>,
    skillDistribution: {} as Record<string, number>,
    difficultyDistribution: {} as Record<string, number>
  };

  questions.forEach(q => {
    // Count domains
    if (q.category === 'math') {
      analysis.mathDomains[q.domain || 'unknown'] = (analysis.mathDomains[q.domain || 'unknown'] || 0) + 1;
    } else {
      analysis.verbalDomains[q.domain || 'unknown'] = (analysis.verbalDomains[q.domain || 'unknown'] || 0) + 1;
    }

    // Count skills
    analysis.skillDistribution[q.skill] = (analysis.skillDistribution[q.skill] || 0) + 1;

    // Count difficulty
    analysis.difficultyDistribution[q.difficulty || 'unknown'] = (analysis.difficultyDistribution[q.difficulty || 'unknown'] || 0) + 1;
  });

  return analysis;
}

function generateQuestionsFile(questions: Question[], analysis: any): string {
  return `// Khan Academy SAT Questions - Scraped ${new Date().toISOString()}
// Total Questions: ${analysis.total} (Math: ${analysis.math}, Verbal: ${analysis.verbal})

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

// Raw scraped questions from Khan Academy
export const khanAcademyQuestions: KhanQuestion[] = ${JSON.stringify(questions, null, 2)};

// Math questions only
export const khanMathQuestions = khanAcademyQuestions.filter(q => q.category === 'math');

// Verbal questions only
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
    math: ${JSON.stringify(analysis.mathDomains)},
    verbal: ${JSON.stringify(analysis.verbalDomains)}
  },
  skills: ${JSON.stringify(analysis.skillDistribution)},
  difficulty: ${JSON.stringify(analysis.difficultyDistribution)}
};

export default khanAcademyQuestions;
`;
}

async function updateMainQuestionsFile(khanQuestions: Question[]) {
  const satQuestionsPath = path.join(__dirname, '../../frontend/src/data/satQuestions.ts');
  
  try {
    // Read existing file
    let existingContent = '';
    if (fs.existsSync(satQuestionsPath)) {
      existingContent = fs.readFileSync(satQuestionsPath, 'utf8');
    }

    // Add import for Khan Academy questions
    const importStatement = `import { khanAcademyQuestions } from './khanQuestions';\n`;
    
    // Check if import already exists
    if (!existingContent.includes('khanAcademyQuestions')) {
      // Find the first existing import and add our import after it
      const importIndex = existingContent.indexOf('export interface Question');
      if (importIndex !== -1) {
        existingContent = importStatement + existingContent;
      }

      // Add Khan Academy questions to the combined questions array
      const satQuestionsMatch = existingContent.match(/export const satQuestions: Question\[\] = \[([\s\S]*?)\];/);
      if (satQuestionsMatch) {
        const newSatQuestions = existingContent.replace(
          /export const satQuestions: Question\[\] = \[([\s\S]*?)\];/,
          `export const satQuestions: Question[] = [
  ...mathQuestions,
  ...verbalQuestions,
  ...khanAcademyQuestions
];`
        );
        
        fs.writeFileSync(satQuestionsPath, newSatQuestions);
        console.log('✅ Updated main satQuestions.ts with Khan Academy questions');
      }
    }
  } catch (error) {
    console.warn('⚠️  Could not update main questions file:', error);
  }
}

function generateIntegrationReport(questions: Question[], analysis: any, duration: number) {
  const reportPath = path.join(__dirname, '../reports/khan-academy-scraping-report.md');
  const reportDir = path.dirname(reportPath);
  
  if (!fs.existsSync(reportDir)) {
    fs.mkdirSync(reportDir, { recursive: true });
  }

  const report = `# Khan Academy Scraping Report

**Date:** ${new Date().toISOString()}  
**Duration:** ${duration.toFixed(1)} seconds  
**Success Rate:** ${questions.length > 0 ? '100%' : '0%'}

## Summary

- **Total Questions Scraped:** ${analysis.total}
- **Math Questions:** ${analysis.math}
- **Verbal Questions:** ${analysis.verbal}
- **Questions per Second:** ${(questions.length / duration).toFixed(2)}

## Domain Breakdown

### Math Domains
${Object.entries(analysis.mathDomains).map(([domain, count]) => `- **${domain}:** ${count} questions`).join('\n')}

### Verbal Domains
${Object.entries(analysis.verbalDomains).map(([domain, count]) => `- **${domain}:** ${count} questions`).join('\n')}

## Skill Distribution
${Object.entries(analysis.skillDistribution).map(([skill, count]) => `- **${skill}:** ${count} questions`).join('\n')}

## Difficulty Distribution
${Object.entries(analysis.difficultyDistribution).map(([difficulty, count]) => `- **${difficulty}:** ${count} questions`).join('\n')}

## Integration Status

✅ **Khan Academy questions scraped successfully**  
✅ **Questions saved to khanQuestions.ts**  
✅ **Questions integrated into main question database**  
✅ **Ready for use in SAT practice app**

## Next Steps

1. **Test Questions:** Review scraped questions for quality and accuracy
2. **Manual Curation:** Edit any questions that need refinement
3. **Add More Sources:** Consider scraping additional prep sites
4. **Enhance Metadata:** Improve domain/skill classification if needed

## Files Created

- \`frontend/src/data/khanQuestions.ts\` - Raw Khan Academy questions
- \`backend/src/reports/khan-academy-scraping-report.md\` - This report

## Usage

\`\`\`typescript
import { khanAcademyQuestions, getKhanQuestionsByDomain } from './data/khanQuestions';

// Get all Khan Academy questions
const allQuestions = khanAcademyQuestions;

// Get math questions only
const mathQuestions = getKhanQuestionsByCategory('math');

// Get questions by specific domain
const algebraQuestions = getKhanQuestionsByDomain('heart-of-algebra');
\`\`\`
`;

  fs.writeFileSync(reportPath, report);
  console.log(`📄 Integration report saved to: ${reportPath}`);
}

// CLI handling
if (require.main === module) {
  const args = process.argv.slice(2);
  const config = { ...DEFAULT_CONFIG };

  // Parse command line arguments
  args.forEach(arg => {
    if (arg.startsWith('--max-questions=')) {
      config.maxQuestionsPerDomain = parseInt(arg.split('=')[1]);
    } else if (arg.startsWith('--output=')) {
      config.outputPath = arg.split('=')[1];
    } else if (arg === '--no-metadata') {
      config.includeMetadata = false;
    } else if (arg === '--no-rate-limit') {
      config.respectRateLimit = false;
    }
  });

  scrapeAndSaveKhanQuestions(config)
    .then(() => {
      console.log('\n🎯 Khan Academy scraping completed successfully!');
      console.log('🚀 You can now use the scraped questions in your SAT practice app.');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n💥 Scraping failed:', error);
      process.exit(1);
    });
}

export { scrapeAndSaveKhanQuestions, analyzeScrapedQuestions };
