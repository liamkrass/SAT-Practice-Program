// Test script to verify progress storage functionality
import { saveAnsweredQuestion, getAnsweredQuestions, getAnsweredQuestionsDetailed, getAnsweredQuestionsMap, clearProgress } from './progressStorage';

export const testProgressStorage = () => {
  console.log('Testing progress storage...');
  
  // Clear any existing progress
  clearProgress();
  console.log('1. Cleared progress');
  
  // Save some test answers
  saveAnsweredQuestion('test_1', 'A) Option A');
  saveAnsweredQuestion('test_2', 'B) Option B'); 
  saveAnsweredQuestion('test_3', 'C) Option C');
  console.log('2. Saved test answers');
  
  // Check legacy format
  const answeredIds = getAnsweredQuestions();
  console.log('3. Answered IDs (legacy):', answeredIds);
  
  // Check detailed format
  const detailedAnswers = getAnsweredQuestionsDetailed();
  console.log('4. Detailed answers:', detailedAnswers);
  
  // Check map format
  const answersMap = getAnsweredQuestionsMap();
  console.log('5. Answers map:', answersMap);
  
  // Verify the data matches
  const expectedIds = ['test_1', 'test_2', 'test_3'];
  const idsMatch = JSON.stringify(answeredIds.sort()) === JSON.stringify(expectedIds.sort());
  console.log('6. IDs match expected:', idsMatch);
  
  const hasAllAnswers = expectedIds.every(id => answersMap[id] !== undefined);
  console.log('7. All answers present in map:', hasAllAnswers);
  
  console.log('Progress storage test complete!');
  return { answeredIds, detailedAnswers, answersMap, idsMatch, hasAllAnswers };
};

export default testProgressStorage;
