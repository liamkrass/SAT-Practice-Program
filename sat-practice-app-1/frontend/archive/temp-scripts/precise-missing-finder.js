// Find specific missing visual elements with proper regex
const fs = require('fs');
const path = require('path');

const mathQuestionsPath = path.join(__dirname, 'src/data/mathQuestions.ts');
let content = fs.readFileSync(mathQuestionsPath, 'utf8');

// Find visual descriptions that don't have visualElement implementations
function findMissingVisuals() {
  // Split into questions
  const questions = content.split(/(?=\s*{\s*id: "math_)/);
  const missing = [];
  
  questions.forEach(question => {
    if (question.includes('visual: "') && !question.includes('visualElement: {')) {
      const visualMatch = question.match(/visual: "([^"]+)"/);
      const idMatch = question.match(/id: "([^"]+)"/);
      
      if (visualMatch && idMatch) {
        missing.push({
          id: idMatch[1],
          visual: visualMatch[1]
        });
      }
    }
  });
  
  return missing;
}

const missingVisuals = findMissingVisuals();
console.log(`Found ${missingVisuals.length} questions still missing visual elements:`);

// Group by unique visual description
const uniqueVisuals = {};
missingVisuals.forEach(item => {
  if (!uniqueVisuals[item.visual]) {
    uniqueVisuals[item.visual] = [];
  }
  uniqueVisuals[item.visual].push(item.id);
});

console.log(`\nUnique visual descriptions needed: ${Object.keys(uniqueVisuals).length}`);
Object.entries(uniqueVisuals).forEach(([visual, ids], index) => {
  console.log(`${index + 1}. [${ids.join(', ')}] ${visual}`);
});
