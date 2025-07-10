# SAT Practice App

A React-based SAT practice application with 276 authentic SAT math questions sourced from College Board materials.

## Project Structure

```
satProjectV2/
├── sat-practice-app-1/           # Main application
│   ├── frontend/                 # React frontend application
│   │   ├── src/
│   │   │   ├── components/       # React components
│   │   │   ├── data/            # Question data (mathQuestions.ts, satQuestions.ts)
│   │   │   ├── pages/           # Page components
│   │   │   ├── styles/          # Typography and styling
│   │   │   └── utils/           # Utility functions
│   │   ├── public/              # Static assets
│   │   └── package.json         # Dependencies
│   └── archive/                 # Archived files and documentation
├── bigSatMath.pdf              # Source material
├── bigSatverbal.pdf            # Source material
└── MathQuestionSat.txt         # Extracted questions text
```

## Features

- **276 Authentic SAT Questions**: Sourced from official College Board materials
- **Domain Filtering**: Filter questions by math domains (Algebra, Geometry, Advanced Math, etc.)
- **Visual Elements**: Questions include graphs, tables, and diagrams
- **Progress Tracking**: Track answers and performance by domain/skill
- **Modern UI**: Clean, responsive interface with typography system

## Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd sat-practice-app-1/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view the app.

## Question Data

The app uses two main data files:

- **`mathQuestions.ts`**: Contains all 276 SAT math questions with metadata
- **`satQuestions.ts`**: Main export that provides filtered/shuffled questions to the app

Questions include:
- Text content
- Multiple choice options
- Correct answers
- Domain/skill categorization
- Difficulty levels
- Visual elements (graphs, tables, diagrams)

## Architecture

- **Frontend**: React + TypeScript
- **Styling**: Custom typography system with modern design
- **Data Management**: Static question data with TypeScript interfaces
- **State Management**: React hooks for component state

## Development

### Key Components
- `Practice.tsx`: Main practice page with question display and filtering
- `QuestionDisplay.tsx`: Individual question rendering with visual elements
- `QuestionFilter.tsx`: Domain filtering interface
- `QuestionStats.tsx`: Statistics and progress tracking

### Data Structure
Each question follows this interface:
```typescript
interface Question {
  id: string;
  text: string;
  category: 'math' | 'verbal';
  domain: string;
  skill: string;
  difficulty: 'easy' | 'medium' | 'hard';
  options: string[];
  correctAnswer: string;
  visual?: string;
  visualElement?: VisualElement;
  source: string;
}
```

## Archive

Historical files, documentation, and unused code are stored in the `archive/` directory:
- `documentation/`: Development logs and completion summaries
- `unused-data/`: Old question data files
- `temp-scripts/`: Processing and migration scripts
- `old-backend/`: Previous backend implementation

## Contributing

1. Keep question data in `src/data/mathQuestions.ts`
2. Use the typography system from `src/styles/typography.ts`
3. Follow the existing component structure
4. Archive unused files rather than deleting them

## License

This project contains SAT questions sourced from College Board materials for educational purposes.
# SAT-Practice-Program
