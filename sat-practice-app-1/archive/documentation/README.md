# SAT Practice App

## Overview
The SAT Practice App is designed to help students prepare for the SAT by providing practice questions and scoring feedback. The application extracts questions from two PDFs, "Big SAT Math" and "Big SAT Verbal," and offers a scoring system that breaks down performance by category and skill.

## Features
- **Question Extraction**: Automatically extracts questions, categories, and skills from provided PDF files.
- **Graph Interpretation**: Processes visual data from graphs and generates new graphs for better understanding.
- **Scoring System**: Calculates overall scores and detailed scores for math and verbal categories, breaking down performance by specific skills.
- **User-Friendly Interface**: Built with React for a responsive and interactive user experience.

## Project Structure
```
sat-practice-app
├── backend
│   ├── src
│   │   ├── app.ts
│   │   ├── controllers
│   │   │   ├── questionsController.ts
│   │   │   └── scoringController.ts
│   │   ├── routes
│   │   │   ├── questions.ts
│   │   │   └── scoring.ts
│   │   ├── services
│   │   │   ├── pdfExtractor.ts
│   │   │   ├── graphInterpreter.ts
│   │   │   └── scoringService.ts
│   │   └── types
│   │       └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
├── frontend
│   ├── src
│   │   ├── App.tsx
│   │   ├── components
│   │   │   ├── QuestionDisplay.tsx
│   │   │   ├── ScoreSummary.tsx
│   │   │   └── SkillBreakdown.tsx
│   │   ├── plugins
│   │   │   └── GraphGenerator.tsx
│   │   ├── pages
│   │   │   ├── Home.tsx
│   │   │   └── Results.tsx
│   │   └── types
│   │       └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── README.md
└── README.md
```

## Setup Instructions
1. **Clone the Repository**: 
   ```
   git clone <repository-url>
   cd sat-practice-app
   ```

2. **Backend Setup**:
   - Navigate to the backend directory:
     ```
     cd backend
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Start the backend server:
     ```
     npm start
     ```

3. **Frontend Setup**:
   - Open a new terminal and navigate to the frontend directory:
     ```
     cd frontend
     ```
   - Install dependencies:
     ```
     npm install
     ```
   - Start the frontend application:
     ```
     npm start
     ```

## Technologies Used
- **Backend**: Node.js, Express, TypeScript
- **Frontend**: React, TypeScript
- **Data Processing**: PDF extraction and graph interpretation libraries

## Contribution
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.