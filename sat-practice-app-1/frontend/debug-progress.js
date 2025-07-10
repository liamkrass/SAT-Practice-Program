// Debug script to analyze localStorage and progress counting
console.log('=== DEBUG PROGRESS COUNTING ===');

// Check localStorage contents
const legacy = localStorage.getItem('answeredQuestions');
const detailed = localStorage.getItem('answeredQuestionsDetailed');

console.log('1. Raw localStorage data:');
console.log('  - answeredQuestions:', legacy);
console.log('  - answeredQuestionsDetailed:', detailed);

// Parse and analyze
if (legacy) {
    try {
        const legacyParsed = JSON.parse(legacy);
        console.log('2. Legacy parsed:', legacyParsed);
        console.log('   Count:', legacyParsed.length);
        console.log('   Unique IDs:', [...new Set(legacyParsed)]);
        console.log('   Duplicates:', legacyParsed.length - [...new Set(legacyParsed)].length);
    } catch (e) {
        console.error('Error parsing legacy:', e);
    }
}

if (detailed) {
    try {
        const detailedParsed = JSON.parse(detailed);
        console.log('3. Detailed parsed:', detailedParsed);
        console.log('   Count:', detailedParsed.length);
        
        // Analyze the detailed data
        const ids = detailedParsed.map(item => item.id);
        const uniqueIds = [...new Set(ids)];
        console.log('   Unique question IDs:', uniqueIds);
        console.log('   Duplicate entries:', ids.length - uniqueIds.length);
        
        // Check answers
        detailedParsed.forEach((item, i) => {
            console.log(`   Entry ${i}: ID=${item.id}, Answer="${item.answer}", Time=${new Date(item.timestamp).toLocaleString()}`);
        });
        
        // Build the map
        const map = {};
        detailedParsed.forEach(item => {
            map[item.id] = item.answer;
        });
        console.log('4. Generated map:', map);
        console.log('   Map keys:', Object.keys(map));
        console.log('   Map size:', Object.keys(map).length);
        
    } catch (e) {
        console.error('Error parsing detailed:', e);
    }
}

console.log('=== END DEBUG ===');
