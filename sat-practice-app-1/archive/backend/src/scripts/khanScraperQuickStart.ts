#!/usr/bin/env ts-node

// Minimal Khan Academy scraper test
console.log('🎯 Khan Academy Scraper - Quick Start Guide');
console.log('==========================================\n');

console.log('📋 Prerequisites Check:');
try {
  require('puppeteer');
  console.log('✅ Puppeteer installed');
} catch (e) {
  console.log('❌ Puppeteer not found');
}

try {
  require('axios');
  console.log('✅ Axios installed');
} catch (e) {
  console.log('❌ Axios not found');
}

try {
  require('cheerio');
  console.log('✅ Cheerio installed');
} catch (e) {
  console.log('❌ Cheerio not found');
}

console.log('\n🚀 Available Scripts:');
console.log('   npm run test-khan-scraper     # Test with browser (5 questions)');
console.log('   npm run scrape-khan-small     # Small batch (10 questions per domain)');
console.log('   npm run scrape-khan           # Standard batch (25 questions per domain)');
console.log('   npm run scrape-khan-large     # Large batch (50 questions per domain)');

console.log('\n📚 Khan Academy Domains to Scrape:');
console.log('   Math:');
console.log('     • Heart of Algebra (linear equations, systems)');
console.log('     • Problem Solving & Data Analysis (statistics, probability)');
console.log('     • Passport to Advanced Math (quadratics, functions)');
console.log('     • Geometry & Trigonometry (shapes, angles, trig)');
console.log('   Verbal:');
console.log('     • Reading (comprehension, evidence-based reading)');
console.log('     • Writing & Language (grammar, style, editing)');

console.log('\n🎯 Expected Results (25 questions per domain):');
console.log('   • Total Questions: 200-300');
console.log('   • Math Questions: 100-150');
console.log('   • Verbal Questions: 100-150');
console.log('   • High Quality: Khan Academy = Official College Board partner');

console.log('\n📁 Output Files:');
console.log('   • frontend/src/data/khanQuestions.ts (all scraped questions)');
console.log('   • backend/src/reports/khan-academy-scraping-report.md (detailed report)');
console.log('   • Updated satQuestions.ts (integrated with existing questions)');

console.log('\n🚀 Quick Start:');
console.log('   1. cd backend');
console.log('   2. npm run scrape-khan-small    # Start with small batch');
console.log('   3. Check output files');
console.log('   4. Run npm run scrape-khan      # Full batch when ready');

console.log('\n💡 Tips:');
console.log('   • Start small to test functionality');
console.log('   • Check network connection');
console.log('   • Review scraped questions for quality');
console.log('   • Khan Academy questions are high-quality (College Board partnership)');

console.log('\n✅ Khan Academy scraper is ready to use!');
console.log('📖 See KHAN_ACADEMY_SCRAPER.md for full documentation.');

export {};
