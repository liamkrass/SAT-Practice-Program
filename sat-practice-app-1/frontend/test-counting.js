// Test script to validate progress counting
// Run this in the browser console on the practice page

function testProgressCounting() {
    console.clear();
    console.log('=== PROGRESS COUNTING TEST ===');
    
    // Get the current state
    const legacy = JSON.parse(localStorage.getItem('answeredQuestions') || '[]');
    const detailed = JSON.parse(localStorage.getItem('answeredQuestionsDetailed') || '[]');
    
    console.log('1. Current state:');
    console.log('   Legacy count:', legacy.length);
    console.log('   Detailed count:', detailed.length);
    console.log('   Legacy IDs:', legacy);
    console.log('   Detailed entries:', detailed);
    
    // Check for duplicates in detailed
    const detailedIds = detailed.map(item => item.id);
    const uniqueDetailedIds = [...new Set(detailedIds)];
    
    console.log('2. Duplicate analysis:');
    console.log('   Detailed IDs:', detailedIds);
    console.log('   Unique detailed IDs:', uniqueDetailedIds);
    console.log('   Duplicates found:', detailedIds.length - uniqueDetailedIds.length);
    
    // Simulate what the performance tracker should see
    const map = {};
    detailed.forEach(item => {
        map[item.id] = item.answer;
    });
    
    console.log('3. Generated map (what performance tracker uses):');
    console.log('   Map:', map);
    console.log('   Map size:', Object.keys(map).length);
    
    // Expected vs actual
    console.log('4. Expected behavior:');
    console.log('   Expected count should equal unique detailed IDs:', uniqueDetailedIds.length);
    console.log('   Actual map size:', Object.keys(map).length);
    console.log('   Match:', uniqueDetailedIds.length === Object.keys(map).length ? '✅' : '❌');
    
    return {
        legacy: legacy.length,
        detailed: detailed.length,
        unique: uniqueDetailedIds.length,
        mapSize: Object.keys(map).length
    };
}

// Run the test
const result = testProgressCounting();
console.log('Test result:', result);
