// Test script to check visual element status
const fs = require('fs');
const path = require('path');

// Read the math questions file
const mathQuestionsPath = path.join(__dirname, 'src/data/mathQuestions.ts');
let content = fs.readFileSync(mathQuestionsPath, 'utf8');

console.log('File read successfully. Length:', content.length);

// Check current status
const visualMatches = content.match(/visual: "([^"]+)"/g);
const visualElementMatches = content.match(/visualElement: \{/g);

console.log(`Found ${visualMatches ? visualMatches.length : 0} questions with visual descriptions`);
console.log(`Found ${visualElementMatches ? visualElementMatches.length : 0} questions with visualElement implementations`);

// Find specific visual descriptions that should be handled
const testDescription = 'A table with two columns, x and y. The rows contain the following pairs of values: (3, 7), (k, 11), (12, n).';

console.log('\nSearching for specific test description...');
const testIndex = content.indexOf(`visual: "${testDescription}"`);
console.log('Test description index:', testIndex);

if (testIndex > -1) {
  const nextSourceIndex = content.indexOf('source:', testIndex);
  const hasVisualElement = content.substring(testIndex, nextSourceIndex).includes('visualElement:');
  console.log('Has visual element:', hasVisualElement);
  
  // Show the content around this description
  const start = Math.max(0, testIndex - 100);
  const end = Math.min(content.length, nextSourceIndex + 50);
  console.log('\nContent around test description:');
  console.log(content.substring(start, end));
}
