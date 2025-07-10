import fs from 'fs';
import pdfParse from 'pdf-parse';
import { Question } from '../types';

export interface ExtractedQuestion {
  id: string;
  text: string;
  category: 'math' | 'verbal';
  domain?: string;
  skill: string;
  options: string[];
  correctAnswer: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  source: string;
}

export class SATQuestionExtractor {
  private questionCounter = 1;

  // Patterns to identify different question types and sections
  private mathDomains = {
    'algebra': ['equation', 'variable', 'solve for', 'linear', 'quadratic', 'polynomial'],
    'geometry': ['triangle', 'circle', 'angle', 'area', 'volume', 'perimeter', 'diameter', 'radius'],
    'statistics': ['mean', 'median', 'mode', 'data', 'probability', 'survey', 'sample'],
    'functions': ['function', 'f(x)', 'graph', 'domain', 'range', 'coordinate'],
    'trigonometry': ['sine', 'cosine', 'tangent', 'sin', 'cos', 'tan', 'degree', 'radian']
  };

  private verbalDomains = {
    'reading comprehension': ['passage', 'according to', 'author', 'main idea', 'infer'],
    'vocabulary': ['meaning', 'context', 'synonym', 'most nearly means'],
    'grammar': ['sentence', 'punctuation', 'grammar', 'verb', 'noun', 'subject'],
    'rhetoric': ['tone', 'purpose', 'audience', 'effect', 'persuasive']
  };

  async extractFromPDF(pdfPath: string, category: 'math' | 'verbal'): Promise<ExtractedQuestion[]> {
    console.log(`Extracting ${category} questions from: ${pdfPath}`);
    
    const dataBuffer = fs.readFileSync(pdfPath);
    const data = await pdfParse(dataBuffer);
    
    const questions = this.parseQuestions(data.text, category, pdfPath);
    console.log(`Extracted ${questions.length} ${category} questions`);
    
    return questions;
  }

  private parseQuestions(text: string, category: 'math' | 'verbal', source: string): ExtractedQuestion[] {
    const questions: ExtractedQuestion[] = [];
    const lines = text.split('\n').map(line => line.trim()).filter(line => line.length > 0);
    
    let currentQuestion: Partial<ExtractedQuestion> | null = null;
    let collectingOptions = false;
    let options: string[] = [];
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      
      // Skip headers, page numbers, and other metadata
      if (this.isMetadata(line)) continue;
      
      // Check if this line starts a new question
      if (this.isQuestionStart(line)) {
        // Save previous question if it exists
        if (currentQuestion && this.isValidQuestion(currentQuestion)) {
          questions.push(this.finalizeQuestion(currentQuestion, options, category, source));
        }
        
        // Start new question
        currentQuestion = {
          text: this.cleanQuestionText(line)
        };
        options = [];
        collectingOptions = false;
      }
      // Check if this line is an answer option
      else if (this.isAnswerOption(line)) {
        if (currentQuestion) {
          collectingOptions = true;
          options.push(this.cleanOptionText(line));
        }
      }
      // Check if this is a continuation of the question text
      else if (currentQuestion && !collectingOptions && this.isQuestionContinuation(line)) {
        currentQuestion.text += ' ' + line;
      }
      // Check for correct answer indicator
      else if (this.isCorrectAnswer(line) && currentQuestion) {
        currentQuestion.correctAnswer = this.extractCorrectAnswer(line, options);
      }
    }
    
    // Don't forget the last question
    if (currentQuestion && this.isValidQuestion(currentQuestion)) {
      questions.push(this.finalizeQuestion(currentQuestion, options, category, source));
    }
    
