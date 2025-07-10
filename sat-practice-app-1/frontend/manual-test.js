// Manual testing procedure for progress counting
// 1. Go to http://localhost:3000/practice
// 2. Open browser console (F12)
// 3. Run this script step by step

console.log('=== MANUAL PROGRESS TESTING ===');

// Step 1: Clear all progress to start fresh
function clearAllProgress() {
    localStorage.removeItem('answeredQuestions');
    localStorage.removeItem('answeredQuestionsDetailed');
    console.log('✅ Cleared all progress');
    location.reload(); // Refresh to see clean state
}

// Step 2: Check current state
function checkCurrentState() {
    const legacy = JSON.parse(localStorage.getItem('answeredQuestions') || '[]');
    const detailed = JSON.parse(localStorage.getItem('answeredQuestionsDetailed') || '[]');
    
    console.log('Current state:');
    console.log('- Legacy count:', legacy.length);
    console.log('- Detailed count:', detailed.length);
    console.log('- Legacy IDs:', legacy);
    console.log('- Detailed items:', detailed);
    
    return { legacy, detailed };
}

// Step 3: Simulate answering questions manually
function simulateAnswer(questionId, answer) {
    // Import the storage function
    const storage = window.progressStorage || {
        saveAnsweredQuestion: function(id, ans) {
            // Manual simulation
            const legacy = JSON.parse(localStorage.getItem('answeredQuestions') || '[]');
            if (!legacy.includes(id)) {
                legacy.push(id);
                localStorage.setItem('answeredQuestions', JSON.stringify(legacy));
            }
            
            const detailed = JSON.parse(localStorage.getItem('answeredQuestionsDetailed') || '[]');
            const existing = detailed.findIndex(item => item.id === id);
            const newItem = { id, answer: ans, timestamp: Date.now() };
            
            if (existing >= 0) {
                detailed[existing] = newItem;
            } else {
                detailed.push(newItem);
            }
            
            localStorage.setItem('answeredQuestionsDetailed', JSON.stringify(detailed));
            console.log(`📝 Simulated answer: ${id} = "${ans}"`);
        }
    };
    
    storage.saveAnsweredQuestion(questionId, answer);
}

// Instructions for manual testing:
console.log('🔧 Manual Testing Instructions:');
console.log('1. Run: clearAllProgress() - to start fresh');
console.log('2. Answer a few questions manually using the UI');
console.log('3. Run: checkCurrentState() - to see storage');
console.log('4. Check the performance dropdown to see displayed count');
console.log('5. Compare expected vs actual counts');

// Export functions to global scope for easy access
window.clearAllProgress = clearAllProgress;
window.checkCurrentState = checkCurrentState;
window.simulateAnswer = simulateAnswer;
