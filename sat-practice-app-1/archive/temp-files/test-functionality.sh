#!/bin/bash

echo "🎯 SAT Practice App - Comprehensive Functionality Test"
echo "====================================================="
echo ""

echo "📊 Testing Question Database..."
echo "• Total questions imported: $(grep -o 'id: "math_' /Users/liamkrass/Documents/satProjectV2/sat-practice-app-1/frontend/src/data/mathQuestions.ts | wc -l | tr -d ' ')"

echo ""
echo "🔍 Testing Domain Distribution..."
echo "• Algebra questions: $(grep -o 'domain: "Algebra"' /Users/liamkrass/Documents/satProjectV2/sat-practice-app-1/frontend/src/data/mathQuestions.ts | wc -l | tr -d ' ')"
echo "• Advanced Math questions: $(grep -o 'domain: "Advanced Math"' /Users/liamkrass/Documents/satProjectV2/sat-practice-app-1/frontend/src/data/mathQuestions.ts | wc -l | tr -d ' ')"
echo "• Geometry questions: $(grep -o 'domain: "Geometry and Trigonometry"' /Users/liamkrass/Documents/satProjectV2/sat-practice-app-1/frontend/src/data/mathQuestions.ts | wc -l | tr -d ' ')"
echo "• Problem-Solving questions: $(grep -o 'domain: "Problem-Solving and Data Analysis"' /Users/liamkrass/Documents/satProjectV2/sat-practice-app-1/frontend/src/data/mathQuestions.ts | wc -l | tr -d ' ')"

echo ""
echo "🖼️ Testing Visual Elements..."
echo "• Questions with visuals: $(grep -c 'visual:' /Users/liamkrass/Documents/satProjectV2/sat-practice-app-1/frontend/src/data/mathQuestions.ts)"

echo ""
echo "🎚️ Testing Application Compilation..."
if pgrep -f "react-app-rewired start" > /dev/null; then
    echo "• ✅ Development server is running"
else
    echo "• ❌ Development server is not running"
fi

echo ""
echo "🌐 Testing Application Access..."
if curl -s http://localhost:3000 > /dev/null; then
    echo "• ✅ Application is accessible at http://localhost:3000"
else
    echo "• ❌ Application is not accessible"
fi

echo ""
echo "✅ Functionality test completed!"
echo ""
echo "🎯 Next Steps:"
echo "• Open http://localhost:3000 in your browser"
echo "• Test question filtering by domain"
echo "• Try the Practice mode with different categories"
echo "• Check the Question Stats feature"
echo "• Test the Casino games functionality"
