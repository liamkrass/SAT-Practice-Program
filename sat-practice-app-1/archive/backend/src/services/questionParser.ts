// questionParser.ts - Parse SAT questions from RTF file
import fs from 'fs';

export interface ParsedSATQuestion {
  id: string;
  text: string;
  visual: string | null;
  visualElement?: VisualElement;
  options: string[];
  correctAnswer: string;
  category: 'math' | 'verbal';
  domain: string;
  skill: string;
  difficulty: 'easy' | 'medium' | 'hard';
  source: string;
}

export interface VisualElement {
  type: 'graph' | 'table' | 'diagram' | 'chart' | 'equation';
  description: string;
  data?: any;
  svg?: string;
}

export class SATQuestionParser {
  
  parseRTFFile(rtfContent: string): ParsedSATQuestion[] {
    console.log('🔍 Starting RTF question parsing...');
    
    // Clean RTF formatting
    const cleanText = this.cleanRTFContent(rtfContent);
    
    // Extract questions
    const questions = this.extractQuestions(cleanText);
    
    // Filter out placeholder questions
    const validQuestions = questions.filter(q => this.isValidSATQuestion(q));
    
    console.log(`✅ Parsed ${validQuestions.length} valid SAT questions`);
    return validQuestions;
  }

  private cleanRTFContent(rtfContent: string): string {
    return rtfContent
      // Remove RTF formatting commands
      .replace(/\\[a-z]+[0-9]*\s?/g, '')
      .replace(/\{|\}/g, '')
      .replace(/\\\\/g, '')
      
      // Convert unicode characters
      .replace(/\\u8722/g, '−')  // minus sign
      .replace(/\\u8804/g, '≤')  // less than or equal
      .replace(/\\u8805/g, '≥')  // greater than or equal
      .replace(/\\u8739/g, '|')  // absolute value
      .replace(/\\u8773/g, '≅')  // congruent
      .replace(/\\u960/g, 'π')   // pi
      .replace(/\\u57376/g, '≠') // not equal
      .replace(/\\u8730/g, '√')  // square root
      .replace(/\\u8734/g, '∞')  // infinity
      .replace(/\\u8711/g, '∇')  // nabla
      .replace(/\\u8721/g, 'Σ')  // summation
      .replace(/\\u8747/g, '∫')  // integral
      
      // Normalize whitespace
      .replace(/\s+/g, ' ')
      .trim();
  }

  private extractQuestions(cleanText: string): ParsedSATQuestion[] {
    const questions: ParsedSATQuestion[] = [];
    
    // Split by question markers
    const questionBlocks = cleanText.split(/QUESTION_(\d+)/);
    
    for (let i = 1; i < questionBlocks.length; i += 2) {
      const questionNumber = questionBlocks[i];
      const questionContent = questionBlocks[i + 1];
      
      if (!questionContent) continue;
      
      try {
        const parsed = this.parseIndividualQuestion(questionNumber, questionContent);
        if (parsed) {
          questions.push(parsed);
        }
      } catch (error) {
        console.warn(`⚠️ Failed to parse question ${questionNumber}:`, error);
      }
    }
    
    return questions;
  }

