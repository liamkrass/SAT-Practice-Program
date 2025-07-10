// Analyze visual patterns in math questions
const fs = require('fs');
const path = require('path');

// Read the math questions file
const mathQuestionsPath = path.join(__dirname, 'src/data/mathQuestions.ts');
const content = fs.readFileSync(mathQuestionsPath, 'utf8');

// Extract visual descriptions using regex
const visualMatches = content.match(/visual: "([^"]+)"/g);

if (visualMatches) {
  console.log(`Found ${visualMatches.length} questions with visual descriptions\n`);
  
  const patterns = {
    tables: [],
    graphs: [],
    diagrams: [],
    triangles: [],
    cylinders: [],
    other: []
  };
  
  visualMatches.forEach((match, index) => {
    const visual = match.replace(/visual: "/, '').replace(/"$/, '');
    
    if (visual.includes('table') || visual.includes('Table')) {
      patterns.tables.push({ index: index + 1, visual });
    } else if (visual.includes('graph') || visual.includes('line') || visual.includes('parabola')) {
      patterns.graphs.push({ index: index + 1, visual });
    } else if (visual.includes('triangle') || visual.includes('Triangle')) {
      patterns.triangles.push({ index: index + 1, visual });
    } else if (visual.includes('cylinder') || visual.includes('cone') || visual.includes('silo')) {
      patterns.cylinders.push({ index: index + 1, visual });
    } else if (visual.includes('diagram') || visual.includes('parallel') || visual.includes('lines')) {
      patterns.diagrams.push({ index: index + 1, visual });
    } else {
      patterns.other.push({ index: index + 1, visual });
    }
  });
  
  console.log('TABLES:', patterns.tables.length);
  patterns.tables.slice(0, 3).forEach(p => console.log(`  ${p.visual.substring(0, 80)}...`));
  
  console.log('\nGRAPHS:', patterns.graphs.length);
  patterns.graphs.slice(0, 3).forEach(p => console.log(`  ${p.visual.substring(0, 80)}...`));
  
  console.log('\nTRIANGLES:', patterns.triangles.length);
  patterns.triangles.slice(0, 3).forEach(p => console.log(`  ${p.visual.substring(0, 80)}...`));
  
  console.log('\nCYLINDERS/3D:', patterns.cylinders.length);
  patterns.cylinders.slice(0, 3).forEach(p => console.log(`  ${p.visual.substring(0, 80)}...`));
  
  console.log('\nDIAGRAMS:', patterns.diagrams.length);
  patterns.diagrams.slice(0, 3).forEach(p => console.log(`  ${p.visual.substring(0, 80)}...`));
  
  console.log('\nOTHER:', patterns.other.length);
  patterns.other.slice(0, 3).forEach(p => console.log(`  ${p.visual.substring(0, 80)}...`));
  
} else {
  console.log('No visual descriptions found');
}
