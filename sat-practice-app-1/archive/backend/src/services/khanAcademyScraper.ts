import puppeteer, { Browser, Page } from 'puppeteer';
import { Question } from '../types';

export interface KhanQuestion {
  id: string;
  text: string;
  category: 'math' | 'verbal';
  domain: string;
  skill: string;
  difficulty: 'easy' | 'medium' | 'hard';
  options: string[];
  correctAnswer: string;
  source: string;
  url: string;
}

export class KhanAcademyScraper {
  private browser: Browser | null = null;
  private questionCounter = 1;

  // Khan Academy SAT practice URLs organized by domain
  private readonly SAT_URLS = {
    math: {
      'heart-of-algebra': [
        'https://www.khanacademy.org/test-prep/sat/sat-math-practice/sat-heart-of-algebra',
        'https://www.khanacademy.org/test-prep/sat/sat-math-practice/sat-linear-equations-inequalities',
        'https://www.khanacademy.org/test-prep/sat/sat-math-practice/sat-systems-of-equations'
      ],
      'problem-solving-data-analysis': [
        'https://www.khanacademy.org/test-prep/sat/sat-math-practice/sat-problem-solving-data-analysis',
        'https://www.khanacademy.org/test-prep/sat/sat-math-practice/sat-scatterplots',
        'https://www.khanacademy.org/test-prep/sat/sat-math-practice/sat-two-way-tables'
      ],
      'passport-advanced-math': [
        'https://www.khanacademy.org/test-prep/sat/sat-math-practice/sat-passport-advanced-math',
        'https://www.khanacademy.org/test-prep/sat/sat-math-practice/sat-quadratics',
        'https://www.khanacademy.org/test-prep/sat/sat-math-practice/sat-polynomial-factorization'
      ],
      'geometry-trigonometry': [
        'https://www.khanacademy.org/test-prep/sat/sat-math-practice/sat-geometry-trigonometry',
        'https://www.khanacademy.org/test-prep/sat/sat-math-practice/sat-area-volume',
        'https://www.khanacademy.org/test-prep/sat/sat-math-practice/sat-right-triangle-trig'
      ]
    },
    verbal: {
      'reading': [
        'https://www.khanacademy.org/test-prep/sat/sat-reading-writing-practice',
        'https://www.khanacademy.org/test-prep/sat/sat-reading-writing-practice/sat-reading-social-science',
        'https://www.khanacademy.org/test-prep/sat/sat-reading-writing-practice/sat-reading-natural-science'
      ],
      'writing': [
        'https://www.khanacademy.org/test-prep/sat/sat-reading-writing-practice/sat-writing-language',
        'https://www.khanacademy.org/test-prep/sat/sat-reading-writing-practice/sat-standard-english-conventions',
        'https://www.khanacademy.org/test-prep/sat/sat-reading-writing-practice/sat-expression-of-ideas'
      ]
    }
  };

  private readonly SKILL_MAPPINGS = {
    'heart-of-algebra': {
      keywords: ['linear', 'equation', 'variable', 'solve for', 'system'],
      skills: ['linear equations', 'systems of equations', 'inequalities', 'algebraic expressions']
    },
    'problem-solving-data-analysis': {
      keywords: ['data', 'graph', 'table', 'percent', 'ratio', 'proportion'],
      skills: ['data interpretation', 'statistics', 'probability', 'ratios and proportions']
    },
    'passport-advanced-math': {
      keywords: ['quadratic', 'polynomial', 'function', 'exponential', 'radical'],
      skills: ['quadratic equations', 'polynomial operations', 'function analysis', 'exponential functions']
    },
    'geometry-trigonometry': {
      keywords: ['triangle', 'circle', 'angle', 'area', 'volume', 'coordinate'],
      skills: ['geometry', 'trigonometry', 'coordinate geometry', 'area and volume']
    },
    'reading': {
      keywords: ['passage', 'author', 'main idea', 'evidence', 'inference'],
      skills: ['reading comprehension', 'author\'s purpose', 'evidence-based reading', 'inference']
    },
    'writing': {
      keywords: ['grammar', 'punctuation', 'sentence', 'paragraph', 'style'],
      skills: ['grammar and usage', 'sentence structure', 'writing style', 'editing']
    }
  };

