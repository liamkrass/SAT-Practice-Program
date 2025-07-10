import fs from 'fs';
import pdfParse from 'pdf-parse';

async function testPdfExtraction() {
  try {
    console.log('Testing PDF extraction...');
    
    // Test with math PDF first
    const mathPdfPath = '/Users/liamkrass/Documents/satProjectV2/bigSatMath.pdf';
    console.log('Reading math PDF...');
    
    const dataBuffer = fs.readFileSync(mathPdfPath);
    console.log('PDF file size:', dataBuffer.length, 'bytes');
    
    console.log('Parsing PDF...');
    const data = await pdfParse(dataBuffer);
    
    console.log('PDF parsed successfully!');
    console.log('Number of pages:', data.numpages);
    console.log('Text length:', data.text.length, 'characters');
    
    // Show first 1000 characters to see the structure
    console.log('\\n=== First 1000 characters ===');
    console.log(data.text.substring(0, 1000));
    
    console.log('\\n=== Looking for question patterns ===');
    const lines = data.text.split('\\n');
    console.log('Total lines:', lines.length);
    
    // Look for lines that might be questions
    const potentialQuestions = lines
      .filter(line => line.trim().length > 20)
      .filter(line => /\\d+\\.|question|which of|what is|if.*then/i.test(line))
      .slice(0, 10); // First 10 potential questions
    
    console.log('\\n=== Potential questions found ===');
    potentialQuestions.forEach((q, i) => {
      console.log(`${i + 1}. ${q.trim()}`);
    });
    
  } catch (error) {
    console.error('Error during PDF extraction test:', error);
  }
}

testPdfExtraction();
