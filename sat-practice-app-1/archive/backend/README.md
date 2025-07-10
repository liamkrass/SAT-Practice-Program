# SAT Practice App Backend

## Overview
The SAT Practice App is designed to help users prepare for the SAT by providing practice questions and scoring feedback. The backend of the application is built using TypeScript and Express, and it handles the extraction of questions from PDF files, scoring logic, and data management.

## Features
- Extracts questions from "Big SAT Math" and "Big SAT Verbal" PDFs.
- Categorizes questions by type and skill level.
- Interprets visual data from graphs and generates new graphs.
- Provides a scoring system that displays overall scores and detailed scores for math and verbal categories.
- Breaks down performance by specific skills.

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
```

## Setup Instructions
1. Clone the repository:
   ```
   git clone <repository-url>
   ```
2. Navigate to the backend directory:
   ```
   cd sat-practice-app/backend
   ```
3. Install dependencies:
   ```
   npm install
   ```
4. Run the application:
   ```
   npm start
   ```

## API Endpoints
- **Questions**
  - `GET /api/questions`: Fetches a list of questions.
  
- **Scoring**
  - `POST /api/scoring`: Submits answers and retrieves scores.

## Contributing
Contributions are welcome! Please submit a pull request or open an issue for any enhancements or bug fixes.

## License
This project is licensed under the MIT License.