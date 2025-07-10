// generateSATQuestions.ts - Extract all 250 questions from RTF file
import { SATQuestionParser } from '../services/questionParser';
import fs from 'fs';
import path from 'path';

async function generateAllSATQuestions() {
  console.log('🚀 Starting SAT question generation from RTF file...');
  
  try {
    // Read the RTF file
    const rtfPath = path.join(__dirname, '../../../../MathQuestionSat.rtf');
    console.log(`📄 Reading RTF file: ${rtfPath}`);
    
    if (!fs.existsSync(rtfPath)) {
      throw new Error(`RTF file not found at: ${rtfPath}`);
    }
    
    const rtfContent = fs.readFileSync(rtfPath, 'utf-8');
    console.log(`✅ RTF file loaded (${rtfContent.length} characters)`);
    
    // Parse questions
    const parser = new SATQuestionParser();
    const parsedQuestions = parser.parseRTFFile(rtfContent);
    
    console.log(`\n📊 Parsing Results:`);
    console.log(`   Total Questions Parsed: ${parsedQuestions.length}`);
    
    // Analyze by domain
    const domainStats = parsedQuestions.reduce((stats: Record<string, number>, q: any) => {
      stats[q.domain] = (stats[q.domain] || 0) + 1;
      return stats;
    }, {} as Record<string, number>);
    
    console.log(`\n📈 Domain Distribution:`);
    Object.entries(domainStats).forEach(([domain, count]) => {
      console.log(`   ${domain}: ${count} questions`);
    });
    
    // Analyze by difficulty
    const difficultyStats = parsedQuestions.reduce((stats: Record<string, number>, q: any) => {
      stats[q.difficulty] = (stats[q.difficulty] || 0) + 1;
      return stats;
    }, {} as Record<string, number>);
    
    console.log(`\n🎯 Difficulty Distribution:`);
    Object.entries(difficultyStats).forEach(([difficulty, count]) => {
      console.log(`   ${difficulty}: ${count} questions`);
    });
    
    // Count questions with visuals
    const questionsWithVisuals = parsedQuestions.filter((q: any) => 
      q.visual && q.visual.toLowerCase() !== 'none'
    );
    console.log(`\n👁️  Visual Elements: ${questionsWithVisuals.length} questions have visual components`);
    
    // Convert to app format
    const appQuestions = parser.convertToAppFormat(parsedQuestions);
    
    // Generate TypeScript file
    const questionsFilePath = path.join(__dirname, '../../../frontend/src/data/satMathQuestions.ts');
    
    const fileContent = `// SAT Math Questions - Generated from College Board RTF
// Total: ${appQuestions.length} authentic SAT math questions
// Generated on: ${new Date().toISOString()}

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
  visualElement?: VisualElement;
  source: string;
}

export interface VisualElement {
  type: 'graph' | 'table' | 'diagram' | 'chart' | 'equation';
  description: string;
  data?: any;
  svg?: string;
}

// All ${appQuestions.length} SAT Math Questions
export const satMathQuestions: Question[] = ${JSON.stringify(appQuestions, null, 2)};

// Questions by Domain
export const questionsByDomain = {
${Object.entries(domainStats).map(([domain, count]) => 
  `  "${domain}": satMathQuestions.filter(q => q.domain === "${domain}"), // ${count} questions`
).join('\n')}
};

// Questions by Difficulty
export const questionsByDifficulty = {
${Object.entries(difficultyStats).map(([difficulty, count]) => 
  `  "${difficulty}": satMathQuestions.filter(q => q.difficulty === "${difficulty}"), // ${count} questions`
).join('\n')}
};

// Questions with Visual Elements
export const questionsWithVisuals = satMathQuestions.filter(q => q.visual && q.visual !== 'None');

// Utility Functions
export const getQuestionsByDomain = (domain: string) => 
  satMathQuestions.filter(q => q.domain === domain);

export const getQuestionsBySkill = (skill: string) => 
  satMathQuestions.filter(q => q.skill === skill);

export const getQuestionsByDifficulty = (difficulty: 'easy' | 'medium' | 'hard') => 
  satMathQuestions.filter(q => q.difficulty === difficulty);

export const getRandomQuestions = (count: number, domain?: string) => {
  const pool = domain ? getQuestionsByDomain(domain) : satMathQuestions;
  return pool.sort(() => Math.random() - 0.5).slice(0, count);
};

// Statistics
export const questionStats = {
  total: ${appQuestions.length},
  domains: ${JSON.stringify(domainStats, null, 2)},
  difficulties: ${JSON.stringify(difficultyStats, null, 2)},
  withVisuals: ${questionsWithVisuals.length},
  skills: ${JSON.stringify([...new Set(appQuestions.map((q: any) => q.skill))], null, 2)}
};

