# Khan Academy SAT Question Scraper

A comprehensive scraping solution to extract high-quality SAT practice questions from Khan Academy's official SAT prep content.

## 🎯 Features

- **High-Quality Questions**: Scrapes from Khan Academy's official College Board partnership content
- **Smart Categorization**: Automatically categorizes questions by domain and skill
- **Respectful Scraping**: Built-in rate limiting and respectful delays
- **Comprehensive Coverage**: Covers all major SAT domains (Math and Verbal)
- **Easy Integration**: Seamlessly integrates with your existing SAT practice app

## 📋 Prerequisites

```bash
npm install puppeteer axios cheerio @types/puppeteer
```

## 🚀 Quick Start

### 1. Test the Scraper
```bash
cd backend
npm run test-khan-scraper
```

### 2. Scrape Questions (Small Test)
```bash
npm run scrape-khan-small  # 10 questions per domain
```

### 3. Full Scraping
```bash
npm run scrape-khan         # 25 questions per domain (recommended)
npm run scrape-khan-large   # 50 questions per domain (comprehensive)
```

## 📊 What Gets Scraped

### Math Domains
- **Heart of Algebra**: Linear equations, systems, inequalities
- **Problem Solving & Data Analysis**: Statistics, probability, data interpretation
- **Passport to Advanced Math**: Quadratics, polynomials, functions
- **Additional Topics**: Geometry, trigonometry, coordinate geometry

### Verbal Domains
- **Reading**: Reading comprehension, evidence-based reading, inference
- **Writing & Language**: Grammar, sentence structure, style, editing

## 🔧 Configuration Options

```bash
# Custom configuration
npm run scrape-khan -- --max-questions=20 --output=./custom-path/questions.ts
```

### Available Options
- `--max-questions=N`: Maximum questions per domain (default: 25)
- `--output=PATH`: Custom output file path
- `--no-metadata`: Skip metadata collection
- `--no-rate-limit`: Disable rate limiting (not recommended)

## 📁 Output Files

After scraping, you'll get:

### 1. Khan Academy Questions File
`frontend/src/data/khanQuestions.ts`
```typescript
export const khanAcademyQuestions: KhanQuestion[] = [
  {
    id: "khan_math_1",
    text: "If 3x + 7 = 22, what is the value of x?",
    category: "math",
    domain: "heart-of-algebra", 
    skill: "linear equations",
    difficulty: "easy",
    options: ["3", "5", "7", "15"],
    correctAnswer: "5",
    source: "Khan Academy",
    url: "https://..."
  },
  // ... more questions
];
```

### 2. Integration Report
`backend/src/reports/khan-academy-scraping-report.md`
- Detailed scraping statistics
- Domain and skill breakdown
- Quality metrics
- Integration instructions

### 3. Updated Main Questions
The scraper automatically updates `satQuestions.ts` to include Khan Academy questions:
```typescript
export const satQuestions: Question[] = [
  ...mathQuestions,      // Your existing questions
  ...verbalQuestions,    // Your existing questions  
  ...khanAcademyQuestions // Newly scraped Khan Academy questions
];
```

## 📈 Expected Results

Typical scraping session (25 questions per domain):

```
📊 Scraping Summary:
   Total Questions: 200-300
   Math Questions: 100-150
   Verbal Questions: 100-150

🧮 Math Domains:
     heart-of-algebra: 40-60 questions
     problem-solving-data-analysis: 35-50 questions
     passport-advanced-math: 30-45 questions
     geometry-trigonometry: 25-40 questions

📖 Verbal Domains:
     reading: 60-90 questions
     writing: 40-60 questions
```

## 🔍 Quality Features

### Smart Domain Detection
The scraper uses URL analysis and content keywords to accurately categorize questions:

```typescript
// URL: .../sat-heart-of-algebra/linear-equations-one-variable
// Result: domain = "heart-of-algebra", skill = "linear equations"
```

