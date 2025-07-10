// Quick test script to verify question filtering functionality
const { mathQuestions } = require('./data/mathQuestions.ts');

console.log('🎯 SAT Practice App - Question Database Test');
console.log('===========================================');

// Test 1: Total question count
console.log(`✅ Total questions imported: ${mathQuestions.length}`);

// Test 2: Domain distribution
const domainCounts = {};
mathQuestions.forEach(q => {
  domainCounts[q.domain] = (domainCounts[q.domain] || 0) + 1;
});

console.log('\n📊 Questions by Domain:');
Object.entries(domainCounts).forEach(([domain, count]) => {
  console.log(`   ${domain}: ${count} questions`);
});

// Test 3: Category distribution
const categoryCounts = {};
mathQuestions.forEach(q => {
  categoryCounts[q.category] = (categoryCounts[q.category] || 0) + 1;
});

console.log('\n📚 Questions by Category:');
Object.entries(categoryCounts).forEach(([category, count]) => {
  console.log(`   ${category}: ${count} questions`);
});

// Test 4: Difficulty distribution
const difficultyCounts = {};
mathQuestions.forEach(q => {
  difficultyCounts[q.difficulty] = (difficultyCounts[q.difficulty] || 0) + 1;
});

console.log('\n🎚️ Questions by Difficulty:');
Object.entries(difficultyCounts).forEach(([difficulty, count]) => {
  console.log(`   ${difficulty}: ${count} questions`);
});

// Test 5: Sample questions from each domain
console.log('\n🔍 Sample Questions from Each Domain:');
Object.keys(domainCounts).forEach(domain => {
  const sampleQuestion = mathQuestions.find(q => q.domain === domain);
  if (sampleQuestion) {
    console.log(`\n   ${domain}:`);
    console.log(`   ID: ${sampleQuestion.id}`);
    console.log(`   Text: ${sampleQuestion.text.substring(0, 100)}...`);
    console.log(`   Options: ${sampleQuestion.options.length} choices`);
    console.log(`   Answer: ${sampleQuestion.correctAnswer}`);
  }
});

// Test 6: Visual questions count
const visualQuestions = mathQuestions.filter(q => q.visual);
console.log(`\n🖼️ Questions with visual elements: ${visualQuestions.length}`);

console.log('\n✅ Question database test completed successfully!');
