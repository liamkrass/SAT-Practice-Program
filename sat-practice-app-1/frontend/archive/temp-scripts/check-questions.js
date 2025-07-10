// Quick script to check question counts and deduplication
import { readFileSync } from 'fs';

// Read the mathQuestions.ts file and count raw questions
const content = readFileSync('./src/data/mathQuestions.ts', 'utf8');

// Extract the questions array content between dedupeQuestions([ and ]);
const arrayStart = content.indexOf('dedupeQuestions([');
const arrayEnd = content.indexOf(']);', arrayStart);
if (arrayStart === -1 || arrayEnd === -1) {
  console.log('Could not find questions array');
  process.exit(1);
}

const arrayContent = content.substring(arrayStart + 17, arrayEnd);

// Count question objects by counting '{ id: ' patterns
const questionMatches = arrayContent.match(/\{\s*id:\s*"[^"]*"/g) || [];
console.log('Raw questions before deduplication:', questionMatches.length);

// Import the actual processed questions
import { mathQuestions } from './src/data/mathQuestions.js';
console.log('Questions after deduplication:', mathQuestions.length);
console.log('Questions removed:', questionMatches.length - mathQuestions.length);

// Let's also import satQuestions to see the total
import { satQuestions, questionStats } from './src/data/satQuestions.js';
console.log('Total satQuestions count:', satQuestions.length);
console.log('Question stats:', questionStats);
