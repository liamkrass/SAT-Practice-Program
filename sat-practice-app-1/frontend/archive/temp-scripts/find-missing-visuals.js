// Find and add remaining visual elements
const fs = require('fs');
const path = require('path');

const mathQuestionsPath = path.join(__dirname, 'src/data/mathQuestions.ts');
let content = fs.readFileSync(mathQuestionsPath, 'utf8');

// Find all questions with visual but no visualElement
const lines = content.split('\n');
let questionsNeedingVisuals = [];
let currentQuestion = null;

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // Check for question ID
  if (line.includes('id: "math_')) {
    currentQuestion = { id: line.trim(), lineNumber: i };
  }
  
  // Check for visual
  if (line.includes('visual: "') && currentQuestion) {
    currentQuestion.visual = line.trim();
    currentQuestion.visualLine = i;
  }
  
  // Check for source (end of question)
  if (line.includes('source: "College Board"') && currentQuestion) {
    // Check if there's a visualElement between visual and source
    let hasVisualElement = false;
    for (let j = currentQuestion.visualLine || i; j < i; j++) {
      if (lines[j].includes('visualElement:')) {
        hasVisualElement = true;
        break;
      }
    }
    
    if (currentQuestion.visual && !hasVisualElement) {
      questionsNeedingVisuals.push({
        id: currentQuestion.id,
        visual: currentQuestion.visual,
        lineNumber: currentQuestion.visualLine
      });
    }
    
    currentQuestion = null;
  }
}

console.log(`Found ${questionsNeedingVisuals.length} questions needing visual elements:`);
questionsNeedingVisuals.forEach((q, i) => {
  if (i < 10) { // Show first 10
    console.log(`${i + 1}. ${q.id}: ${q.visual.substring(0, 80)}...`);
  }
});

// Group by type for better understanding
const byType = {
  tables: [],
  polynomials: [],
  duplicates: [],
  other: []
};

questionsNeedingVisuals.forEach(q => {
  const visual = q.visual;
  if (visual.includes('table') || visual.includes('Table')) {
    byType.tables.push(q);
  } else if (visual.includes('p(x)') || visual.includes('polynomial')) {
    byType.polynomials.push(q);
  } else if (questionsNeedingVisuals.filter(other => other.visual === visual).length > 1) {
    byType.duplicates.push(q);
  } else {
    byType.other.push(q);
  }
});

console.log(`\nBy type:`);
console.log(`Tables: ${byType.tables.length}`);
console.log(`Polynomials: ${byType.polynomials.length}`);
console.log(`Duplicates: ${byType.duplicates.length}`);
console.log(`Other: ${byType.other.length}`);