  private parseIndividualQuestion(questionNumber: string, content: string): ParsedSATQuestion | null {
    // Extract components using regex patterns
    const questionMatch = content.match(/Question:\s*(.+?)(?=Visual:|A\)|$)/s);
    const visualMatch = content.match(/Visual:\s*(.+?)(?=A\)|$)/s);
    
    // Extract options
    const optionAMatch = content.match(/A\)\s*(.+?)(?=B\)|Answer:|$)/s);
    const optionBMatch = content.match(/B\)\s*(.+?)(?=C\)|Answer:|$)/s);
    const optionCMatch = content.match(/C\)\s*(.+?)(?=D\)|Answer:|$)/s);
    const optionDMatch = content.match(/D\)\s*(.+?)(?=Answer:|$)/s);
    
    // Extract metadata
    const answerMatch = content.match(/Answer:\s*([ABCD])/);
    const categoryMatch = content.match(/Category:\s*(\w+)/);
    const domainMatch = content.match(/Domain:\s*(.+?)(?=Skill:|$)/);
    const skillMatch = content.match(/Skill:\s*(.+?)(?=Difficulty:|$)/);
    const difficultyMatch = content.match(/Difficulty:\s*(\w+)/);

    if (!questionMatch || !answerMatch || !categoryMatch) {
      return null;
    }

    // Build options array
    const options: string[] = [];
    if (optionAMatch) options.push(optionAMatch[1].trim());
    if (optionBMatch) options.push(optionBMatch[1].trim());
    if (optionCMatch) options.push(optionCMatch[1].trim());
    if (optionDMatch) options.push(optionDMatch[1].trim());

    if (options.length !== 4) {
      return null; // Skip incomplete questions
    }

    const questionText = questionMatch[1].trim();
    const visualDescription = visualMatch ? visualMatch[1].trim() : null;
    
    // Create visual element if needed
    let visualElement: VisualElement | undefined;
    if (visualDescription && visualDescription.toLowerCase() !== 'none') {
      visualElement = this.createVisualElement(visualDescription);
    }

    return {
      id: `sat_math_${questionNumber}`,
      text: questionText,
      visual: visualDescription,
      visualElement: visualElement,
      options: options.map((opt, index) => `${String.fromCharCode(65 + index)}) ${opt}`),
      correctAnswer: answerMatch[1],
      category: categoryMatch[1].toLowerCase() as 'math' | 'verbal',
      domain: domainMatch ? domainMatch[1].trim() : 'Unknown',
      skill: skillMatch ? skillMatch[1].trim() : 'Unknown',
      difficulty: (difficultyMatch ? difficultyMatch[1].toLowerCase() : 'medium') as 'easy' | 'medium' | 'hard',
      source: 'College Board'
    };
  }

  private createVisualElement(description: string): VisualElement {
    const lowerDesc = description.toLowerCase();
    
    // Detect visual type
    let type: VisualElement['type'] = 'diagram';
    if (lowerDesc.includes('graph') || lowerDesc.includes('coordinate') || lowerDesc.includes('xy-plane')) {
      type = 'graph';
    } else if (lowerDesc.includes('table')) {
      type = 'table';
    } else if (lowerDesc.includes('chart') || lowerDesc.includes('bar') || lowerDesc.includes('histogram')) {
      type = 'chart';
    } else if (lowerDesc.includes('equation') || lowerDesc.includes('formula')) {
      type = 'equation';
    }

    const visualElement: VisualElement = {
      type: type,
      description: description,
      data: this.extractDataFromDescription(description),
      svg: this.generateSVG(type, description)
    };

    return visualElement;
  }

  private extractDataFromDescription(description: string): any {
    const data: any = {};
    
    // Extract coordinates
    const coordPattern = /\(([−\-]?\d+(?:\.\d+)?),\s*([−\-]?\d+(?:\.\d+)?)\)/g;
    const coordinates = [];
    let match;
    while ((match = coordPattern.exec(description)) !== null) {
      coordinates.push([parseFloat(match[1]), parseFloat(match[2])]);
    }
    if (coordinates.length > 0) {
      data.coordinates = coordinates;
    }
    
    // Extract vertex information
    const vertexMatch = description.match(/vertex\s+(?:is\s+)?(?:at\s+)?\(([−\-]?\d+(?:\.\d+)?),\s*([−\-]?\d+(?:\.\d+)?)\)/i);
    if (vertexMatch) {
      data.vertex = [parseFloat(vertexMatch[1]), parseFloat(vertexMatch[2])];
    }
    
    // Extract intercepts
    const xInterceptPattern = /x-intercept[s]?\s+(?:are\s+)?(?:at\s+)?(?:approximately\s+)?(?:at\s+)?([−\-]?\d+(?:\.\d+)?)/gi;
    const yInterceptPattern = /y-intercept\s+(?:is\s+)?(?:at\s+)?\(([−\-]?\d+(?:\.\d+)?),\s*([−\-]?\d+(?:\.\d+)?)\)/i;
    
    const xIntercepts = [];
    let xMatch;
    while ((xMatch = xInterceptPattern.exec(description)) !== null) {
      xIntercepts.push(parseFloat(xMatch[1]));
    }
    if (xIntercepts.length > 0) {
      data.xIntercepts = xIntercepts;
    }
    
    const yInterceptMatch = description.match(yInterceptPattern);
    if (yInterceptMatch) {
      data.yIntercept = [parseFloat(yInterceptMatch[1]), parseFloat(yInterceptMatch[2])];
    }
    
    // Extract table data
    if (description.includes('table')) {
      const tableData = this.extractTableData(description);
      if (tableData) {
        data.table = tableData;
      }
    }
    
    return data;
  }

  private extractTableData(description: string): any {
    // Extract table information
    const tableMatch = description.match(/table.*?values.*?(\(.+?\)(?:,\s*\(.+?\))*)/i);
    if (tableMatch) {
      const values = tableMatch[1];
      const coordPattern = /\(([−\-]?\d+(?:\.\d+)?),\s*([−\-]?\d+(?:\.\d+)?)\)/g;
      const rows = [];
      let match;
      while ((match = coordPattern.exec(values)) !== null) {
        rows.push([parseFloat(match[1]), parseFloat(match[2])]);
      }
      return {
        headers: ['x', 'p(x)'],
        rows: rows
      };
    }
    return null;
  }

  private generateSVG(type: VisualElement['type'], description: string): string {
    const data = this.extractDataFromDescription(description);
    
    switch (type) {
      case 'graph':
        return this.generateGraphSVG(data, description);
      case 'table':
        return this.generateTableSVG(data);
      case 'chart':
        return this.generateChartSVG(data);
      default:
        return this.generateDiagramSVG(description);
    }
  }

  private generateGraphSVG(data: any, description: string): string {
    const width = 400;
    const height = 300;
    const padding = 40;
    
    let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .axis { stroke: #333; stroke-width: 1; }
          .grid { stroke: #ddd; stroke-width: 0.5; }
          .parabola { fill: none; stroke: #2563eb; stroke-width: 2; }
          .point { fill: #dc2626; }
          .vertex { fill: #059669; }
          .label { font-family: Arial, sans-serif; font-size: 12px; fill: #333; }
        </style>
      </defs>
      
      <!-- Grid -->`;
    
    // Add grid lines
    for (let i = 0; i <= 10; i++) {
      const x = padding + (i * (width - 2 * padding)) / 10;
      const y = padding + (i * (height - 2 * padding)) / 10;
      svg += `<line x1="${x}" y1="${padding}" x2="${x}" y2="${height - padding}" class="grid"/>`;
      svg += `<line x1="${padding}" y1="${y}" x2="${width - padding}" y2="${y}" class="grid"/>`;
    }
    
    // Add axes
    svg += `<line x1="${padding}" y1="${height/2}" x2="${width - padding}" y2="${height/2}" class="axis"/>`;
    svg += `<line x1="${width/2}" y1="${padding}" x2="${width/2}" y2="${height - padding}" class="axis"/>`;
    
    // Add parabola if described
    if (description.toLowerCase().includes('parabola')) {
      const vertex = data.vertex || [0, 0];
      const opens = description.toLowerCase().includes('downward') ? 'down' : 'up';
      const a = opens === 'down' ? -0.5 : 0.5;
      
      let pathData = 'M ';
      for (let x = -10; x <= 10; x += 0.5) {
        const y = a * Math.pow(x - vertex[0], 2) + vertex[1];
        const screenX = padding + ((x + 10) * (width - 2 * padding)) / 20;
        const screenY = height - padding - ((y + 10) * (height - 2 * padding)) / 20;
        pathData += `${screenX},${screenY} `;
      }
      
      svg += `<path d="${pathData}" class="parabola"/>`;
      
      // Add vertex point
      const vertexX = padding + ((vertex[0] + 10) * (width - 2 * padding)) / 20;
      const vertexY = height - padding - ((vertex[1] + 10) * (height - 2 * padding)) / 20;
      svg += `<circle cx="${vertexX}" cy="${vertexY}" r="4" class="vertex"/>`;
    }
    
    // Add intercepts
    if (data.xIntercepts) {
      data.xIntercepts.forEach((x: number) => {
        const screenX = padding + ((x + 10) * (width - 2 * padding)) / 20;
        const screenY = height/2;
        svg += `<circle cx="${screenX}" cy="${screenY}" r="3" class="point"/>`;
      });
    }
    
    if (data.yIntercept) {
      const screenX = width/2;
      const screenY = height - padding - ((data.yIntercept[1] + 10) * (height - 2 * padding)) / 20;
      svg += `<circle cx="${screenX}" cy="${screenY}" r="3" class="point"/>`;
    }
    
    svg += '</svg>';
    return svg;
  }

  private generateTableSVG(data: any): string {
    if (!data.table) return '';
    
    const { headers, rows } = data.table;
    const cellWidth = 80;
    const cellHeight = 30;
    const width = cellWidth * headers.length;
    const height = cellHeight * (rows.length + 1);
    
    let svg = `<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .table-border { fill: none; stroke: #333; stroke-width: 1; }
          .table-header { fill: #f3f4f6; stroke: #333; stroke-width: 1; }
          .table-cell { fill: white; stroke: #333; stroke-width: 1; }
          .table-text { font-family: Arial, sans-serif; font-size: 14px; fill: #333; text-anchor: middle; }
        </style>
      </defs>`;
    
    // Headers
    headers.forEach((header: string, i: number) => {
      svg += `<rect x="${i * cellWidth}" y="0" width="${cellWidth}" height="${cellHeight}" class="table-header"/>`;
      svg += `<text x="${i * cellWidth + cellWidth/2}" y="${cellHeight/2 + 5}" class="table-text">${header}</text>`;
    });
    
    // Rows
    rows.forEach((row: number[], i: number) => {
      row.forEach((cell: number, j: number) => {
        const y = (i + 1) * cellHeight;
        svg += `<rect x="${j * cellWidth}" y="${y}" width="${cellWidth}" height="${cellHeight}" class="table-cell"/>`;
        svg += `<text x="${j * cellWidth + cellWidth/2}" y="${y + cellHeight/2 + 5}" class="table-text">${cell}</text>`;
      });
    });
    
    svg += '</svg>';
    return svg;
  }

  private generateChartSVG(data: any): string {
    // Simple bar chart placeholder
    return `<svg width="300" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect x="50" y="50" width="40" height="100" fill="#3b82f6"/>
      <rect x="100" y="75" width="40" height="75" fill="#ef4444"/>
      <rect x="150" y="25" width="40" height="125" fill="#10b981"/>
      <text x="70" y="170" text-anchor="middle" font-size="12">A</text>
      <text x="120" y="170" text-anchor="middle" font-size="12">B</text>
      <text x="170" y="170" text-anchor="middle" font-size="12">C</text>
    </svg>`;
  }

  private generateDiagramSVG(description: string): string {
    // Simple geometric shape placeholder
    return `<svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <circle cx="100" cy="100" r="50" fill="none" stroke="#333" stroke-width="2"/>
      <text x="100" y="105" text-anchor="middle" font-size="12">${description.substring(0, 20)}...</text>
    </svg>`;
  }

  private isValidSATQuestion(question: ParsedSATQuestion): boolean {
    // Filter out placeholder/example questions
    const placeholderIndicators = [
      'example',
      'placeholder',
      'test question',
      'sample',
      'option a',
      'option b',
      'option c',
      'option d'
    ];

    const questionLower = question.text.toLowerCase();
    const hasPlaceholder = placeholderIndicators.some(indicator => 
      questionLower.includes(indicator)
    );

    // Check if options are placeholder
    const hasPlaceholderOptions = question.options.some(option => 
      option.toLowerCase().match(/^[abcd]\)\s*option [abcd]$/i)
    );

    // Ensure question has meaningful content
    const hasSubstantialContent = question.text.length > 20;
    const hasValidDomain = !question.domain.toLowerCase().includes('unknown');
    
    return !hasPlaceholder && 
           !hasPlaceholderOptions && 
           hasSubstantialContent && 
           hasValidDomain &&
           question.options.length === 4;
  }

  // Convert to your app's question format
  convertToAppFormat(parsedQuestions: ParsedSATQuestion[]) {
    return parsedQuestions.map(q => ({
      id: q.id,
      text: q.text,
      category: q.category,
      domain: q.domain,
      skill: q.skill,
      difficulty: q.difficulty,
      options: q.options,
      correctAnswer: q.correctAnswer,
      visual: q.visual && q.visual !== 'None' ? q.visual : undefined,
      visualElement: q.visualElement,
      source: q.source
    }));
  }
}

export default SATQuestionParser;
