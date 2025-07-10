#!/usr/bin/env ts-node

import { KhanAcademyScraper } from '../services/khanAcademyScraper';

async function testKhanScraper() {
  console.log('🧪 Testing Khan Academy Scraper...\n');
  
  const scraper = new KhanAcademyScraper();
  
  try {
    // Initialize browser
    await scraper.initialize();
    console.log('✅ Browser initialized successfully');

    // Test scraping a small number of questions
    console.log('\n🔍 Testing question extraction...');
    const questions = await scraper.scrapeAllSATQuestions(5); // Only 5 questions for testing
    
    console.log(`\n📊 Test Results:`);
    console.log(`   Questions found: ${questions.length}`);
    console.log(`   Math questions: ${questions.filter(q => q.category === 'math').length}`);
    console.log(`   Verbal questions: ${questions.filter(q => q.category === 'verbal').length}`);
    
    if (questions.length > 0) {
      console.log('\n📝 Sample Question:');
      const sample = questions[0];
      console.log(`   ID: ${sample.id}`);
      console.log(`   Category: ${sample.category}`);
      console.log(`   Domain: ${sample.domain}`);
      console.log(`   Skill: ${sample.skill}`);
      console.log(`   Text: ${sample.text.substring(0, 100)}${sample.text.length > 100 ? '...' : ''}`);
      console.log(`   Options: ${sample.options.length} choices`);
      console.log(`   Difficulty: ${sample.difficulty}`);
    }

    // Test conversion to app format
    const appQuestions = scraper.convertToAppFormat(questions);
    console.log(`\n✅ Conversion successful: ${appQuestions.length} questions ready for app`);

    console.log('\n🎉 Test completed successfully!');
    
  } catch (error) {
    console.error('\n❌ Test failed:', error);
    throw error;
  } finally {
    await scraper.close();
  }
}

// Run test if called directly
if (require.main === module) {
  testKhanScraper()
    .then(() => {
      console.log('\n✅ All tests passed! Khan Academy scraper is ready to use.');
      process.exit(0);
    })
    .catch(error => {
      console.error('\n💥 Test failed:', error);
      process.exit(1);
    });
}

export { testKhanScraper };
