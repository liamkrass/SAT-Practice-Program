# SAT Question Extraction Guide

## Current Status
✅ **Complete**: Basic SAT question system with curated questions
🔄 **In Progress**: PDF extraction from bigSatMath.pdf and bigSatverbal.pdf  
📋 **Next Steps**: Manual question extraction and categorization

## Current Question Bank Summary
- **Total Questions**: 16 (Math: 9, Verbal: 7)
- **Math Domains**: Algebra, Geometry, Statistics
- **Verbal Domains**: Reading Comprehension, Vocabulary, Grammar

## Manual Extraction Process

### For Math Questions (bigSatMath.pdf):
1. **Algebra Domain**:
   - Linear equations
   - Quadratic equations
   - Systems of equations
   - Polynomial operations
   - Function evaluation

2. **Geometry Domain**:
   - Area and volume calculations
   - Pythagorean theorem
   - Coordinate geometry
   - Angle relationships
   - Similar triangles

3. **Statistics Domain**:
   - Mean, median, mode
   - Probability
   - Data interpretation
   - Scatter plots

### For Verbal Questions (bigSatverbal.pdf):
1. **Reading Comprehension Domain**:
   - Main idea identification
   - Author's purpose
   - Inference questions
   - Text analysis

2. **Vocabulary Domain**:
   - Context clues
   - Word meaning
   - Synonyms and antonyms

3. **Grammar Domain**:
   - Sentence structure
   - Punctuation
   - Subject-verb agreement
   - Parallelism

## Question Template

```typescript
{
  id: 'unique_id',
  text: 'Question text here',
  category: 'math' | 'verbal',
  domain: 'specific_domain',
  skill: 'specific_skill',
  difficulty: 'easy' | 'medium' | 'hard',
  options: ['A', 'B', 'C', 'D'],
  correctAnswer: 'correct_option',
  source: 'PDF_source'
}
```

## Files to Update

### Add Math Questions:
- Edit: `frontend/src/data/satQuestions.ts`
- Add to: `algebraQuestions`, `geometryQuestions`, or `statisticsQuestions` arrays

### Add Verbal Questions:
- Edit: `frontend/src/data/satQuestions.ts`
- Add to: `readingComprehensionQuestions`, `vocabularyQuestions`, or `grammarQuestions` arrays

## Features Implemented

### 1. Enhanced Question Interface
- Added `domain`, `difficulty`, and `source` fields
- Maintains backward compatibility

### 2. Practice Mode Filtering
- All questions (mixed practice)
- Math-only practice
- Verbal-only practice
- Question counter shows current domain

### 3. Modern UI Components
- Updated QuestionDisplay with outlines and better visibility
- Category selection buttons
- Progress tracking
- Domain indicators

### 4. Home Page Enhancements
- Question bank statistics
- Domain breakdown
- Modern, card-based layout

### 5. Utility Functions
- `getQuestionsByCategory()`
- `getQuestionsBySkill()`
- `getQuestionsByDomain()`
- `getQuestionsByDifficulty()`
- `getRandomQuestions()`

## Next Steps for PDF Extraction

1. **Manual Review**: Open the PDF files and identify question patterns
2. **Categorize**: Group questions by domain and skill
3. **Extract**: Copy questions into the appropriate arrays in `satQuestions.ts`
4. **Test**: Verify questions work correctly in the practice interface
5. **Expand**: Add more domains and skills as needed

## Current File Structure

```
frontend/src/data/
├── satQuestions.ts       # Main question database
└── exampleQuestions.ts   # Legacy compatibility (redirects to satQuestions)

frontend/src/pages/
├── Home.tsx             # Enhanced homepage with stats
└── Practice.tsx         # Practice mode with filtering

frontend/src/components/
└── QuestionDisplay.tsx  # Modern question UI with outlines
```

## Testing

Visit `http://localhost:3000` to see:
- ✅ Enhanced homepage with question statistics
- ✅ Practice mode with category filtering
- ✅ Modern question display with better visibility
- ✅ Domain and skill tracking
- ✅ Results summary with detailed breakdowns

The system is now ready for systematic question expansion!
