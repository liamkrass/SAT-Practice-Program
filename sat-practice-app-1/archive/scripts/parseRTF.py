#!/usr/bin/env python3
import re
import json
import os
from datetime import datetime

def clean_rtf_text(text):
    """Clean RTF formatting and extract plain text"""
    # Remove RTF formatting codes
    cleaned = re.sub(r'\\[a-z]+\d*\s?', '', text)  # Remove RTF commands
    cleaned = re.sub(r'[{}]', '', cleaned)  # Remove braces
    cleaned = re.sub(r'\\\*', '', cleaned)  # Remove escaped asterisks
    cleaned = re.sub(r"\\\'", "'", cleaned)  # Fix apostrophes
    cleaned = re.sub(r'\\\\', '\\', cleaned)  # Fix backslashes
    cleaned = re.sub(r'\s+', ' ', cleaned)  # Normalize whitespace
    cleaned = cleaned.strip()

    # Handle Unicode characters
    def replace_unicode(match):
        code = int(match.group(1))
        if code == 8722:
            return '-'  # minus sign
        elif code == 8804:
            return '≤'  # less than or equal
        elif code == 8805:
            return '≥'  # greater than or equal
        else:
            try:
                return chr(code)
            except:
                return match.group(0)
    
    cleaned = re.sub(r'\\u(\d+)', replace_unicode, cleaned)
    return cleaned

def parse_question(question_text):
    """Parse individual question from TXT text"""
    question = {}
    
    # Extract question number
    question_match = re.search(r'QUESTION_(\d+)', question_text)
    if question_match:
        question['id'] = f"math_{question_match.group(1)}"
    
    # Find the data line (should be the second line or combined line)
    lines = question_text.strip().split('\n')
    data_line = None
    for line in lines:
        if 'Question:' in line:
            data_line = line
            break
    
    if not data_line:
        raise ValueError("No question data line found")
    
    # Extract question text
    question_match = re.search(r'Question:\s*(.*?)\s*Visual:', data_line)
    if question_match:
        question['text'] = question_match.group(1).strip()
    
    # Extract visual description
    visual_match = re.search(r'Visual:\s*(.*?)\s*A\)', data_line)
    if visual_match:
        visual = visual_match.group(1).strip()
        if visual and visual != 'None':
            question['visual'] = visual
    
    # Extract options
    options_match = re.search(r'A\)\s*(.*?)\s*B\)\s*(.*?)\s*C\)\s*(.*?)\s*D\)\s*(.*?)\s*Answer:', data_line)
    if options_match:
        question['options'] = [
            f"A) {options_match.group(1).strip()}",
            f"B) {options_match.group(2).strip()}",
            f"C) {options_match.group(3).strip()}",
            f"D) {options_match.group(4).strip()}"
        ]
    
    # Extract answer
    answer_match = re.search(r'Answer:\s*([A-D])', data_line)
    if answer_match:
        question['correctAnswer'] = answer_match.group(1)
    
    # Extract category
    category_match = re.search(r'Category:\s*(\w+)', data_line)
    if category_match:
        question['category'] = category_match.group(1)
    
    # Extract domain
    domain_match = re.search(r'Domain:\s*(.*?)\s*Skill:', data_line)
    if domain_match:
        question['domain'] = domain_match.group(1).strip()
    
    # Extract skill
    skill_match = re.search(r'Skill:\s*(.*?)\s*Difficulty:', data_line)
    if skill_match:
        question['skill'] = skill_match.group(1).strip()
    
    # Extract difficulty
    difficulty_match = re.search(r'Difficulty:\s*(\w+)', data_line)
    if difficulty_match:
        question['difficulty'] = difficulty_match.group(1)
    
    # Set source
    question['source'] = 'College Board'
    
    return question

