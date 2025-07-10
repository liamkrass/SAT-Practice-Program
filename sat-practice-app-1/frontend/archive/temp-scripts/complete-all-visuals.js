// Complete all remaining visual elements
const fs = require('fs');
const path = require('path');

const mathQuestionsPath = path.join(__dirname, 'src/data/mathQuestions.ts');
let content = fs.readFileSync(mathQuestionsPath, 'utf8');

// Define all remaining visual element implementations
const visualElements = {
  // Duplicate polynomial tables
  'A table with two columns, x and p(x). The rows contain the following pairs of values: (-2, 0), (-1, 4), (0, 5), (1, 3), (2, 0).': {
    type: 'table',
    description: 'Polynomial function values table',
    data: {
      headers: ['x', 'p(x)'],
      rows: [
        ['-2', '0'],
        ['-1', '4'],
        ['0', '5'],
        ['1', '3'],
        ['2', '0']
      ]
    }
  },

  // Duplicate coordinate tables
  'A table with two columns, x and y. The rows contain the following pairs of values: (8, 2), (12, 2), (10, -2).': {
    type: 'table',
    description: 'Coordinate data table',
    data: {
      headers: ['x', 'y'],
      rows: [
        ['8', '2'],
        ['12', '2'],
        ['10', '-2']
      ]
    }
  },

  // Duplicate parallel lines diagrams
  'A diagram showing two parallel horizontal lines, l and m. Two transversals, t and u, intersect the parallel lines and each other. The angle labeled x is an interior angle formed by lines l and t. The angle labeled y is an interior angle formed by lines m and u. The angle labeled z is in the triangle formed by the intersection of l, t, and u.': {
    type: 'diagram',
    description: 'Parallel lines with transversals diagram',
    svg: '<svg width="300" height="200" viewBox="0 0 300 200"><g stroke="#333" stroke-width="2" fill="none"><line x1="20" y1="60" x2="280" y2="60" stroke="#2563eb"/><line x1="20" y1="140" x2="280" y2="140" stroke="#2563eb"/><line x1="80" y1="20" x2="140" y2="180" stroke="#f59e0b"/><line x1="160" y1="20" x2="220" y2="180" stroke="#10b981"/></g><g fill="#333" font-size="14" font-family="Arial"><text x="25" y="55">l</text><text x="25" y="135">m</text><text x="75" y="15">t</text><text x="155" y="15">u</text><text x="95" y="45">x</text><text x="185" y="125">y</text><text x="125" y="85">z</text></g></svg>'
  },

  // Duplicate triangle diagrams
  'A triangle RST with a point U on side RS. A line segment connects T and U. Angle R is 26 degrees. Angle TSU is 52 degrees. Angle RTU is x degrees.': {
    type: 'diagram',
    description: 'Triangle with internal point and angles',
    svg: '<svg width="280" height="200" viewBox="0 0 280 200"><g stroke="#333" stroke-width="2" fill="none"><polygon points="40,160 240,160 140,40" stroke="#2563eb"/><line x1="120,150" x2="140,40" stroke="#f59e0b"/></g><g fill="#333" font-size="12" font-family="Arial"><text x="35" y="175">R</text><text x="245" y="175">S</text><text x="135" y="30">T</text><text x="115" y="175">U</text><text x="50" y="145">26°</text><text x="210" y="145">52°</text><text x="125" y="65">x°</text></g></svg>'
  },

  // Duplicate linear function graphs
  'A graph of a function h(x) is shown. It passes through the points (-1, -2), (0, -1), (1, 0), (2, 1), (3, 2).': {
    type: 'graph',
    description: 'Linear function graph',
    data: {
      xRange: [-2, 4],
      yRange: [-3, 3],
      lines: [
        { points: [[-1, -2], [0, -1], [1, 0], [2, 1], [3, 2]], color: '#2563eb' }
      ]
    }
  },

  // Duplicate scatterplots
  'A scatterplot with "Hours of Study" on the x-axis and "Test Score" on the y-axis. A line of best fit is drawn through the data points. The y-intercept is at approximately 60.': {
    type: 'graph',
    description: 'Scatterplot with study hours vs test scores',
    svg: '<svg width="300" height="250" viewBox="0 0 300 250"><g stroke="#e5e7eb" stroke-width="1" fill="none"><line x1="50" y1="30" x2="50" y2="200"/><line x1="50" y1="200" x2="270" y2="200"/></g><g fill="#2563eb"><circle cx="70" cy="180" r="3"/><circle cx="90" cy="170" r="3"/><circle cx="110" cy="160" r="3"/><circle cx="130" cy="150" r="3"/><circle cx="150" cy="140" r="3"/><circle cx="170" cy="130" r="3"/><circle cx="190" cy="120" r="3"/><circle cx="210" cy="110" r="3"/><circle cx="230" cy="100" r="3"/><circle cx="250" cy="90" r="3"/></g><g stroke="#f59e0b" stroke-width="2" fill="none"><line x1="50" y1="185" x2="270" y2="85"/></g><g fill="#333" font-size="12" font-family="Arial"><text x="140" y="230">Hours of Study</text><text x="10" y="120" transform="rotate(-90 10,120)">Test Score</text><text x="45" y="190">60</text></g></svg>'
  },

  // Duplicate Venn diagram tables
  'A Venn diagram-style table. 12 people own a car only. 8 people own a bicycle only. 15 people own both. 5 people own neither.': {
    type: 'table',
    description: 'Venn diagram data table',
    data: {
      headers: ['Category', 'Count'],
      rows: [
        ['Car only', '12'],
        ['Bicycle only', '8'],
        ['Both car and bicycle', '15'],
        ['Neither', '5']
      ]
    }
  },

  // Survey response tables
  'A table with two columns: Answer and Percent of tablet users. The data is: Always, 30.9%; Often, 36.8%; Rarely, 19.1%; Never, 13.2%.': {
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

  // College enrollment scatterplots
  'A scatterplot with "Number of male students (millions)" on the x-axis and "Number of female students (millions)" on the y-axis. The data points show a positive correlation. A line of best fit is drawn.': {
    type: 'graph',
    description: 'College enrollment scatterplot',
    svg: '<svg width="300" height="250" viewBox="0 0 300 250"><g stroke="#e5e7eb" stroke-width="1" fill="none"><line x1="50" y1="30" x2="50" y2="200"/><line x1="50" y1="200" x2="270" y2="200"/></g><g fill="#2563eb"><circle cx="80" cy="170" r="3"/><circle cx="100" cy="160" r="3"/><circle cx="120" cy="150" r="3"/><circle cx="140" cy="140" r="3"/><circle cx="160" cy="130" r="3"/><circle cx="180" cy="120" r="3"/><circle cx="200" cy="110" r="3"/><circle cx="220" cy="100" r="3"/></g><g stroke="#f59e0b" stroke-width="2" fill="none"><line x1="70" y1="175" x2="230" y2="95"/></g><g fill="#333" font-size="12" font-family="Arial"><text x="120" y="230">Male students (millions)</text><text x="10" y="120" transform="rotate(-90 10,120)">Female students (millions)</text></g></svg>'
  },

  // Unit conversion boxes
  'A box with the text "1 decagram = 10 grams, 1,000 milligrams = 1 gram".': {
    type: 'diagram',
    description: 'Unit conversion reference box',
    svg: '<svg width="280" height="80" viewBox="0 0 280 80"><g stroke="#333" stroke-width="1" fill="#f8fafc"><rect x="10" y="10" width="260" height="60" rx="5"/></g><g fill="#333" font-size="14" font-family="Arial"><text x="20" y="30">1 decagram = 10 grams</text><text x="20" y="50">1,000 milligrams = 1 gram</text></g></svg>'
  },

  // Bar charts
  'A bar chart showing the number of installations in 5 cities (A, B, C, D, E). The y-axis is unlabeled. The bar for City A goes up to 9, B to 5, C to 6, D to 4, and E to 3.5.': {
    type: 'chart',
    description: 'Solar panel installations bar chart',
    svg: '<svg width="300" height="200" viewBox="0 0 300 200"><g stroke="#e5e7eb" stroke-width="1" fill="none"><line x1="50" y1="20" x2="50" y2="180"/><line x1="50" y1="180" x2="270" y2="180"/></g><g fill="#2563eb" stroke="#333" stroke-width="1"><rect x="70" y="40" width="30" height="140"/><rect x="110" y="100" width="30" height="80"/><rect x="150" y="84" width="30" height="96"/><rect x="190" y="116" width="30" height="64"/><rect x="230" y="124" width="30" height="56"/></g><g fill="#333" font-size="12" font-family="Arial"><text x="82" y="195">A</text><text x="122" y="195">B</text><text x="162" y="195">C</text><text x="202" y="195">D</text><text x="242" y="195">E</text></g></svg>'
  }
};

// Function to add visual element after a visual description
function addVisualElementToFirstOccurrence(content, visualDescription, element) {
  const pattern = new RegExp(`(visual: "${visualDescription.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}",)\\s*\\n(\\s*)(source: "College Board")`, 'g');
  
  let replacement;
  if (element.svg) {
    replacement = `$1
$2visualElement: {
$2  type: '${element.type}',
$2  description: '${element.description}',
$2  svg: '${element.svg}'
$2},
$2$3`;
  } else {
    replacement = `$1
$2visualElement: {
$2  type: '${element.type}',
$2  description: '${element.description}',
$2  data: ${JSON.stringify(element.data, null, 4).replace(/\n/g, '\n$2  ')}
$2},
$2$3`;
  }
  
  // Only replace the first occurrence
  return content.replace(pattern, replacement);
}

// Apply all visual elements
let updatedContent = content;
let changesCount = 0;

for (const [description, element] of Object.entries(visualElements)) {
  const beforeLength = updatedContent.length;
  updatedContent = addVisualElementToFirstOccurrence(updatedContent, description, element);
  if (updatedContent.length !== beforeLength) {
    changesCount++;
    console.log(`✅ Added visual element ${changesCount}: ${description.substring(0, 60)}...`);
  } else {
    console.log(`⚠️  Could not find: ${description.substring(0, 60)}...`);
  }
}

// Write back the updated content
if (changesCount > 0) {
  fs.writeFileSync(mathQuestionsPath, updatedContent);
  console.log(`\n🎉 Successfully added ${changesCount} new visual elements!`);
  
  // Final count
  const finalVisualElementMatches = updatedContent.match(/visualElement: \{/g);
  const finalVisualMatches = updatedContent.match(/visual: "/g);
  console.log(`\n📊 Final Status:`);
  console.log(`Total visual descriptions: ${finalVisualMatches ? finalVisualMatches.length : 0}`);
  console.log(`Total visual elements: ${finalVisualElementMatches ? finalVisualElementMatches.length : 0}`);
  console.log(`Completion rate: ${Math.round((finalVisualElementMatches.length / finalVisualMatches.length) * 100)}%`);
} else {
  console.log('\n❌ No new visual elements were added.');
}
