// Debug script to test localStorage progress storage
// Run this in browser console to test progress storage

function testProgressStorage() {
  console.log('=== TESTING PROGRESS STORAGE ===');
  
  // Clear existing progress
  localStorage.removeItem('answeredQuestions');
  localStorage.removeItem('answeredQuestionsDetailed');
  console.log('1. Cleared localStorage');
  
  // Simulate saving some answers
  const testAnswers = [
    { id: 'math_1', answer: 'A) Test Answer 1' },
    { id: 'math_2', answer: 'B) Test Answer 2' },
    { id: 'math_3', answer: 'C) Test Answer 3' }
  ];
  
  // Save to detailed format manually
  const detailed = testAnswers.map(item => ({
    id: item.id,
    answer: item.answer,
    timestamp: Date.now()
  }));
  
  localStorage.setItem('answeredQuestionsDetailed', JSON.stringify(detailed));
  localStorage.setItem('answeredQuestions', JSON.stringify(testAnswers.map(item => item.id)));
  
  console.log('2. Saved test data to localStorage');
  
  // Read back
  const storedDetailed = JSON.parse(localStorage.getItem('answeredQuestionsDetailed') || '[]');
  const storedLegacy = JSON.parse(localStorage.getItem('answeredQuestions') || '[]');
  
  console.log('3. Read back detailed:', storedDetailed);
  console.log('4. Read back legacy:', storedLegacy);
  
  // Create map
  const map = {};
  storedDetailed.forEach(item => {
    map[item.id] = item.answer;
  });
  
  console.log('5. Created map:', map);
  console.log('6. Map has correct number of items:', Object.keys(map).length === 3);
  
  return { detailed: storedDetailed, legacy: storedLegacy, map };
}

// Call this function in browser console to test
window.testProgressStorage = testProgressStorage;
console.log('Progress storage test function loaded. Call testProgressStorage() to run test.');