def main():
    print('🚀 Starting TXT Math Questions Import...')
    
    # Read TXT file
    txt_path = '/Users/liamkrass/Documents/satProjectV2/MathQuestionSat.txt'
    print(f'📖 Reading TXT file: {txt_path}')
    
    try:
        with open(txt_path, 'r', encoding='utf-8') as file:
            txt_content = file.read()
    except Exception as e:
        print(f'❌ Error reading TXT file: {e}')
        return
    
    print(f'📄 TXT file size: {len(txt_content):,} characters')
    
    # Split into question blocks
    question_blocks = re.split(r'(?=QUESTION_\d+)', txt_content)
    print(f'🔍 Found {len(question_blocks)} question blocks')
    
    questions = []
    errors = []
    
    for i, block in enumerate(question_blocks):
        if 'QUESTION_' in block:
            try:
                question = parse_question(block)
                if question.get('id') and question.get('text') and question.get('options') and question.get('correctAnswer'):
                    questions.append(question)
                    print(f'✅ Parsed {question["id"]}: {question["text"][:50]}...')
                else:
                    missing = []
                    if not question.get('id'): missing.append('id')
                    if not question.get('text'): missing.append('text')
                    if not question.get('options'): missing.append('options')
                    if not question.get('correctAnswer'): missing.append('answer')
                    errors.append(f'Question {i}: Missing {", ".join(missing)}')
            except Exception as e:
                errors.append(f'Question {i}: {str(e)}')
    
    print(f'\n📊 Successfully parsed {len(questions)} questions')
    if errors:
        print(f'⚠️  {len(errors)} parsing errors:')
        for error in errors[:5]:  # Show first 5 errors
            print(f'   {error}')
    
    # Generate TypeScript file
    print('\n🔨 Generating TypeScript file...')
    
    output_path = '/Users/liamkrass/Documents/satProjectV2/sat-practice-app-1/frontend/src/data/mathQuestions.ts'
    
    # Create TypeScript content
    header = f'''// Generated from MathQuestionSat.txt - {datetime.now().isoformat()}
// Total questions: {len(questions)}

export interface Question {{
  id: string;
  text: string;
  category: 'math' | 'verbal';
  domain: string;
  skill: string;
  difficulty: 'easy' | 'medium' | 'hard';
  options: string[];
  correctAnswer: string;
  visual?: string;
  source: string;
}}

export const mathQuestions: Question[] = ['''
    
    question_strings = []
    for q in questions:
        visual_prop = f'\n    visual: {json.dumps(q["visual"])},' if q.get('visual') else ''
        
        question_str = f'''  {{
    id: {json.dumps(q["id"])},
    text: {json.dumps(q["text"])},
    category: {json.dumps(q["category"])},
    domain: {json.dumps(q["domain"])},
    skill: {json.dumps(q["skill"])},
    difficulty: {json.dumps(q["difficulty"])},
    options: {json.dumps(q["options"], indent=6).replace(chr(10), chr(10) + "    ")},
    correctAnswer: {json.dumps(q["correctAnswer"])},{visual_prop}
    source: {json.dumps(q["source"])}
  }}'''
        question_strings.append(question_str)
    
    footer = f'''];

// Export by domain for easier filtering
export const algebraQuestions = mathQuestions.filter(q => q.domain === 'Algebra');
export const geometryQuestions = mathQuestions.filter(q => q.domain === 'Geometry and Trigonometry');
export const advancedMathQuestions = mathQuestions.filter(q => q.domain === 'Advanced Math');
export const dataAnalysisQuestions = mathQuestions.filter(q => q.domain === 'Problem-Solving and Data Analysis');

// Statistics
export const questionStats = {{
  total: mathQuestions.length,
  byDomain: {{
    algebra: algebraQuestions.length,
    geometry: geometryQuestions.length,
    advancedMath: advancedMathQuestions.length,
    dataAnalysis: dataAnalysisQuestions.length
  }},
  byDifficulty: {{
    easy: mathQuestions.filter(q => q.difficulty === 'easy').length,
    medium: mathQuestions.filter(q => q.difficulty === 'medium').length,
    hard: mathQuestions.filter(q => q.difficulty === 'hard').length
  }}
}};

export default mathQuestions;
'''
    
    typescript_content = header + '\n' + ',\n'.join(question_strings) + '\n' + footer
    
    # Write to file
    with open(output_path, 'w', encoding='utf-8') as file:
        file.write(typescript_content)
    
    print(f'✅ Generated {output_path} with {len(questions)} questions')
    
    # Generate statistics
    domains = {}
    skills = {}
    difficulties = {}
    
    for q in questions:
        domain = q.get('domain', 'Unknown')
        skill = q.get('skill', 'Unknown')
        difficulty = q.get('difficulty', 'Unknown')
        
        domains[domain] = domains.get(domain, 0) + 1
        skills[skill] = skills.get(skill, 0) + 1
        difficulties[difficulty] = difficulties.get(difficulty, 0) + 1
    
    print('\n📊 SUMMARY REPORT:')
    print('=' * 50)
    print(f'Total Questions: {len(questions)}')
    print('\nBy Domain:')
    for domain, count in sorted(domains.items(), key=lambda x: x[1], reverse=True):
        print(f'  {domain}: {count}')
    print('\nBy Difficulty:')
    for diff, count in sorted(difficulties.items(), key=lambda x: x[1], reverse=True):
        print(f'  {diff}: {count}')
    print('\nTop Skills:')
    for skill, count in sorted(skills.items(), key=lambda x: x[1], reverse=True)[:10]:
        print(f'  {skill}: {count}')
    
    # Create summary markdown
    summary_content = f'''# RTF Math Questions Import - {datetime.now().strftime('%Y-%m-%d')}

## Summary
- **Total Questions**: {len(questions)}
- **Source**: MathQuestionSat.rtf
- **Generated File**: rtfMathQuestions.ts

## Distribution by Domain
{chr(10).join([f"- **{domain}**: {count} questions" for domain, count in sorted(domains.items(), key=lambda x: x[1], reverse=True)])}

## Distribution by Difficulty
{chr(10).join([f"- **{diff}**: {count} questions" for diff, count in sorted(difficulties.items(), key=lambda x: x[1], reverse=True)])}

## Top Skills
{chr(10).join([f"- **{skill}**: {count} questions" for skill, count in sorted(skills.items(), key=lambda x: x[1], reverse=True)[:15]])}

## Sample Questions

{chr(10).join([f"""### Question {i + 1} ({q["id"]})
**Domain**: {q.get("domain", "Unknown")}  
**Skill**: {q.get("skill", "Unknown")}  
**Difficulty**: {q.get("difficulty", "Unknown")}

**Question**: {q["text"]}

**Options**:
{chr(10).join(q.get("options", []))}

**Answer**: {q.get("correctAnswer", "Unknown")}
{f'**Visual**: {q["visual"]}' if q.get("visual") else ""}
""" for i, q in enumerate(questions[:3])])}
'''
    
    summary_path = '/Users/liamkrass/Documents/satProjectV2/sat-practice-app-1/RTF_QUESTIONS_IMPORT_SUMMARY.md'
    with open(summary_path, 'w', encoding='utf-8') as file:
        file.write(summary_content)
    
    print(f'\n📄 Generated summary report: {summary_path}')
    print('\n🎉 RTF import completed successfully!')

if __name__ == '__main__':
    main()