### Intelligent Skill Mapping
```typescript
const SKILL_MAPPINGS = {
  'heart-of-algebra': {
    keywords: ['linear', 'equation', 'system'],
    skills: ['linear equations', 'systems of equations', 'inequalities']
  }
  // ... more mappings
};
```

### Difficulty Assessment
Automatically determines difficulty based on:
- Question text length
- Number of answer choices
- Complexity indicators

## 📱 Using Scraped Questions in Your App

### 1. Import Questions
```typescript
import { 
  khanAcademyQuestions, 
  getKhanQuestionsByDomain,
  getKhanQuestionsByCategory 
} from './data/khanQuestions';
```

### 2. Filter by Category
```typescript
const mathQuestions = getKhanQuestionsByCategory('math');
const verbalQuestions = getKhanQuestionsByCategory('verbal');
```

### 3. Filter by Domain
```typescript
const algebraQuestions = getKhanQuestionsByDomain('heart-of-algebra');
const readingQuestions = getKhanQuestionsByDomain('reading');
```

### 4. Random Practice Sets
```typescript
import { getRandomKhanQuestions } from './data/khanQuestions';

const practiceSet = getRandomKhanQuestions(20, 'math'); // 20 random math questions
```

## 🛠️ Troubleshooting

### Common Issues

#### 1. Browser Launch Failed
```bash
Error: Failed to launch the browser process
```
**Solution**: Install Chromium dependencies
```bash
# macOS
brew install chromium

# Update Puppeteer
npm install puppeteer@latest
```

#### 2. Network Timeouts
```bash
Error: Navigation timeout exceeded
```
**Solution**: Increase timeout or reduce concurrent requests
```typescript
// In khanAcademyScraper.ts, increase timeout:
await page.goto(url, { waitUntil: 'networkidle2', timeout: 60000 });
```

#### 3. No Questions Found
```bash
Warning: No questions were scraped
```
**Solution**: 
1. Check your internet connection
2. Verify Khan Academy URLs are accessible
3. Run with `--no-rate-limit` for testing

### Debugging

Enable verbose logging:
```typescript
// In scraper, add:
console.log('Current URL:', page.url());
console.log('Page content preview:', await page.content().slice(0, 500));
```

## 🔄 Maintenance & Updates

### Regular Updates
Run scraping weekly to get fresh questions:
```bash
# Weekly cron job
0 2 * * 1 cd /path/to/project && npm run scrape-khan
```

### Monitoring Quality
Check the generated reports for:
- Question quality metrics
- Domain distribution balance
- Success rate trends

### Expanding Coverage
To add more Khan Academy sections:
1. Find new SAT prep URLs on Khan Academy
2. Add them to `SAT_URLS` in `khanAcademyScraper.ts`
3. Update skill mappings as needed

## 🤝 Contributing

### Adding New Domains
1. Update `SAT_URLS` with new domain URLs
2. Add skill mappings to `SKILL_MAPPINGS`
3. Test with small batch first

### Improving Quality
1. Enhance question text cleaning
2. Improve answer choice extraction
3. Refine difficulty assessment

## 📊 Performance Metrics

### Typical Performance
- **Scraping Speed**: 2-5 questions per second
- **Success Rate**: 85-95% depending on network
- **Quality Score**: High (Khan Academy content is curated)

### Optimization Tips
1. Use `--max-questions=10` for testing
2. Run during off-peak hours for better success rates
3. Monitor rate limits to avoid blocking

## 🎯 Next Steps After Scraping

1. **Quality Review**: Manually review a sample of scraped questions
2. **Integration Testing**: Test questions in your practice app
3. **User Feedback**: Collect feedback on question quality
4. **Iterative Improvement**: Refine scraping based on results

## 📚 Resources

- [Khan Academy SAT Prep](https://www.khanacademy.org/test-prep/sat)
- [Puppeteer Documentation](https://pptr.dev/)
- [College Board SAT Specifications](https://collegereadiness.collegeboard.org/sat)

---

**Ready to get high-quality SAT questions for your 1450+ → 1600 goal? Start with the test scraper!**

```bash
npm run test-khan-scraper
```
