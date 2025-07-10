// Complete visual elements implementation script
const fs = require('fs');
const path = require('path');

// Read the math questions file
const mathQuestionsPath = path.join(__dirname, 'src/data/mathQuestions.ts');
let content = fs.readFileSync(mathQuestionsPath, 'utf8');

// Check current status
const visualMatches = content.match(/visual: "([^"]+)"/g);
const visualElementMatches = content.match(/visualElement: \{/g);

console.log(`Found ${visualMatches ? visualMatches.length : 0} questions with visual descriptions`);
console.log(`Found ${visualElementMatches ? visualElementMatches.length : 0} questions with visualElement implementations`);

// Extract questions that have visual but no visualElement
const questionsWithVisual = [];
const questionsWithBoth = [];

if (visualMatches) {
  visualMatches.forEach((match, index) => {
    const visual = match.replace(/visual: "/, '').replace(/"$/, '');
    
    // Check if this visual description is followed by a visualElement
    const visualIndex = content.indexOf(match);
    const nextSourceIndex = content.indexOf('source:', visualIndex);
    const hasVisualElement = content.substring(visualIndex, nextSourceIndex).includes('visualElement:');
    
    if (hasVisualElement) {
      questionsWithBoth.push(visual);
    } else {
      questionsWithVisual.push(visual);
    }
  });
}

console.log(`\nQuestions missing visualElement: ${questionsWithVisual.length}`);
console.log(`Questions with both visual and visualElement: ${questionsWithBoth.length}`);

// Group missing visuals by type
const missingByType = {
  tables: [],
  graphs: [],
  triangles: [],
  cylinders: [],
  scatterplots: [],
  other: []
};

questionsWithVisual.forEach(visual => {
  if (visual.includes('table') || visual.includes('Table')) {
    missingByType.tables.push(visual);
  } else if (visual.includes('graph') || visual.includes('line') || visual.includes('parabola')) {
    missingByType.graphs.push(visual);
  } else if (visual.includes('triangle') || visual.includes('Triangle')) {
    missingByType.triangles.push(visual);
  } else if (visual.includes('cylinder') || visual.includes('cone') || visual.includes('silo')) {
    missingByType.cylinders.push(visual);
  } else if (visual.includes('scatterplot') || visual.includes('Scatterplot')) {
    missingByType.scatterplots.push(visual);
  } else {
    missingByType.other.push(visual);
  }
});

console.log('\nMissing by type:');
Object.entries(missingByType).forEach(([type, items]) => {
  if (items.length > 0) {
    console.log(`${type.toUpperCase()}: ${items.length}`);
    items.slice(0, 2).forEach(item => console.log(`  ${item.substring(0, 80)}...`));
  }
});

// Create visual element templates for ALL remaining patterns
const visualElements = {
  // Tables
  'A table with three columns: Property address, Purchase price (dollars), and Monthly rental price (dollars). The properties are Clearwater Lane (128,000, 950), Driftwood Drive (176,000, 1,310), Edgemont Street (70,000, 515), Glenview Street (140,000, 1,040), and Hamilton Circle (450,000, 3,365).': {
    type: 'table',
    description: 'Property investment table',
    data: {
      headers: ['Property Address', 'Purchase Price ($)', 'Monthly Rental Price ($)'],
      rows: [
        ['Clearwater Lane', '128,000', '950'],
        ['Driftwood Drive', '176,000', '1,310'],
        ['Edgemont Street', '70,000', '515'],
        ['Glenview Street', '140,000', '1,040'],
        ['Hamilton Circle', '450,000', '3,365']
      ]
    }
  },

  'A table with two columns, x and y. The rows contain the following pairs of values: (3, 7), (k, 11), (12, n).': {
    type: 'table',
    description: 'Coordinate table with variables',
    data: {
      headers: ['x', 'y'],
      rows: [
        ['3', '7'],
        ['k', '11'],
        ['12', 'n']
      ]
    }
  },

  'A table titled "Growth of a Culture of Bacteria" with two columns: Day, and Number of bacteria per milliliter at end of day. The rows are: Day 1, 2.5x10^5; Day 2, 5.0x10^5; Day 3, 1.0x10^6.': {
    type: 'table',
    description: 'Bacterial growth data table',
    data: {
      headers: ['Day', 'Number of bacteria per milliliter'],
      rows: [
        ['1', '2.5×10⁵'],
        ['2', '5.0×10⁵'],
        ['3', '1.0×10⁶']
      ]
    }
  },

  'A table with columns for Male and Female, and rows for Under age 40 and Age 40 or older. The data is: Male Under 40: 8, Female Under 40: 8, Male 40 or older: 2, Female 40 or older: 7.': {
    type: 'table',
    description: 'Demographics table',
    data: {
      headers: ['', 'Male', 'Female'],
      rows: [
        ['Under age 40', '8', '8'],
        ['Age 40 or older', '2', '7']
      ]
    }
  },

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

  // Triangles
  'A right triangle ABC with the right angle at C. The length of the hypotenuse AB is 26.': {
    type: 'diagram',
    description: 'Right triangle with hypotenuse labeled',
    svg: '<svg width="200" height="160" viewBox="0 0 200 160"><g stroke="#333" stroke-width="2" fill="none"><polygon points="20,140 140,140 140,60" stroke="#2563eb"/></g><g fill="#333" font-size="12" font-family="Arial"><text x="15" y="155">A</text><text x="145" y="155">C</text><text x="145" y="50">B</text><text x="70" y="90">26</text><rect x="130" y="130" width="10" height="10" fill="none" stroke="#333"/></g></svg>'
  },

  'A right triangle with angles x and y. The side opposite x is 16. The side opposite y is 23.': {
    type: 'diagram',
    description: 'Right triangle with angle labels and opposite sides',
    svg: '<svg width="200" height="160" viewBox="0 0 200 160"><g stroke="#333" stroke-width="2" fill="none"><polygon points="20,140 140,140 140,60" stroke="#2563eb"/></g><g fill="#333" font-size="12" font-family="Arial"><text x="25" y="130">x</text><text x="130" y="70">y</text><text x="150" y="100">16</text><text x="75" y="135">23</text><rect x="130" y="130" width="10" height="10" fill="none" stroke="#333"/></g></svg>'
  },

  // Scatterplots
  'A scatterplot with "Hours of Study" on the x-axis and "Test Score" on the y-axis. A line of best fit is drawn through the data points. The y-intercept is at approximately 60.': {
    type: 'graph',
    description: 'Scatterplot with study hours vs test scores',
    svg: '<svg width="300" height="250" viewBox="0 0 300 250"><g stroke="#e5e7eb" stroke-width="1" fill="none"><line x1="50" y1="30" x2="50" y2="200"/><line x1="50" y1="200" x2="270" y2="200"/></g><g fill="#2563eb"><circle cx="70" cy="180" r="3"/><circle cx="90" cy="170" r="3"/><circle cx="110" cy="160" r="3"/><circle cx="130" cy="150" r="3"/><circle cx="150" cy="140" r="3"/><circle cx="170" cy="130" r="3"/><circle cx="190" cy="120" r="3"/><circle cx="210" cy="110" r="3"/><circle cx="230" cy="100" r="3"/><circle cx="250" cy="90" r="3"/></g><g stroke="#f59e0b" stroke-width="2" fill="none"><line x1="50" y1="185" x2="270" y2="85"/></g><g fill="#333" font-size="12" font-family="Arial"><text x="140" y="230">Hours of Study</text><text x="10" y="120" transform="rotate(-90 10,120)">Test Score</text><text x="45" y="190">60</text></g></svg>'
  },

  'A scatterplot with "Number of male students (millions)" on the x-axis and "Number of female students (millions)" on the y-axis. The data points show a positive correlation. A line of best fit is drawn.': {
    type: 'graph',
    description: 'College enrollment scatterplot',
    svg: '<svg width="300" height="250" viewBox="0 0 300 250"><g stroke="#e5e7eb" stroke-width="1" fill="none"><line x1="50" y1="30" x2="50" y2="200"/><line x1="50" y1="200" x2="270" y2="200"/></g><g fill="#2563eb"><circle cx="80" cy="170" r="3"/><circle cx="100" cy="160" r="3"/><circle cx="120" cy="150" r="3"/><circle cx="140" cy="140" r="3"/><circle cx="160" cy="130" r="3"/><circle cx="180" cy="120" r="3"/><circle cx="200" cy="110" r="3"/><circle cx="220" cy="100" r="3"/></g><g stroke="#f59e0b" stroke-width="2" fill="none"><line x1="70" y1="175" x2="230" y2="95"/></g><g fill="#333" font-size="12" font-family="Arial"><text x="120" y="230">Male students (millions)</text><text x="10" y="120" transform="rotate(-90 10,120)">Female students (millions)</text></g></svg>'
  },

  // Graphs
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

  // Bar charts
  'A bar chart showing the number of installations in 5 cities (A, B, C, D, E). The y-axis is unlabeled. The bar for City A goes up to 9, B to 5, C to 6, D to 4, and E to 3.5.': {
    type: 'chart',
    description: 'Solar panel installations bar chart',
    svg: '<svg width="300" height="200" viewBox="0 0 300 200"><g stroke="#e5e7eb" stroke-width="1" fill="none"><line x1="50" y1="20" x2="50" y2="180"/><line x1="50" y1="180" x2="270" y2="180"/></g><g fill="#2563eb" stroke="#333" stroke-width="1"><rect x="70" y="40" width="30" height="140"/><rect x="110" y="100" width="30" height="80"/><rect x="150" y="84" width="30" height="96"/><rect x="190" y="116" width="30" height="64"/><rect x="230" y="124" width="30" height="56"/></g><g fill="#333" font-size="12" font-family="Arial"><text x="82" y="195">A</text><text x="122" y="195">B</text><text x="162" y="195">C</text><text x="202" y="195">D</text><text x="242" y="195">E</text></g></svg>'
  },

  // Info boxes
  'A box with the text "1 decagram = 10 grams, 1,000 milligrams = 1 gram".': {
    type: 'diagram',
    description: 'Unit conversion reference box',
    svg: '<svg width="280" height="80" viewBox="0 0 280 80"><g stroke="#333" stroke-width="1" fill="#f8fafc"><rect x="10" y="10" width="260" height="60" rx="5"/></g><g fill="#333" font-size="14" font-family="Arial"><text x="20" y="30">1 decagram = 10 grams</text><text x="20" y="50">1,000 milligrams = 1 gram</text></g></svg>'
  }
};

// Function to add visual element to a question
function addVisualElement(content, visualDescription, element) {
  const escapedDescription = visualDescription.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const pattern = new RegExp(`(visual: "${escapedDescription}",)\\s*\\n\\s*(source:)`, 'g');
  
  let replacement;
  if (element.svg) {
    replacement = `$1
    visualElement: {
      type: '${element.type}',
      description: '${element.description}',
      svg: '${element.svg}'
    },
    $2`;
  } else {
    replacement = `$1
    visualElement: {
      type: '${element.type}',
      description: '${element.description}',
      data: ${JSON.stringify(element.data, null, 8).replace(/\n/g, '\n      ')}
    },
    $2`;
  }
  
  return content.replace(pattern, replacement);
}

// Apply visual elements
let updatedContent = content;
let changesCount = 0;

for (const [description, element] of Object.entries(visualElements)) {
  const beforeLength = updatedContent.length;
  updatedContent = addVisualElement(updatedContent, description, element);
  if (updatedContent.length !== beforeLength) {
    changesCount++;
    console.log(`\nAdded visual element for: ${description.substring(0, 60)}...`);
  }
}

// Write back the updated content
if (changesCount > 0) {
  fs.writeFileSync(mathQuestionsPath, updatedContent);
  console.log(`\nSuccessfully added ${changesCount} new visual elements!`);
  
  // Final count
  const finalVisualElementMatches = updatedContent.match(/visualElement: \{/g);
  console.log(`Total visual elements now: ${finalVisualElementMatches ? finalVisualElementMatches.length : 0}`);
} else {
  console.log('\nNo new visual elements were added. All descriptions may already have implementations.');
}
