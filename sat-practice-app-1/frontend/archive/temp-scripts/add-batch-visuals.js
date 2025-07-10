// Add remaining visual elements efficiently
const fs = require('fs');
const path = require('path');

const mathQuestionsPath = path.join(__dirname, 'src/data/mathQuestions.ts');
let content = fs.readFileSync(mathQuestionsPath, 'utf8');

// Array of visual element additions with unique identifiers
const additions = [
  {
    searchText: 'visual: "A table with two columns: Answer and Percent of tablet users. The data is: Always, 30.9%; Often, 36.8%; Rarely, 19.1%; Never, 13.2%.",\n    source: "College Board"',
    replacement: `visual: "A table with two columns: Answer and Percent of tablet users. The data is: Always, 30.9%; Often, 36.8%; Rarely, 19.1%; Never, 13.2%.",
    visualElement: {
      type: 'table',
      description: 'Survey response table',
      data: {
        headers: ['Answer', 'Percent of tablet users'],
        rows: [
          ['Always', '30.9%'],
          ['Often', '36.8%'],
          ['Rarely', '19.1%'],
          ['Never', '13.2%']
        ]
      }
    },
    source: "College Board"`
  },
  {
    searchText: 'visual: "A scatterplot with \\"Number of male students (millions)\\" on the x-axis and \\"Number of female students (millions)\\" on the y-axis. The data points show a positive correlation. A line of best fit is drawn.",\n    source: "College Board"',
    replacement: `visual: "A scatterplot with \\"Number of male students (millions)\\" on the x-axis and \\"Number of female students (millions)\\" on the y-axis. The data points show a positive correlation. A line of best fit is drawn.",
    visualElement: {
      type: 'graph',
      description: 'College enrollment scatterplot',
      svg: '<svg width="300" height="250" viewBox="0 0 300 250"><g stroke="#e5e7eb" stroke-width="1" fill="none"><line x1="50" y1="30" x2="50" y2="200"/><line x1="50" y1="200" x2="270" y2="200"/></g><g fill="#2563eb"><circle cx="80" cy="170" r="3"/><circle cx="100" cy="160" r="3"/><circle cx="120" cy="150" r="3"/><circle cx="140" cy="140" r="3"/><circle cx="160" cy="130" r="3"/><circle cx="180" cy="120" r="3"/><circle cx="200" cy="110" r="3"/><circle cx="220" cy="100" r="3"/></g><g stroke="#f59e0b" stroke-width="2" fill="none"><line x1="70" y1="175" x2="230" y2="95"/></g><g fill="#333" font-size="12" font-family="Arial"><text x="120" y="230">Male students (millions)</text><text x="10" y="120" transform="rotate(-90 10,120)">Female students (millions)</text></g></svg>'
    },
    source: "College Board"`
  },
  {
    searchText: 'visual: "A box with the text \\"1 decagram = 10 grams, 1,000 milligrams = 1 gram\\".",\n    source: "College Board"',
    replacement: `visual: "A box with the text \\"1 decagram = 10 grams, 1,000 milligrams = 1 gram\\".",
    visualElement: {
      type: 'diagram',
      description: 'Unit conversion reference box',
      svg: '<svg width="280" height="80" viewBox="0 0 280 80"><g stroke="#333" stroke-width="1" fill="#f8fafc"><rect x="10" y="10" width="260" height="60" rx="5"/></g><g fill="#333" font-size="14" font-family="Arial"><text x="20" y="30">1 decagram = 10 grams</text><text x="20" y="50">1,000 milligrams = 1 gram</text></g></svg>'
    },
    source: "College Board"`
  },
  {
    searchText: 'visual: "A bar chart showing the number of installations in 5 cities (A, B, C, D, E). The y-axis is unlabeled. The bar for City A goes up to 9, B to 5, C to 6, D to 4, and E to 3.5.",\n    source: "College Board"',
    replacement: `visual: "A bar chart showing the number of installations in 5 cities (A, B, C, D, E). The y-axis is unlabeled. The bar for City A goes up to 9, B to 5, C to 6, D to 4, and E to 3.5.",
    visualElement: {
      type: 'chart',
      description: 'Solar panel installations bar chart',
      svg: '<svg width="300" height="200" viewBox="0 0 300 200"><g stroke="#e5e7eb" stroke-width="1" fill="none"><line x1="50" y1="20" x2="50" y2="180"/><line x1="50" y1="180" x2="270" y2="180"/></g><g fill="#2563eb" stroke="#333" stroke-width="1"><rect x="70" y="40" width="30" height="140"/><rect x="110" y="100" width="30" height="80"/><rect x="150" y="84" width="30" height="96"/><rect x="190" y="116" width="30" height="64"/><rect x="230" y="124" width="30" height="56"/></g><g fill="#333" font-size="12" font-family="Arial"><text x="82" y="195">A</text><text x="122" y="195">B</text><text x="162" y="195">C</text><text x="202" y="195">D</text><text x="242" y="195">E</text></g></svg>'
    },
    source: "College Board"`
  }
];

let changesCount = 0;

// Apply each addition
for (const addition of additions) {
  const beforeLength = content.length;
  content = content.replace(addition.searchText, addition.replacement);
  if (content.length !== beforeLength) {
    changesCount++;
    console.log(`Added visual element for ${addition.searchText.substring(0, 50)}...`);
  }
}

// Write back the updated content
if (changesCount > 0) {
  fs.writeFileSync(mathQuestionsPath, content);
  console.log(`Successfully added ${changesCount} visual elements in this batch!`);
} else {
  console.log('No visual elements were added in this batch.');
}

// Final count
const finalVisualElementMatches = content.match(/visualElement: \{/g);
console.log(`Total visual elements now: ${finalVisualElementMatches ? finalVisualElementMatches.length : 0}`);
