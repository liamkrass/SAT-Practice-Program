// Batch add visual elements to remaining questions
const fs = require('fs');
const path = require('path');

// Read the math questions file
const mathQuestionsPath = path.join(__dirname, 'src/data/mathQuestions.ts');
let content = fs.readFileSync(mathQuestionsPath, 'utf8');

// Visual element templates for common patterns
const visualElements = {
  // Right triangles
  'A right triangle ABC with right angle at B. AB=12, BC=5, AC=13.': {
    type: 'diagram',
    description: 'Right triangle with labeled sides',
    svg: '<svg width="200" height="160" viewBox="0 0 200 160"><g stroke="#333" stroke-width="2" fill="none"><polygon points="20,140 140,140 140,60" stroke="#2563eb"/></g><g fill="#333" font-size="12" font-family="Arial"><text x="15" y="155">A</text><text x="145" y="155">B</text><text x="145" y="50">C</text><text x="75" y="135">12</text><text x="150" y="100">5</text><text x="70" y="95">13</text><rect x="130" y="130" width="10" height="10" fill="none" stroke="#333"/></g></svg>'
  },
  
  // Simple cylinder
  'A right circular cylinder with a height of 8 yards.': {
    type: 'diagram',
    description: '3D cylinder with height labeled',
    svg: '<svg width="150" height="200" viewBox="0 0 150 200"><g stroke="#333" stroke-width="2" fill="#e5e7eb"><ellipse cx="75" cy="40" rx="35" ry="10"/><rect x="40" y="40" width="70" height="120" fill="#e5e7eb"/><ellipse cx="75" cy="160" rx="35" ry="10"/></g><g fill="#333" font-size="11" font-family="Arial"><text x="120" y="105">8 yd</text></g><g stroke="#666" stroke-width="1" stroke-dasharray="3,3" fill="none"><line x1="110" y1="40" x2="130" y2="40"/><line x1="110" y1="160" x2="130" y2="160"/></g></svg>'
  },
  
  // Three equations system
  'Three equations are shown: x+y=8, y+z=12, x+z=10.': {
    type: 'diagram',
    description: 'System of three equations',
    svg: '<svg width="200" height="120" viewBox="0 0 200 120"><g fill="#333" font-size="16" font-family="Arial, sans-serif"><text x="20" y="30">x + y = 8</text><text x="20" y="60">y + z = 12</text><text x="20" y="90">x + z = 10</text></g></svg>'
  },

  // Circle with center and radius info
  'A circle with center O. Points A and B are on the circle, forming an arc.': {
    type: 'diagram',
    description: 'Circle with center and arc points',
    svg: '<svg width="200" height="200" viewBox="0 0 200 200"><g stroke="#333" stroke-width="2" fill="none"><circle cx="100" cy="100" r="60" stroke="#2563eb"/><line x1="100" y1="100" x2="140" y2="60"/><line x1="100" y1="100" x2="160" y2="100"/></g><g fill="#333" font-size="12" font-family="Arial"><text x="95" y="105">O</text><text x="135" y="50">A</text><text x="165" y="105">B</text></g><g fill="#ef4444"><circle cx="100" cy="100" r="3"/><circle cx="140" cy="60" r="3"/><circle cx="160" cy="100" r="3"/></g></svg>'
  }
};

// Function to add visual element to a question
function addVisualElement(content, visualDescription, element) {
  const pattern = new RegExp(`visual: "${visualDescription.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}",[\\s\\n]*source:`, 'g');
  
  const replacement = `visual: "${visualDescription}",
    visualElement: {
      type: '${element.type}',
      description: '${element.description}',
      ${element.svg ? `svg: '${element.svg}'` : `data: ${JSON.stringify(element.data, null, 6)}`}
    },
    source:`;
  
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
    console.log(`Added visual element for: ${description.substring(0, 60)}...`);
  }
}

// Write back the updated content
if (changesCount > 0) {
  fs.writeFileSync(mathQuestionsPath, updatedContent);
  console.log(`\nSuccessfully added ${changesCount} visual elements!`);
} else {
  console.log('No matching visual descriptions found for batch update.');
}
