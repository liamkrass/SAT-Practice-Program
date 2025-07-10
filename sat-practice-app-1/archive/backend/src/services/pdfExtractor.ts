import fs from 'fs';
import pdfParse from 'pdf-parse';
import { Question } from '../types';

export const extractQuestionsFromPDF = async (pdfPaths: string[]): Promise<Question[]> => {
    const questions: Question[] = [];
    let idCounter = 1;

    for (const path of pdfPaths) {
        console.log(`Reading PDF: ${path}`);
        const dataBuffer = fs.readFileSync(path);
        console.log(`Parsing PDF: ${path}`);
        const data = await pdfParse(dataBuffer);
        console.log(`Parsed PDF: ${path}`);

        const lines = data.text.split('\n');
        console.log(`Extracted ${lines.length} lines from ${path}`);
        lines.forEach((line: string) => {
            // Add a log for each line (optional, can be commented out if too verbose)
            // console.log(`Line: ${line}`);
            const questionMatch = line.match(/^(.*?)(\s*-\s*(.*?))?$/);
            if (questionMatch) {
                const questionText = questionMatch[1].trim();
                const category = questionMatch[2] ? questionMatch[2].trim() : 'General';
                const skill = questionMatch[3] ? questionMatch[3].trim() : 'Unknown';
                const id = `q${idCounter++}`;
                // Ensure category is 'math' or 'verbal' for type safety
                const normalizedCategory = /math/i.test(category) ? 'math' : 'verbal';
                questions.push({ 
                    id, 
                    text: questionText, 
                    category: normalizedCategory, 
                    skill,
                    options: ['A', 'B', 'C', 'D'], // Default options
                    correctAnswer: 'A' // Default answer
                });
            }
        });
        console.log(`Extracted ${questions.length} questions so far.`);
    }

    console.log(`Total questions extracted: ${questions.length}`);
    return questions;
};