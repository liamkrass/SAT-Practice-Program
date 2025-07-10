const fs = require('fs');

try {
  console.log('Testing file read...');
  const content = fs.readFileSync('/Users/liamkrass/Documents/satProjectV2/MathQuestionSat.txt', 'utf8');
  console.log('File size:', content.length);
  console.log('First 500 characters:');
  console.log(content.substring(0, 500));
  
  const questionCount = (content.match(/QUESTION_\d+/g) || []).length;
  console.log('Questions found:', questionCount);
  
} catch (error) {
  console.error('Error:', error);
}
