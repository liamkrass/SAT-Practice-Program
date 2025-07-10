const fs = require('fs');

console.log('Starting RTF parsing...');

try {
  // Read the RTF file
  const rtfPath = '/Users/liamkrass/Documents/satProjectV2/MathQuestionSat.rtf';
  console.log('Reading RTF file:', rtfPath);
  
  const rtfContent = fs.readFileSync(rtfPath, 'utf8');
  console.log('RTF file size:', rtfContent.length, 'characters');
  
  // Count questions
  const questionCount = (rtfContent.match(/QUESTION_\d+/g) || []).length;
  console.log('Found', questionCount, 'questions in RTF file');
  
  console.log('RTF parsing completed successfully');
} catch (error) {
  console.error('Error:', error.message);
  console.error('Stack:', error.stack);
}
