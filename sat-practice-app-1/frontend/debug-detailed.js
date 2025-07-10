// Test script to debug localStorage and see actual data
// Run this in browser console

function debugProgressCounting() {
    console.clear();
    console.log('=== DETAILED PROGRESS DEBUG ===');
    
    // 1. Check localStorage raw data
    const legacyRaw = localStorage.getItem('answeredQuestions');
    const detailedRaw = localStorage.getItem('answeredQuestionsDetailed');
    
    console.log('1. Raw localStorage:');
    console.log('   Legacy:', legacyRaw);
    console.log('   Detailed:', detailedRaw);
    
    // 2. Parse data
    let legacyData = [];
    let detailedData = [];
    
    if (legacyRaw) {
        try {
            legacyData = JSON.parse(legacyRaw);
            console.log('2. Parsed Legacy Data:', legacyData);
            console.log('   Count:', legacyData.length);
            console.log('   Unique:', [...new Set(legacyData)].length);
        } catch (e) {
            console.error('   Error parsing legacy:', e);
        }
    }
    
    if (detailedRaw) {
        try {
            detailedData = JSON.parse(detailedRaw);
            console.log('3. Parsed Detailed Data:', detailedData);
            console.log('   Count:', detailedData.length);
            
            // Group by ID to find duplicates
            const byId = {};
            detailedData.forEach((item, index) => {
                if (!byId[item.id]) {
                    byId[item.id] = [];
                }
                byId[item.id].push({ index, item });
            });
            
            console.log('4. Analysis by ID:');
            Object.keys(byId).forEach(id => {
                const entries = byId[id];
                console.log(`   ${id}: ${entries.length} entries`);
                if (entries.length > 1) {
                    console.log('     DUPLICATE DETECTED!');
                    entries.forEach((entry, i) => {
                        console.log(`       ${i}: "${entry.item.answer}" at ${new Date(entry.item.timestamp).toLocaleString()}`);
                    });
                }
            });
            
            // Build map
            const map = {};
            detailedData.forEach(item => {
                map[item.id] = item.answer;
            });
            
            console.log('5. Generated Map:');
            console.log('   Map:', map);
            console.log('   Keys:', Object.keys(map));
            console.log('   Count:', Object.keys(map).length);
            
        } catch (e) {
            console.error('   Error parsing detailed:', e);
        }
    }
    
    // 3. Compare with legacy format
    if (legacyData.length !== Object.keys(detailedData.reduce((map, item) => ({ ...map, [item.id]: item.answer }), {})).length) {
        console.warn('6. MISMATCH DETECTED!');
        console.log('   Legacy count:', legacyData.length);
        console.log('   Detailed unique count:', Object.keys(detailedData.reduce((map, item) => ({ ...map, [item.id]: item.answer }), {})).length);
    }
    
    return { legacyData, detailedData };
}

// Run the debug
debugProgressCounting();
