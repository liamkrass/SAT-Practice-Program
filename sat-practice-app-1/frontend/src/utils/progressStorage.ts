// Utility for tracking answered questions and progress in localStorage

interface AnsweredQuestion {
  id: string;
  answer: string;
  timestamp: number;
}

export const getAnsweredQuestions = (): string[] => {
  // Legacy format support
  const data = localStorage.getItem('answeredQuestions');
  return data ? JSON.parse(data) : [];
};

export const getAnsweredQuestionsDetailed = (): AnsweredQuestion[] => {
  const data = localStorage.getItem('answeredQuestionsDetailed');
  return data ? JSON.parse(data) : [];
};

export const getAnsweredQuestionsMap = (): { [id: string]: string } => {
  const detailed = getAnsweredQuestionsDetailed();
  const map: { [id: string]: string } = {};
  detailed.forEach(item => {
    map[item.id] = item.answer;
  });
  return map;
};

export const saveAnsweredQuestion = (id: string, answer?: string) => {
  console.log(`saveAnsweredQuestion called: id="${id}", answer="${answer}"`);
  
  // Save to legacy format for backward compatibility
  const answered = getAnsweredQuestions();
  if (!answered.includes(id)) {
    answered.push(id);
    localStorage.setItem('answeredQuestions', JSON.stringify(answered));
    console.log(`Added to legacy format. New count: ${answered.length}`);
  } else {
    console.log(`Already in legacy format. Count remains: ${answered.length}`);
  }
  
  // Save to detailed format for performance tracking
  if (answer) {
    const detailed = getAnsweredQuestionsDetailed();
    const existing = detailed.findIndex(item => item.id === id);
    const newItem: AnsweredQuestion = {
      id,
      answer,
      timestamp: Date.now()
    };
    
    if (existing >= 0) {
      console.log(`Updating existing entry at index ${existing}:`, detailed[existing], '->', newItem);
      detailed[existing] = newItem;
    } else {
      console.log(`Adding new entry:`, newItem);
      detailed.push(newItem);
    }
    
    localStorage.setItem('answeredQuestionsDetailed', JSON.stringify(detailed));
    console.log(`Detailed storage updated. New count: ${detailed.length}`);
    
    // Verify what we just saved
    const saved = JSON.parse(localStorage.getItem('answeredQuestionsDetailed') || '[]');
    console.log(`Verification - actually saved ${saved.length} items:`, saved.map((item: AnsweredQuestion) => `${item.id}="${item.answer}"`));
  }
};

export const clearProgress = () => {
  localStorage.removeItem('answeredQuestions');
  localStorage.removeItem('answeredQuestionsDetailed');
  console.log('Progress cleared: removed both answeredQuestions and answeredQuestionsDetailed');
};

export const debugProgress = () => {
  console.log('=== PROGRESS STORAGE DEBUG ===');
  const legacy = localStorage.getItem('answeredQuestions');
  const detailed = localStorage.getItem('answeredQuestionsDetailed');
  
  console.log('Legacy storage raw:', legacy);
  console.log('Detailed storage raw:', detailed);
  
  if (legacy) {
    try {
      const legacyParsed = JSON.parse(legacy);
      console.log('Legacy parsed:', legacyParsed);
      console.log('Legacy count:', legacyParsed.length);
    } catch (e) {
      console.error('Error parsing legacy:', e);
    }
  }
  
  if (detailed) {
    try {
      const detailedParsed = JSON.parse(detailed);
      console.log('Detailed parsed:', detailedParsed);
      console.log('Detailed count:', detailedParsed.length);
    } catch (e) {
      console.error('Error parsing detailed:', e);
    }
  }
  
  const map = getAnsweredQuestionsMap();
  console.log('Generated map:', map);
  console.log('Map keys count:', Object.keys(map).length);
  
  return { legacy, detailed, map };
};

// Clean up any duplicate entries in detailed storage
export const cleanupDuplicates = () => {
  console.log('Starting cleanup of duplicate entries...');
  
  const detailed = getAnsweredQuestionsDetailed();
  console.log('Original count:', detailed.length);
  
  // Create a map to keep only the latest entry for each ID
  const latestEntries: { [id: string]: AnsweredQuestion } = {};
  
  detailed.forEach(item => {
    if (!latestEntries[item.id] || item.timestamp > latestEntries[item.id].timestamp) {
      latestEntries[item.id] = item;
    }
  });
  
  // Convert back to array
  const cleanedArray = Object.values(latestEntries);
  console.log('Cleaned count:', cleanedArray.length);
  console.log('Removed duplicates:', detailed.length - cleanedArray.length);
  
  if (cleanedArray.length !== detailed.length) {
    localStorage.setItem('answeredQuestionsDetailed', JSON.stringify(cleanedArray));
    console.log('Cleanup complete. Storage updated.');
    return { removed: detailed.length - cleanedArray.length, cleaned: cleanedArray };
  } else {
    console.log('No duplicates found.');
    return { removed: 0, cleaned: cleanedArray };
  }
};

// Verify the integrity of progress data
export const verifyProgressIntegrity = () => {
  console.log('=== PROGRESS INTEGRITY CHECK ===');
  
  const legacy = getAnsweredQuestions();
  const detailed = getAnsweredQuestionsDetailed();
  const map = getAnsweredQuestionsMap();
  
  console.log('1. Raw counts:');
  console.log('   Legacy:', legacy.length);
  console.log('   Detailed:', detailed.length);
  console.log('   Map:', Object.keys(map).length);
  
  // Check for duplicates in detailed
  const detailedIds = detailed.map(item => item.id);
  const uniqueDetailedIds = Array.from(new Set(detailedIds));
  const duplicatesCount = detailedIds.length - uniqueDetailedIds.length;
  
  console.log('2. Duplicate analysis:');
  console.log('   Detailed entries:', detailedIds.length);
  console.log('   Unique IDs:', uniqueDetailedIds.length);
  console.log('   Duplicates:', duplicatesCount);
  
  if (duplicatesCount > 0) {
    console.warn('⚠️  DUPLICATES DETECTED!');
    // Find which IDs are duplicated
    const counts: { [id: string]: number } = {};
    detailedIds.forEach(id => {
      counts[id] = (counts[id] || 0) + 1;
    });
    Object.entries(counts).forEach(([id, count]) => {
      if (count > 1) {
        console.log(`   ${id}: ${count} times`);
      }
    });
  }
  
  // Check consistency between formats
  console.log('3. Consistency check:');
  const expectedMapSize = uniqueDetailedIds.length;
  const actualMapSize = Object.keys(map).length;
  
  if (expectedMapSize === actualMapSize) {
    console.log('   ✅ Map size matches unique detailed entries');
  } else {
    console.error(`   ❌ Map size mismatch: expected ${expectedMapSize}, got ${actualMapSize}`);
  }
  
  return {
    legacy: legacy.length,
    detailed: detailed.length,
    unique: uniqueDetailedIds.length,
    map: actualMapSize,
    duplicates: duplicatesCount,
    isConsistent: expectedMapSize === actualMapSize
  };
};
