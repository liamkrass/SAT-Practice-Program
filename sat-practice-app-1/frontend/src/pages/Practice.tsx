import React, { useState, useEffect } from 'react';
import QuestionDisplay from '../components/QuestionDisplay';
import QuestionFilter from '../components/QuestionFilter';
import ScoreSummary from '../components/ScoreSummary';
import SkillBreakdown from '../components/SkillBreakdown';
import QuestionStats from '../components/QuestionStats';
import { satQuestions, getQuestionsByCategory, getQuestionsByDomain } from '../data/satQuestions';
import { typography, applyTypography, textColors } from '../styles/typography';
import { getAnsweredQuestions, saveAnsweredQuestion, clearProgress, cleanupDuplicates, debugProgress, verifyProgressIntegrity } from '../utils/progressStorage';

// Helper to normalize answers for comparison (top-level, so it's reused everywhere)
const normalizeAnswer = (answer: string) => {
  if (!answer) return '';
  return answer.replace(/^[A-D]\)\s*/, '').trim().toLowerCase();
};

// Robust answer checking: matches letter, full option, or text
const isAnswerCorrect = (selected: string, correct: string, options: string[]) => {
  if (!selected || !correct) return false;
  const norm = (s: string) => s.replace(/^[A-D]\)?\s*/, '').trim().toLowerCase();
  // If correct is a single letter (A/B/C/D), match by index
  if (/^[A-D]$/i.test(correct.trim())) {
    const correctIdx = 'ABCD'.indexOf(correct.trim().toUpperCase());
    if (correctIdx >= 0 && options[correctIdx]) {
      return norm(selected) === norm(options[correctIdx]) || selected.trim().toUpperCase() === correct.trim().toUpperCase();
    }
  }
  // If selected is a single letter, match by index
  if (/^[A-D]$/i.test(selected.trim())) {
    const selIdx = 'ABCD'.indexOf(selected.trim().toUpperCase());
    if (selIdx >= 0 && options[selIdx]) {
      return norm(options[selIdx]) === norm(correct) || selected.trim().toUpperCase() === correct.trim().toUpperCase();
    }
  }
  // Otherwise, compare normalized
  return norm(selected) === norm(correct);
};