export default satMathQuestions;
`;

    // Write to file
    fs.writeFileSync(questionsFilePath, fileContent);
    console.log(`\n💾 Questions saved to: ${questionsFilePath}`);
    
    // Generate sample visual elements file
    const visualElementsPath = path.join(__dirname, '../../../frontend/src/components/VisualElements.tsx');
    const visualElementsContent = `// VisualElements.tsx - React component for rendering question visuals
import React from 'react';

interface VisualElement {
  type: 'graph' | 'table' | 'diagram' | 'chart' | 'equation';
  description: string;
  data?: any;
  svg?: string;
}

interface VisualElementProps {
  visual: VisualElement;
  className?: string;
}

export const VisualElementRenderer: React.FC<VisualElementProps> = ({ 
  visual, 
  className = "" 
}) => {
  const renderVisual = () => {
    switch (visual.type) {
      case 'graph':
      case 'chart':
      case 'diagram':
        if (visual.svg) {
          return (
            <div 
              className={\`visual-svg \${className}\`}
              dangerouslySetInnerHTML={{ __html: visual.svg }}
            />
          );
        }
        return (
          <div className={\`visual-placeholder \${className}\`}>
            <p className="text-sm text-gray-600">{visual.description}</p>
          </div>
        );
        
      case 'table':
        if (visual.data?.table) {
          return (
            <div className={\`visual-table \${className}\`}>
              <table className="border-collapse border border-gray-300">
                <thead>
                  <tr>
                    {visual.data.table.headers.map((header: string, i: number) => (
                      <th key={i} className="border border-gray-300 px-4 py-2 bg-gray-100">
                        {header}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {visual.data.table.rows.map((row: any[], i: number) => (
                    <tr key={i}>
                      {row.map((cell: any, j: number) => (
                        <td key={j} className="border border-gray-300 px-4 py-2 text-center">
                          {cell}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          );
        }
        break;
        
      case 'equation':
        return (
          <div className={\`visual-equation \${className}\`}>
            <div className="math-display text-lg font-mono">
              {visual.description}
            </div>
          </div>
        );
        
      default:
        return (
          <div className={\`visual-description \${className}\`}>
            <p className="text-sm italic text-gray-600">{visual.description}</p>
          </div>
        );
    }
  };

  return (
    <div className="visual-element-container my-4">
      {renderVisual()}
    </div>
  );
};

export default VisualElementRenderer;
`;

    fs.writeFileSync(visualElementsPath, visualElementsContent);
    console.log(`💾 Visual elements component saved to: ${visualElementsPath}`);
    
    // Update main satQuestions.ts to include new questions
    const mainQuestionsPath = path.join(__dirname, '../../../frontend/src/data/satQuestions.ts');
    if (fs.existsSync(mainQuestionsPath)) {
      const mainContent = fs.readFileSync(mainQuestionsPath, 'utf-8');
      const updatedContent = mainContent + `

// Import all 250 SAT Math Questions from RTF
import { satMathQuestions } from './satMathQuestions';

// Add to main questions array
export const allSATQuestions = [
  ...satQuestions,
  ...satMathQuestions
];

// Updated statistics
export const updatedQuestionStats = {
  total: allSATQuestions.length,
  math: allSATQuestions.filter(q => q.category === 'math').length,
  verbal: allSATQuestions.filter(q => q.category === 'verbal').length,
  fromRTF: satMathQuestions.length
};
`;
      
      fs.writeFileSync(mainQuestionsPath, updatedContent);
      console.log(`📝 Updated main questions file: ${mainQuestionsPath}`);
    }
    
    console.log(`\n🎉 Successfully generated ${appQuestions.length} SAT questions!`);
    console.log(`\n📋 Summary:`);
    console.log(`   ✅ ${appQuestions.length} questions extracted`);
    console.log(`   ✅ ${questionsWithVisuals.length} visual elements created`);
    console.log(`   ✅ ${Object.keys(domainStats).length} domains covered`);
    console.log(`   ✅ ${Object.keys(difficultyStats).length} difficulty levels`);
    console.log(`   ✅ Questions saved to frontend/src/data/satMathQuestions.ts`);
    console.log(`   ✅ Visual renderer component created`);
    
    return appQuestions;
    
  } catch (error) {
    console.error('❌ Error generating SAT questions:', error);
    throw error;
  }
}

// Run if called directly
if (require.main === module) {
  generateAllSATQuestions()
    .then(() => {
      console.log('\n🏁 Question generation complete!');
      process.exit(0);
    })
    .catch((error) => {
      console.error('\n💥 Question generation failed:', error);
      process.exit(1);
    });
}

export { generateAllSATQuestions };