  async initialize(): Promise<void> {
    try {
      console.log('🚀 Initializing Khan Academy scraper...');
      this.browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-web-security',
          '--disable-features=VizDisplayCompositor'
        ]
      });
      console.log('✅ Browser launched successfully');
    } catch (error) {
      console.error('❌ Failed to initialize browser:', error);
      throw error;
    }
  }

  async scrapeAllSATQuestions(maxQuestionsPerDomain: number = 50): Promise<KhanQuestion[]> {
    if (!this.browser) {
      await this.initialize();
    }

    const allQuestions: KhanQuestion[] = [];
    
    try {
      console.log('📚 Starting comprehensive SAT question scraping...');

      // Scrape Math Questions
      console.log('\n🧮 Scraping Math Questions...');
      for (const [domain, urls] of Object.entries(this.SAT_URLS.math)) {
        console.log(`  📖 Scraping domain: ${domain}`);
        for (const url of urls) {
          try {
            const questions = await this.scrapeDomainQuestions(url, 'math', domain, maxQuestionsPerDomain);
            allQuestions.push(...questions);
            console.log(`    ✅ Found ${questions.length} questions from ${this.extractSectionName(url)}`);
            
            // Add delay to be respectful
            await this.sleep(2000);
          } catch (error) {
            console.warn(`    ⚠️  Failed to scrape ${url}:`, error);
          }
        }
      }

      // Scrape Verbal Questions
      console.log('\n📖 Scraping Verbal Questions...');
      for (const [domain, urls] of Object.entries(this.SAT_URLS.verbal)) {
        console.log(`  📚 Scraping domain: ${domain}`);
        for (const url of urls) {
          try {
            const questions = await this.scrapeDomainQuestions(url, 'verbal', domain, maxQuestionsPerDomain);
            allQuestions.push(...questions);
            console.log(`    ✅ Found ${questions.length} questions from ${this.extractSectionName(url)}`);
            
            // Add delay to be respectful
            await this.sleep(2000);
          } catch (error) {
            console.warn(`    ⚠️  Failed to scrape ${url}:`, error);
          }
        }
      }

      console.log(`\n🎉 Scraping complete! Total questions found: ${allQuestions.length}`);
      return allQuestions;

    } catch (error) {
      console.error('❌ Error during scraping:', error);
      throw error;
    }
  }

  private async scrapeDomainQuestions(
    url: string, 
    category: 'math' | 'verbal', 
    domain: string, 
    maxQuestions: number
  ): Promise<KhanQuestion[]> {
    const page = await this.browser!.newPage();
    const questions: KhanQuestion[] = [];

    try {
      // Set user agent to avoid blocking
      await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
      
      console.log(`    🔍 Loading: ${url}`);
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

      // Wait for content to load
      await this.sleep(3000);

      // Look for exercise links and practice problems
      const exerciseLinks = await this.findExerciseLinks(page);
      console.log(`    🔗 Found ${exerciseLinks.length} exercise links`);

      // Visit each exercise and extract questions
      for (let i = 0; i < Math.min(exerciseLinks.length, maxQuestions); i++) {
        try {
          const exerciseQuestions = await this.scrapeExercise(exerciseLinks[i], category, domain);
          questions.push(...exerciseQuestions);
          
          if (questions.length >= maxQuestions) break;
          
          // Respectful delay
          await this.sleep(1500);
        } catch (error) {
          console.warn(`      ⚠️  Failed to scrape exercise ${i + 1}:`, error);
        }
      }

      // Also try to extract questions directly from the current page
      const directQuestions = await this.extractQuestionsFromPage(page, category, domain, url);
      questions.push(...directQuestions);

    } catch (error) {
      console.error(`    ❌ Failed to scrape ${url}:`, error);
    } finally {
      await page.close();
    }

    return questions.slice(0, maxQuestions);
  }

  private async findExerciseLinks(page: Page): Promise<string[]> {
    return await page.evaluate(() => {
      const links: string[] = [];
      
      // Look for various types of exercise links
      const selectors = [
        'a[href*="/exercise/"]',
        'a[href*="/practice/"]',
        'a[href*="/question/"]',
        '.exercise-link',
        '.practice-link'
      ];

      selectors.forEach(selector => {
        const elements = document.querySelectorAll(selector);
        elements.forEach(el => {
          const href = (el as HTMLAnchorElement).href;
          if (href && href.includes('khanacademy.org') && !links.includes(href)) {
            links.push(href);
          }
        });
      });

      return links;
    });
  }

  private async scrapeExercise(
    exerciseUrl: string, 
    category: 'math' | 'verbal', 
    domain: string
  ): Promise<KhanQuestion[]> {
    const page = await this.browser!.newPage();
    const questions: KhanQuestion[] = [];

    try {
      await page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36');
      await page.goto(exerciseUrl, { waitUntil: 'networkidle2', timeout: 20000 });
      await this.sleep(2000);

      const extractedQuestions = await this.extractQuestionsFromPage(page, category, domain, exerciseUrl);
      questions.push(...extractedQuestions);

    } catch (error) {
      console.warn(`      ⚠️  Failed to scrape exercise ${exerciseUrl}:`, error);
    } finally {
      await page.close();
    }

    return questions;
  }

  private async extractQuestionsFromPage(
    page: Page, 
    category: 'math' | 'verbal', 
    domain: string, 
    url: string
  ): Promise<KhanQuestion[]> {
    return await page.evaluate((category, domain, url, questionCounter) => {
      const questions: any[] = [];

      // Try multiple selectors to find question content
      const questionSelectors = [
        '.question-text',
        '.exercise-question',
        '.problem-text',
        '[data-test-id*="question"]',
        '.perseus-renderer',
        '.framework-perseus'
      ];

      const optionSelectors = [
        '.choice',
        '.option',
        '.answer-choice',
        '[data-test-id*="choice"]',
        '.perseus-radio-option'
      ];

      let questionElements: NodeListOf<Element> | null = null;
      
      // Find question elements
      for (const selector of questionSelectors) {
        const elements = document.querySelectorAll(selector);
        if (elements.length > 0) {
          questionElements = elements;
          break;
        }
      }

      if (!questionElements || questionElements.length === 0) {
        return questions;
      }

      questionElements.forEach((questionEl, index) => {
        try {
          const questionText = questionEl.textContent?.trim();
          
          if (!questionText || questionText.length < 20) return;

          // Find associated answer choices
          const options: string[] = [];
          let optionElements: NodeListOf<Element> | null = null;

          // Look for options near the question
          for (const optionSelector of optionSelectors) {
            const opts = questionEl.querySelectorAll(optionSelector) || 
                        questionEl.parentElement?.querySelectorAll(optionSelector) ||
                        document.querySelectorAll(optionSelector);
            
            if (opts && opts.length >= 2) {
              optionElements = opts;
              break;
            }
          }

          // Extract option texts
          if (optionElements) {
            optionElements.forEach(opt => {
              const optText = opt.textContent?.trim();
              if (optText && optText.length > 0 && optText.length < 200) {
                options.push(optText);
              }
            });
          }

          // If no options found, create default multiple choice
          if (options.length < 2) {
            if (category === 'math') {
              options.push('A) Option A', 'B) Option B', 'C) Option C', 'D) Option D');
            } else {
              options.push('Choice A', 'Choice B', 'Choice C', 'Choice D');
            }
          }

          // Extract skill from URL and question content
          const skill = this.determineSkill(questionText, domain, url);
          const difficulty = this.determineDifficulty(questionText, options.length);

          const question = {
            id: `khan_${category}_${questionCounter + index}`,
            text: questionText,
            category,
            domain,
            skill,
            difficulty,
            options: options.slice(0, 4), // Limit to 4 options
            correctAnswer: options[0] || 'A', // Default to first option
            source: 'Khan Academy',
            url: url
          };

          questions.push(question);

        } catch (error) {
          console.warn('Error extracting question:', error);
        }
      });

      return questions;
    }, category, domain, url, this.questionCounter);
  }

  private determineSkill(questionText: string, domain: string, url: string): string {
    const lowerText = questionText.toLowerCase();
    const lowerUrl = url.toLowerCase();
    
    const domainMapping = this.SKILL_MAPPINGS[domain as keyof typeof this.SKILL_MAPPINGS];
    if (!domainMapping) return domain;

    // Check URL for specific skill indicators
    for (const skill of domainMapping.skills) {
      if (lowerUrl.includes(skill.replace(/\s+/g, '-')) || 
          lowerUrl.includes(skill.replace(/\s+/g, '_'))) {
        return skill;
      }
    }

    // Check question text for skill keywords
    for (let i = 0; i < domainMapping.keywords.length; i++) {
      if (lowerText.includes(domainMapping.keywords[i])) {
        return domainMapping.skills[i] || domainMapping.skills[0];
      }
    }

    return domainMapping.skills[0] || domain;
  }

  private determineDifficulty(questionText: string, optionCount: number): 'easy' | 'medium' | 'hard' {
    const textLength = questionText.length;
    
    // Simple heuristic based on question complexity
    if (textLength < 100 && optionCount <= 3) return 'easy';
    if (textLength > 300 || optionCount > 4) return 'hard';
    return 'medium';
  }

  private extractSectionName(url: string): string {
    const parts = url.split('/');
    return parts[parts.length - 1] || 'unknown-section';
  }

  private sleep(ms: number): Promise<void> {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async close(): Promise<void> {
    if (this.browser) {
      await this.browser.close();
      this.browser = null;
      console.log('🔒 Browser closed');
    }
  }

  // Convert KhanQuestion to your app's Question format
  convertToAppFormat(khanQuestions: KhanQuestion[]): Question[] {
    return khanQuestions.map(kq => ({
      id: kq.id,
      text: kq.text,
      category: kq.category,
      skill: kq.skill,
      options: kq.options,
      correctAnswer: kq.correctAnswer,
      domain: kq.domain,
      difficulty: kq.difficulty,
      source: kq.source
    }));
  }
}

// Utility function for easy use
export async function scrapeKhanAcademySAT(maxQuestionsPerDomain: number = 30): Promise<Question[]> {
  const scraper = new KhanAcademyScraper();
  
  try {
    await scraper.initialize();
    const khanQuestions = await scraper.scrapeAllSATQuestions(maxQuestionsPerDomain);
    const appQuestions = scraper.convertToAppFormat(khanQuestions);
    
    console.log(`\n📊 Scraping Summary:`);
    console.log(`   Total Questions: ${appQuestions.length}`);
    console.log(`   Math Questions: ${appQuestions.filter(q => q.category === 'math').length}`);
    console.log(`   Verbal Questions: ${appQuestions.filter(q => q.category === 'verbal').length}`);
    
    return appQuestions;
    
  } finally {
    await scraper.close();
  }
}