    return questions;
  }

  private isMetadata(line: string): boolean {
    // Skip common PDF metadata patterns
    const metadataPatterns = [
      /^page \d+/i,
      /^section \d+/i,
      /^part \d+/i,
      /^test \d+/i,
      /^time limit/i,
      /^instructions/i,
      /^\d+$/, // Page numbers
      /^[a-z]\s*$/, // Single letters
    ];
    
    return metadataPatterns.some(pattern => pattern.test(line)) || line.length < 10;
  }

  private isQuestionStart(line: string): boolean {
    // Patterns that typically indicate the start of a question
    const questionPatterns = [
      /^\d+\./,  // 1. 2. 3. etc.
      /^question \d+/i,
      /^which of the following/i,
      /^what is/i,
      /^if .* then/i,
      /^the .* is/i,
      /^according to/i,
      /^in the passage/i
    ];
    
    return questionPatterns.some(pattern => pattern.test(line)) && line.length > 20;
  }

  private isAnswerOption(line: string): boolean {
    // Check for answer choice patterns like A), B), (A), (B), etc.
    return /^[A-E][\)\.]/.test(line) || /^\([A-E]\)/.test(line);
  }

  private isQuestionContinuation(line: string): boolean {
    // Lines that are likely part of the question (not options or metadata)
    return !this.isAnswerOption(line) && 
           !this.isCorrectAnswer(line) && 
           !this.isMetadata(line) &&
           line.length > 10;
  }

  private isCorrectAnswer(line: string): boolean {
    return /^answer\s*:?\s*[A-E]/i.test(line) || 
           /^correct\s*:?\s*[A-E]/i.test(line) ||
           /^\([A-E]\)\s*correct/i.test(line);
  }

  private isValidQuestion(question: Partial<ExtractedQuestion>): boolean {
    return !!(question.text && question.text.length > 20);
  }

  private cleanQuestionText(text: string): string {
    // Remove question numbers and clean up formatting
    return text.replace(/^\d+\.\s*/, '')
               .replace(/^question \d+:?\s*/i, '')
               .trim();
  }

  private cleanOptionText(text: string): string {
    // Remove option letters and clean formatting
    return text.replace(/^[A-E][\)\.\s]+/i, '')
               .replace(/^\([A-E]\)\s*/i, '')
               .trim();
  }

  private extractCorrectAnswer(line: string, options: string[]): string {
    const match = line.match(/[A-E]/i);
    if (match) {
      const letterIndex = match[0].toUpperCase().charCodeAt(0) - 65; // A=0, B=1, etc.
      if (letterIndex >= 0 && letterIndex < options.length) {
        return options[letterIndex];
      }
    }
    return options[0] || ''; // Default to first option if can't determine
  }

  private determineDomain(text: string, category: 'math' | 'verbal'): string {
    const domains = category === 'math' ? this.mathDomains : this.verbalDomains;
    
    for (const [domain, keywords] of Object.entries(domains)) {
      if (keywords.some(keyword => text.toLowerCase().includes(keyword))) {
        return domain;
      }
    }
    
    return category === 'math' ? 'general math' : 'general verbal';
  }

  private determineSkill(text: string, domain: string, category: 'math' | 'verbal'): string {
    // More specific skill determination based on domain and question content
    const lowerText = text.toLowerCase();
    
    if (category === 'math') {
      if (domain === 'algebra') {
        if (lowerText.includes('linear')) return 'linear equations';
        if (lowerText.includes('quadratic')) return 'quadratic equations';
        if (lowerText.includes('system')) return 'systems of equations';
        return 'algebraic manipulation';
      } else if (domain === 'geometry') {
        if (lowerText.includes('area')) return 'area calculation';
        if (lowerText.includes('volume')) return 'volume calculation';
        if (lowerText.includes('angle')) return 'angle relationships';
        return 'geometric properties';
      } else if (domain === 'functions') {
        if (lowerText.includes('graph')) return 'function graphing';
        if (lowerText.includes('domain') || lowerText.includes('range')) return 'function properties';
        return 'function evaluation';
      }
    } else {
      if (domain === 'reading comprehension') {
        if (lowerText.includes('main idea')) return 'main idea';
        if (lowerText.includes('infer')) return 'inference';
        if (lowerText.includes('author')) return 'author\'s purpose';
        return 'reading comprehension';
      } else if (domain === 'vocabulary') {
        return 'vocabulary in context';
      }
    }
    
    return domain;
  }

  private finalizeQuestion(
    question: Partial<ExtractedQuestion>, 
    options: string[], 
    category: 'math' | 'verbal',
    source: string
  ): ExtractedQuestion {
    const domain = this.determineDomain(question.text!, category);
    const skill = this.determineSkill(question.text!, domain, category);
    
    return {
      id: `${category.charAt(0)}${this.questionCounter++}`,
      text: question.text!,
      category,
      domain,
      skill,
      options: options.length > 0 ? options : ['A', 'B', 'C', 'D'], // Default options if none found
      correctAnswer: question.correctAnswer || options[0] || 'A',
      source: source.split('/').pop() || source
    };
  }
}

// Main extraction function
export async function extractSATQuestions(): Promise<ExtractedQuestion[]> {
  const extractor = new SATQuestionExtractor();
  const allQuestions: ExtractedQuestion[] = [];
  
  try {
    // Extract math questions
    const mathQuestions = await extractor.extractFromPDF(
      '/Users/liamkrass/Documents/satProjectV2/bigSatMath.pdf', 
      'math'
    );
    allQuestions.push(...mathQuestions);
    
    // Extract verbal questions
    const verbalQuestions = await extractor.extractFromPDF(
      '/Users/liamkrass/Documents/satProjectV2/bigSatverbal.pdf', 
      'verbal'
    );
    allQuestions.push(...verbalQuestions);
    
    console.log(`Total questions extracted: ${allQuestions.length}`);
    console.log(`Math questions: ${mathQuestions.length}`);
    console.log(`Verbal questions: ${verbalQuestions.length}`);
    
    return allQuestions;
  } catch (error) {
    console.error('Error extracting questions:', error);
    throw error;
  }
}
