// Complete remaining visual elements - comprehensive script
const fs = require('fs');
const path = require('path');

const mathQuestionsPath = path.join(__dirname, 'src/data/mathQuestions.ts');
let content = fs.readFileSync(mathQuestionsPath, 'utf8');

// Find all questions with visual but no visualElement
function findMissingVisualElements() {
  const lines = content.split('\n');
  let questionsNeedingVisuals = [];
  let currentQuestion = { id: '', visual: '', hasVisualElement: false };
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Check for question ID
    if (line.includes('id: "math_')) {
      // Process previous question
      if (currentQuestion.visual && !currentQuestion.hasVisualElement) {
        questionsNeedingVisuals.push({
          id: currentQuestion.id,
          visual: currentQuestion.visual
        });
      }
      
      // Reset for new question
      currentQuestion = { 
        id: line.match(/id: "([^"]+)"/)?.[1] || '', 
        visual: '', 
        hasVisualElement: false 
      };
    }
    
    // Check for visual
    if (line.includes('visual: "')) {
      currentQuestion.visual = line.replace(/.*visual: "/, '').replace(/",?$/, '');
    }
    
    // Check for visualElement
    if (line.includes('visualElement: {')) {
      currentQuestion.hasVisualElement = true;
    }
    
    // Reset at end of question
    if (line.includes('source: "College Board"')) {
      if (currentQuestion.visual && !currentQuestion.hasVisualElement) {
        questionsNeedingVisuals.push({
          id: currentQuestion.id,
          visual: currentQuestion.visual
        });
      }
      currentQuestion = { id: '', visual: '', hasVisualElement: false };
    }
  }
  
  return questionsNeedingVisuals;
}

const missingVisuals = findMissingVisualElements();
console.log(`Found ${missingVisuals.length} questions missing visual elements:`);

// Group by type and show unique descriptions
const uniqueVisuals = {};
missingVisuals.forEach(item => {
  if (!uniqueVisuals[item.visual]) {
    uniqueVisuals[item.visual] = [];
  }
  uniqueVisuals[item.visual].push(item.id);
});

console.log(`\nUnique visual descriptions to implement: ${Object.keys(uniqueVisuals).length}`);
Object.entries(uniqueVisuals).forEach(([visual, ids], index) => {
  console.log(`${index + 1}. [${ids.length} questions] ${visual.substring(0, 80)}...`);
});

// Export for use in implementation script
fs.writeFileSync('./missing-visuals.json', JSON.stringify(uniqueVisuals, null, 2));