const Practice: React.FC = () => {
  const [current, setCurrent] = useState(0);
  const [answers, setAnswers] = useState<{ [id: string]: string }>({});
  const [showResults, setShowResults] = useState(false);
  const [selectedDomains, setSelectedDomains] = useState<string[]>([]);
  const [showQuestionFilter, setShowQuestionFilter] = useState(false);
  const [showQuestionStats, setShowQuestionStats] = useState(false);
  const [balance, setBalance] = useState(0); // Add balance tracking
  const [resetFlag, setResetFlag] = useState(false); // Used to force re-filter after reset

  // Clean up any duplicates when component loads
  useEffect(() => {
    cleanupDuplicates();
  }, []);

  // Get questions based on selected domains and filter out answered
  const getQuestions = () => {
    let base = !selectedDomains.length ? satQuestions : satQuestions.filter(q => q.domain && selectedDomains.includes(q.domain));
    const answered = getAnsweredQuestions();
    return base.filter(q => !answered.includes(q.id));
  };
  const questions = getQuestions();

  // Safety check to ensure we have questions and valid current index
  if (!questions || questions.length === 0) {
    return (
      <div style={{ 
        padding: '40px', 
        textAlign: 'center',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <h2 style={{
          ...applyTypography(typography.heading.lg),
          color: textColors.primary,
          marginBottom: 16
        }}>
          No Questions Available
        </h2>
        <p style={{
          ...applyTypography(typography.body.lg),
          color: textColors.secondary,
          marginBottom: 24
        }}>
          {selectedDomains.length > 0 
            ? `No questions found for "${selectedDomains.join(', ')}".`
            : `No questions found for the selected criteria.`
          }
        </p>
        <button 
          onClick={() => {
            setSelectedDomains([]);
            setCurrent(0);
          }}
          style={{
            background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)',
            color: textColors.white,
            border: 'none',
            borderRadius: 16,
            padding: '12px 28px',
            cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(99, 102, 241, 0.25)',
            ...applyTypography(typography.ui.button.md)
          }}
        >
          Show All Questions
        </button>
      </div>
    );
  }

  // Ensure current index is within bounds
  if (current >= questions.length) {
    setCurrent(0);
    return null; // Re-render with corrected index
  }

  const handleAnswer = (selectedAnswer: string) => {
    const question = questions[current];
    if (!question) {
      console.error('No question found at index', current);
      return;
    }
    // Use robust answer checking
    const isCorrect = isAnswerCorrect(selectedAnswer, question.correctAnswer, question.options);
    if (isCorrect) {
      setBalance(prev => prev + 100);
    }
    setAnswers({ ...answers, [question.id]: selectedAnswer });
    saveAnsweredQuestion(question.id, selectedAnswer); // Save progress with actual answer
    if (current < questions.length - 1) {
      setCurrent(current + 1);
    } else {
      setShowResults(true);
    }
  };

  const handleDomainsChange = (domains: string[]) => {
    setSelectedDomains(domains);
    setCurrent(0);
    setAnswers({});
  };

  // Handle balance changes from Plinko game
  const handleEarn = (amount: number) => {
    setBalance(prev => prev + amount);
  };

  // Calculate scores and breakdowns
  const getScoreSummary = () => {
    let overall = 0, math = 0, verbal = 0;
    const skillBreakdown: Record<string, number> = {};
    questions.forEach(q => {
      if (isAnswerCorrect(answers[q.id], q.correctAnswer, q.options)) {
        overall++;
        if (q.category === 'math') math++;
        if (q.category === 'verbal') verbal++;
        skillBreakdown[q.skill] = (skillBreakdown[q.skill] || 0) + 1;
      }
    });
    return { overall, math, verbal, skillBreakdown };
  };

  const resetPractice = () => {
    setCurrent(0);
    setAnswers({});
    setShowResults(false);
    setBalance(0); // Reset balance when starting new practice
    clearProgress(); // Clear localStorage progress
    setResetFlag(f => !f); // Force re-render to update filtered questions
  };

  if (showResults) {
    const { overall, math, verbal, skillBreakdown } = getScoreSummary();
    return (
      <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
        <ScoreSummary overallScore={overall} mathScore={math} verbalScore={verbal} skillBreakdown={skillBreakdown} />
        <SkillBreakdown skills={Object.entries(skillBreakdown).map(([name, score]) => ({ 
          name, 
          score, 
          maxScore: questions.filter(q => q.skill === name).length 
        }))} />
        <div style={{ marginTop: '20px', textAlign: 'center' }}>
          <button 
            onClick={resetPractice}
            style={{
              background: 'linear-gradient(90deg,#6366f1 60%,#818cf8 100%)',
              color: textColors.white,
              border: 'none',
              borderRadius: 16,
              padding: '12px 28px',
              cursor: 'pointer',
              boxShadow: '0 2px 16px #6366f133',
              ...applyTypography(typography.ui.button.md)
            }}
          >
            Practice Again
          </button>
          <button
            onClick={resetPractice}
            style={{
              marginLeft: 16,
              background: 'linear-gradient(90deg,#f43f5e 60%,#fbbf24 100%)',
              color: textColors.white,
              border: 'none',
              borderRadius: 16,
              padding: '12px 28px',
              cursor: 'pointer',
              boxShadow: '0 2px 16px #f43f5e33',
              ...applyTypography(typography.ui.button.md)
            }}
          >
            Reset Progress
          </button>
        </div>
      </div>
    );
  }

  // If no questions left, show completion message and reset option
  if (questions.length === 0) {
    return (
      <div style={{ padding: '40px', textAlign: 'center', maxWidth: '600px', margin: '0 auto' }}>
        <h2 style={{ ...applyTypography(typography.heading.lg), color: textColors.primary, marginBottom: 16 }}>
          All Questions Completed!
        </h2>
        <p style={{ ...applyTypography(typography.body.lg), color: textColors.secondary, marginBottom: 24 }}>
          You've answered every available question. You can reset your progress to start over.
        </p>
        <button
          onClick={resetPractice}
          style={{
            background: 'linear-gradient(90deg,#f43f5e 60%,#fbbf24 100%)',
            color: textColors.white,
            border: 'none',
            borderRadius: 16,
            padding: '12px 28px',
            cursor: 'pointer',
            boxShadow: '0 4px 16px #f43f5e33',
            ...applyTypography(typography.ui.button.md)
          }}
        >
          Reset Progress
        </button>
        <button
          onClick={() => {
            console.log('=== MANUAL DEBUG TRIGGER ===');
            debugProgress();
            verifyProgressIntegrity();
            cleanupDuplicates();
          }}
          style={{
            marginLeft: '16px',
            background: 'linear-gradient(90deg,#10b981 60%,#34d399 100%)',
            color: textColors.white,
            border: 'none',
            borderRadius: 16,
            padding: '12px 28px',
            cursor: 'pointer',
            boxShadow: '0 4px 16px #10b98133',
            ...applyTypography(typography.ui.button.md)
          }}
        >
          Debug Progress
        </button>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', position: 'relative' }}>
      <QuestionDisplay 
        question={questions[current]} 
        onAnswer={handleAnswer}
        onSkip={() => {
          // Skip to next question without saving answer
          if (current < questions.length - 1) {
            setCurrent(current + 1);
          } else {
            setShowResults(true);
          }
        }}
        questionNumber={current + 1}
        totalQuestions={questions.length}
        onShowQuestionList={() => setShowQuestionFilter(true)}
        balance={balance}
        onEarn={handleEarn}
        answers={answers}
        allQuestions={satQuestions} // Pass ALL questions for performance tracking
      />

      {/* Question Filter Modal */}
      {showQuestionFilter && (
        <QuestionFilter
          selectedDomains={selectedDomains}
          onDomainsChange={handleDomainsChange}
          onClose={() => setShowQuestionFilter(false)}
          questions={satQuestions} // Pass all questions for filter options
        />
      )}
      
      {/* Question Stats Modal */}
      {showQuestionStats && (
        <div style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 1000,
          padding: '20px'
        }}>
          <div style={{
            maxHeight: '90vh',
            overflowY: 'auto',
            width: '100%',
            maxWidth: '900px'
          }}>
            <QuestionStats onClose={() => setShowQuestionStats(false)} />
          </div>
        </div>
      )}
      
      <div style={{ 
        textAlign: 'center', 
        marginTop: '16px',
        ...applyTypography(typography.body.md),
        color: textColors.secondary
      }}>
        Question {current + 1} of {questions.length}
        {questions[current].domain && (
          <span style={{ 
            marginLeft: '12px', 
            color: textColors.accent,
            textTransform: 'capitalize',
            ...applyTypography(typography.body.sm)
          }}>
            {questions[current].domain}
          </span>
        )}
        {selectedDomains.length > 0 && (
          <span style={{ 
            marginLeft: '8px',
            padding: '4px 8px',
            background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
            color: textColors.white,
            borderRadius: 8,
            fontSize: '12px',
            textTransform: 'capitalize'
          }}>
            {selectedDomains.join(', ')} Filter Active
          </span>
        )}
      </div>
    </div>
  );
};

export default Practice;
