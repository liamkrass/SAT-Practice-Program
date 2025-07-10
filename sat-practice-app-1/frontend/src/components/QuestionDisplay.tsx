import React, { useState, useEffect } from 'react';
import SafeButton from './SafeButton';
import { typography, applyTypography, textColors } from '../styles/typography';
import Casino from './Casino';
import { VisualElementRenderer } from './VisualElements';

interface VisualElement {
    type: 'graph' | 'table' | 'diagram' | 'chart' | 'equation';
    description: string;
    data?: any;
    svg?: string;
}

interface Question {
    id: string;
    text: string;
    category: 'math' | 'verbal';
    skill: string;
    options: string[];
    correctAnswer: string;
    domain?: string;
    difficulty?: string;
    source?: string;
    visual?: string;
    visualElement?: VisualElement;
}

interface QuestionDisplayProps {
    question: Question;
    onAnswer: (selectedAnswer: string) => void;
    answers?: { [id: string]: string };
    allQuestions?: Question[];
}

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

const QuestionDisplay: React.FC<QuestionDisplayProps & {
    selectedAnswer?: string;
    setSelectedAnswer?: (answer: string) => void;
    onSkip?: () => void;
    questionNumber?: number;
    totalQuestions?: number;
    onShowQuestionList?: () => void;
    balance?: number;
    onEarn?: (amount: number) => void;
}> = (props) => {
    const { 
        question, 
        onAnswer, 
        selectedAnswer, 
        setSelectedAnswer, 
        onSkip, 
        questionNumber, 
        totalQuestions, 
        onShowQuestionList,
        balance,
        onEarn,
        answers = {},
        allQuestions = []
    } = props;
    
    // Safety check for question prop
    if (!question) {
        return (
            <div style={{
                padding: '40px',
                textAlign: 'center',
                background: '#fee2e2',
                borderRadius: '16px',
                margin: '20px'
            }}>
                <h3 style={{ color: '#dc2626', marginBottom: '8px' }}>Error: No Question Data</h3>
                <p style={{ color: '#7f1d1d' }}>Unable to load question. Please try refreshing the page.</p>
            </div>
        );
    }

    // Safety check for question options
    if (!question.options || !Array.isArray(question.options) || question.options.length === 0) {
        return (
            <div style={{
                padding: '40px',
                textAlign: 'center',
                background: '#fef3c7',
                borderRadius: '16px',
                margin: '20px'
            }}>
                <h3 style={{ color: '#d97706', marginBottom: '8px' }}>Error: Invalid Question Format</h3>
                <p style={{ color: '#92400e' }}>Question options are missing or invalid.</p>
                <p style={{ fontSize: '12px', color: '#451a03', marginTop: '8px' }}>
                    Question ID: {question.id || 'Unknown'}
                </p>
            </div>
        );
    }
    
    const [localSelected, setLocalSelected] = useState<string>('');
    const [showReference, setShowReference] = useState(false);
    const [showCalculator, setShowCalculator] = useState(false);
    const [showPlinko, setShowPlinko] = useState(false);
    const [imageLoadError, setImageLoadError] = useState(false);
    const [showFeedback, setShowFeedback] = useState(false);
    const [feedbackData, setFeedbackData] = useState<{
        isCorrect: boolean;
        selectedAnswer: string;
        correctAnswer: string;
    } | null>(null);
    
    // Use local state if no external selectedAnswer is provided
    const effectiveSelected = selectedAnswer || localSelected;
    
    // Handle selection - works with both controlled and uncontrolled mode
    const handleSelect = (option: string) => {
        console.log('QuestionDisplay: Option selected:', option);
        if (setSelectedAnswer) {
            setSelectedAnswer(option);
        } else {
            setLocalSelected(option);
        }
    };
    
    // Fallback for onSkip if not provided
    const handleSkip = () => {
        console.log('QuestionDisplay: Skip button clicked');
        if (onSkip) onSkip();
    };
    
    // Fallback for onAnswer if not provided
    const handleSubmit = () => {
        const answerToSubmit = selectedAnswer || localSelected;
        if (answerToSubmit && question) {
            const isCorrect = isAnswerCorrect(answerToSubmit, question.correctAnswer, question.options);
            setFeedbackData({
                isCorrect,
                selectedAnswer: answerToSubmit,
                correctAnswer: question.correctAnswer
            });
            setShowFeedback(true);
        }
    };

    const handleNext = () => {
        if (feedbackData && onAnswer) {
            onAnswer(feedbackData.selectedAnswer);
        }
        setShowFeedback(false);
        setFeedbackData(null);
        // Reset local selection for next question
        setLocalSelected('');
    };
    
    // Fallback for onShowQuestionList if not provided
    const handleShowQuestionList = () => {
        console.log('QuestionDisplay: Jump to question button clicked');
        if (onShowQuestionList) onShowQuestionList();
    };
    return (
        <div className="question-display modern-question" style={{
            position: 'relative',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
            borderRadius: 28,
            boxShadow: '0 8px 32px rgba(60,72,100,0.13)',
            padding: '56px 28px 36px 28px',
            maxWidth: 520,
            margin: '64px auto',
            minHeight: 440,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            border: '1.5px solid #e5e7eb',
        }}>
            {/* Top right icon bar - always visible */}
            <div style={{ 
                position: 'absolute', 
                top: 20, 
                right: 20, 
                zIndex: 2,
                display: 'flex',
                gap: 6,
                background: 'rgba(255, 255, 255, 0.98)',
                backdropFilter: 'blur(12px)',
                borderRadius: 20,
                padding: '6px',
                border: '1.5px solid #e5e7eb',
                boxShadow: '0 6px 24px rgba(60,72,100,0.12)',
                animation: 'fadeInScale 0.3s ease-out'
            }}>
                {/* Jump to Question */}
                <button
                    onClick={handleShowQuestionList}
                    title="Jump to Question"
                    style={{ 
                        background: 'none', 
                        border: 'none', 
                        cursor: 'pointer', 
                        padding: '10px', 
                        borderRadius: 14, 
                        width: 44, 
                        height: 44, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        transition: 'all 0.2s ease',
                        outline: 'none'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(99, 102, 241, 0.1)';
                        e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = 'none';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                    aria-label="Jump to Question"
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Modern Navigation Grid */}
                        <rect x="3" y="3" width="18" height="18" rx="4" stroke="#6366f1" strokeWidth="2" fill="none"/>
                        <rect x="6" y="6" width="4" height="4" rx="1" fill="#6366f1"/>
                        <rect x="14" y="6" width="4" height="4" rx="1" fill="#6366f1"/>
                        <rect x="6" y="14" width="4" height="4" rx="1" fill="#6366f1"/>
                        <rect x="14" y="14" width="4" height="4" rx="1" fill="#6366f1"/>
                        <circle cx="12" cy="12" r="1.5" fill="#6366f1"/>
                    </svg>
                </button>

                {/* Progress Indicator replaced with Performance Dropdown Button */}
                <PerformanceDropdownButton 
                    answers={answers} 
                    allQuestions={allQuestions} 
                    questionNumber={questionNumber || 1} 
                    totalQuestions={totalQuestions || 1} 
                />

                {/* Calculator - Only show for math questions */}
                {question.category === 'math' && (
                    <button
                        onClick={() => setShowCalculator(true)}
                        title="Calculator"
                        style={{ 
                            background: showCalculator ? 'rgba(245, 158, 66, 0.15)' : 'none', 
                            border: 'none', 
                            cursor: 'pointer', 
                            padding: '10px', 
                            borderRadius: 14, 
                            width: 44, 
                            height: 44, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            transition: 'all 0.2s ease',
                            outline: 'none'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(245, 158, 66, 0.15)';
                            e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = showCalculator ? 'rgba(245, 158, 66, 0.15)' : 'none';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                        aria-label="Calculator"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Modern Calculator Design */}
                            <rect x="4" y="2" width="16" height="20" rx="3" stroke="#f59e42" strokeWidth="2" fill="none"/>
                            <rect x="7" y="5" width="10" height="4" rx="1" fill="#f59e42" opacity="0.2"/>
                            <text x="12" y="8" fontSize="6" fill="#f59e42" textAnchor="middle" fontWeight="bold">123</text>
                            <rect x="7" y="11" width="2.5" height="2.5" rx="0.5" fill="#f59e42"/>
                            <rect x="10.75" y="11" width="2.5" height="2.5" rx="0.5" fill="#f59e42"/>
                            <rect x="14.5" y="11" width="2.5" height="2.5" rx="0.5" fill="#f59e42"/>
                            <rect x="7" y="15" width="2.5" height="2.5" rx="0.5" fill="#f59e42"/>
                            <rect x="10.75" y="15" width="2.5" height="2.5" rx="0.5" fill="#f59e42"/>
                            <rect x="14.5" y="15" width="2.5" height="2.5" rx="0.5" fill="#f59e42"/>
                        </svg>
                    </button>
                )}

                {/* Reference Sheet - Only show for math questions */}
                {question.category === 'math' && (
                    <button
                        onClick={() => setShowReference(true)}
                        title="Reference Sheet"
                        style={{ 
                            background: showReference ? 'rgba(245, 158, 66, 0.15)' : 'none', 
                            border: 'none', 
                            cursor: 'pointer', 
                            padding: '10px', 
                            borderRadius: 14, 
                            width: 44, 
                            height: 44, 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center', 
                            transition: 'all 0.2s ease',
                            outline: 'none'
                        }}
                        onMouseEnter={(e) => {
                            e.currentTarget.style.background = 'rgba(245, 158, 66, 0.15)';
                            e.currentTarget.style.transform = 'scale(1.05)';
                        }}
                        onMouseLeave={(e) => {
                            e.currentTarget.style.background = showReference ? 'rgba(245, 158, 66, 0.15)' : 'none';
                            e.currentTarget.style.transform = 'scale(1)';
                        }}
                        aria-label="Reference Sheet"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            {/* Modern Reference Sheet */}
                            <rect x="4" y="3" width="16" height="18" rx="2" stroke="#f59e42" strokeWidth="2" fill="none"/>
                            <path d="M4 8H20" stroke="#f59e42" strokeWidth="1.5"/>
                            <rect x="7" y="5" width="4" height="1.5" rx="0.75" fill="#f59e42"/>
                            <rect x="13" y="5" width="4" height="1.5" rx="0.75" fill="#f59e42"/>
                            <rect x="7" y="11" width="10" height="1" rx="0.5" fill="#f59e42" opacity="0.6"/>
                            <rect x="7" y="13.5" width="8" height="1" rx="0.5" fill="#f59e42" opacity="0.6"/>
                            <rect x="7" y="16" width="6" height="1" rx="0.5" fill="#f59e42" opacity="0.6"/>
                            <circle cx="17" cy="16" r="1.5" fill="#f59e42"/>
                            <path d="M16 16L17 17L18.5 15" stroke="white" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </button>
                )}

                {/* Casino */}
                <button
                    onClick={() => setShowPlinko(true)}
                    title="Open Casino"
                    style={{ 
                        background: showPlinko ? 'rgba(139, 92, 246, 0.15)' : 'none', 
                        border: 'none', 
                        cursor: 'pointer', 
                        padding: '10px', 
                        borderRadius: 14, 
                        width: 44, 
                        height: 44, 
                        display: 'flex', 
                        alignItems: 'center', 
                        justifyContent: 'center', 
                        transition: 'all 0.2s ease',
                        outline: 'none'
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.background = 'rgba(139, 92, 246, 0.15)';
                        e.currentTarget.style.transform = 'scale(1.05)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.background = showPlinko ? 'rgba(139, 92, 246, 0.15)' : 'none';
                        e.currentTarget.style.transform = 'scale(1)';
                    }}
                    aria-label="Open Casino"
                >
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        {/* Modern Casino Chip */}
                        <circle cx="12" cy="12" r="10" fill="#8b5cf6" stroke="#7c3aed" strokeWidth="2"/>
                        <circle cx="12" cy="12" r="6" fill="none" stroke="white" strokeWidth="2"/>
                        <circle cx="12" cy="12" r="2" fill="white"/>
                        
                        {/* Chip edge details */}
                        <circle cx="6" cy="12" r="1" fill="white" opacity="0.8"/>
                        <circle cx="18" cy="12" r="1" fill="white" opacity="0.8"/>
                        <circle cx="12" cy="6" r="1" fill="white" opacity="0.8"/>
                        <circle cx="12" cy="18" r="1" fill="white" opacity="0.8"/>
                        
                        {/* Dollar symbol */}
                        <text x="12" y="16" fontSize="6" fill="white" textAnchor="middle" fontWeight="bold">$</text>
                    </svg>
                </button>
            </div>
            {/* Calculator window (persistent, draggable, resizable) - Only for math questions */}
            {question.category === 'math' && (
                <div style={{ position: 'fixed', zIndex: 1000 }}>
                    {showCalculator && <CalculatorModal onClose={() => setShowCalculator(false)} />}
                </div>
            )}
            {/* Reference sheet modal - Only for math questions */}
            {question.category === 'math' && showReference && (
                <div
                    style={{ 
                        position: 'fixed', 
                        top: 0, 
                        left: 0, 
                        width: '100vw', 
                        height: '100vh', 
                        background: 'rgba(30,41,59,0.25)', 
                        zIndex: 1500,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backdropFilter: 'blur(8px)',
                        animation: 'fadeInScale 0.3s ease-out'
                    }}
                    onClick={() => {
                        setShowReference(false);
                    }}
                    tabIndex={0}
                    onKeyDown={e => { 
                        if (e.key === 'Escape') {
                            setShowReference(false);
                        }
                    }}
                >
                    <div
                        style={{ 
                            background: '#fff', 
                            borderRadius: 20, 
                            boxShadow: '0 12px 40px rgba(60,72,100,0.25)', 
                            padding: '24px', 
                            maxWidth: '95vw', 
                            maxHeight: '95vh', 
                            overflow: 'auto',
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            border: '1px solid #e5e7eb'
                        }}
                        onClick={e => e.stopPropagation()}
                    >
                        <h3 style={{
                            ...applyTypography(typography.heading.md),
                            color: textColors.primary,
                            marginBottom: 20,
                            textAlign: 'center'
                        }}>
                            SAT Reference Sheet
                        </h3>
                        
                        <div style={{
                            borderRadius: 16,
                            overflow: 'hidden',
                            boxShadow: '0 4px 20px rgba(60,72,100,0.15)',
                            marginBottom: 24,
                            border: '2px solid #f3f4f6',
                            minHeight: imageLoadError ? '300px' : 'auto',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: imageLoadError ? '#f8fafc' : 'transparent'
                        }}>
                            {imageLoadError ? (
                                <div style={{
                                    textAlign: 'center',
                                    padding: '40px',
                                    color: textColors.secondary
                                }}>
                                    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginBottom: '16px' }}>
                                        <rect x="4" y="3" width="16" height="18" rx="3"/>
                                        <path d="M8 7h8M8 11h8M8 15h4"/>
                                    </svg>
                                    <h4 style={{ 
                                        ...applyTypography(typography.heading.sm),
                                        color: textColors.primary,
                                        marginBottom: 8
                                    }}>
                                        SAT Reference Sheet
                                    </h4>
                                    <p style={{
                                        ...applyTypography(typography.body.sm),
                                        color: textColors.secondary,
                                        marginBottom: 16
                                    }}>
                                        Reference sheet image not available.<br />
                                        Please refer to your official SAT materials.
                                    </p>
                                    <div style={{
                                        background: '#f3f4f6',
                                        borderRadius: 8,
                                        padding: '12px',
                                        ...applyTypography(typography.body.sm),
                                        color: textColors.tertiary,
                                        fontSize: '12px'
                                    }}>
                                        Common formulas include: Area, Volume, Pythagorean Theorem, and Trigonometric ratios
                                    </div>
                                </div>
                            ) : (
                                <img 
                                    src={'/satReferenceSheet.jpg'} 
                                    alt="SAT Reference Sheet" 
                                    style={{ 
                                        maxWidth: '85vw', 
                                        maxHeight: '70vh', 
                                        width: 'auto',
                                        height: 'auto',
                                        display: 'block'
                                    }} 
                                    onError={(e) => {
                                        console.error('Failed to load reference sheet image');
                                        setImageLoadError(true);
                                    }}
                                    onLoad={() => {
                                        setImageLoadError(false);
                                    }}
                                />
                            )}
                        </div>
                        
                        <button
                            onClick={() => setShowReference(false)}
                            style={{ 
                                background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)',
                                color: textColors.white, 
                                border: 'none', 
                                borderRadius: 12, 
                                padding: '12px 32px', 
                                cursor: 'pointer', 
                                boxShadow: '0 4px 16px rgba(99, 102, 241, 0.25)',
                                transition: 'all 0.2s ease',
                                ...applyTypography(typography.ui.button.md)
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.transform = 'translateY(-2px)';
                                e.currentTarget.style.boxShadow = '0 6px 20px rgba(99, 102, 241, 0.35)';
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.transform = 'translateY(0)';
                                e.currentTarget.style.boxShadow = '0 4px 16px rgba(99, 102, 241, 0.25)';
                            }}
                        >
                            Close Reference Sheet
                        </button>
                    </div>
                </div>
            )}
            
            {/* Casino Modal */}
            {showPlinko && (
                <Casino 
                    onClose={() => setShowPlinko(false)} 
                    balance={balance || 0}
                    onEarn={onEarn || (() => {})}
                />
            )}
            
            <h2 className="modern-question-title" style={{
                ...applyTypography(typography.question.title),
                marginTop: 28,
                marginBottom: 22,
                textAlign: 'center',
            }}>{question.text}</h2>
            
            {/* Render visual element if present */}
            {question.visualElement && (
                <div style={{ 
                    marginBottom: 24, 
                    display: 'flex', 
                    justifyContent: 'center',
                    padding: '16px',
                    backgroundColor: '#f8f9fa',
                    borderRadius: '8px',
                    border: '1px solid #e9ecef'
                }}>
                    <VisualElementRenderer 
                        visual={question.visualElement} 
                        className="question-visual"
                    />
                </div>
            )}
            
            {/* Show visual description if no visual element but has description */}
            {question.visual && !question.visualElement && question.visual !== 'None' && (
                <div style={{
                    marginBottom: 24,
                    padding: '12px 16px',
                    backgroundColor: '#f0f8ff',
                    borderRadius: '6px',
                    border: '1px solid #cce7ff',
                    fontSize: '14px',
                    fontStyle: 'italic',
                    color: '#2c5aa0',
                    textAlign: 'center'
                }}>
                    {question.visual}
                </div>
            )}
            
            <div className="options modern-options" style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 14, marginBottom: 18 }}>
                {question.options.map((option, index) => {
                    let isCorrect = false;
                    let isUserChoice = false;
                    let showIcon = false;
                    let buttonVariant: any = normalizeAnswer(effectiveSelected) === normalizeAnswer(option) ? 'selected' : 'option';

                    if (showFeedback && feedbackData) {
                        isCorrect = isAnswerCorrect(option, question.correctAnswer, question.options);
                        isUserChoice = isAnswerCorrect(option, feedbackData.selectedAnswer, question.options);
                        showIcon = isCorrect || isUserChoice;
                        if (isCorrect) {
                            buttonVariant = 'success';
                        } else if (isUserChoice && !isCorrect) {
                            buttonVariant = 'primary';
                        } else {
                            buttonVariant = 'option';
                        }
                    }

                    return (
                        <div key={index} style={{ position: 'relative' }}>
                            <SafeButton
                                onClick={() => !showFeedback && handleSelect(option)}
                                variant={buttonVariant}
                                disabled={showFeedback}
                            >
                                {option}
                            </SafeButton>
                            {showFeedback && feedbackData && (isCorrect || isUserChoice) && (
                                <div style={{
                                    position: 'absolute',
                                    right: '16px',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    width: '28px',
                                    height: '28px',
                                    borderRadius: '50%',
                                    background: isCorrect ? '#10b981' : '#ef4444',
                                    zIndex: 2
                                }}>
                                    {isCorrect ? (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 12L11 15L16 9" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                                        </svg>
                                    ) : (
                                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M8 8L16 16M16 8L8 16" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
                                        </svg>
                                    )}
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
            <div style={{ display: 'flex', gap: 14, marginTop: 12, justifyContent: 'center', width: '100%' }}>
                <SafeButton
                    onClick={handleSkip}
                    variant="secondary"
                    style={{ flex: 1, maxWidth: 150 }}
                    disabled={showFeedback}
                >
                    Skip
                </SafeButton>
                <SafeButton
                    onClick={showFeedback ? handleNext : handleSubmit}
                    variant="primary"
                    disabled={!showFeedback && !effectiveSelected}
                    style={{ flex: 1, maxWidth: 150 }}
                >
                    {showFeedback ? 'Next' : 'Submit'}
                </SafeButton>
            </div>
        </div>
    );
};

// Calculator modal (persistent, draggable, resizable)
const DESMOS_URL = "https://www.desmos.com/testing/cb-sat-ap/graphing";
const CalculatorModal: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [position, setPosition] = useState({ x: 80, y: 80 });
    const [size, setSize] = useState({ width: 400, height: 500 });
    const [dragging, setDragging] = useState(false);
    const [resizing, setResizing] = useState(false);
    const [dragStart, setDragStart] = useState<{ x: number; y: number } | null>(null);
    const [resizeStart, setResizeStart] = useState<{ x: number; y: number; width: number; height: number } | null>(null);
    const calcRef = React.useRef<HTMLDivElement>(null);

    // Drag handlers
    const onDragMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setDragging(true);
        setDragStart({ x: e.clientX - position.x, y: e.clientY - position.y });
    };
    React.useEffect(() => {
        if (!dragging) return;
        const onMove = (e: MouseEvent) => {
            setPosition({ x: e.clientX - (dragStart?.x || 0), y: e.clientY - (dragStart?.y || 0) });
        };
        const onUp = () => setDragging(false);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };
    }, [dragging, dragStart]);

    // Resize handlers
    const onResizeMouseDown = (e: React.MouseEvent) => {
        e.preventDefault();
        setResizing(true);
        setResizeStart({ x: e.clientX, y: e.clientY, width: size.width, height: size.height });
    };
    React.useEffect(() => {
        if (!resizing) return;
        const onMove = (e: MouseEvent) => {
            if (!resizeStart) return;
            const newWidth = Math.max(300, resizeStart.width + (e.clientX - resizeStart.x));
            const newHeight = Math.max(300, resizeStart.height + (e.clientY - resizeStart.y));
            setSize({ width: newWidth, height: newHeight });
        };
        const onUp = () => setResizing(false);
        window.addEventListener('mousemove', onMove);
        window.addEventListener('mouseup', onUp);
        return () => {
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
        };
    }, [resizing, resizeStart]);

    // Keep calculator in viewport
    React.useEffect(() => {
        const { innerWidth, innerHeight } = window;
        setPosition(pos => ({
            x: Math.max(0, Math.min(pos.x, innerWidth - size.width)),
            y: Math.max(0, Math.min(pos.y, innerHeight - size.height)),
        }));
        // eslint-disable-next-line
    }, [size.width, size.height]);

    return (
        <div
            ref={calcRef}
            style={{
                position: 'fixed',
                top: position.y,
                left: position.x,
                background: '#fff',
                border: '1.5px solid #e5e7eb',
                borderRadius: 8,
                boxShadow: '0 2px 16px rgba(0,0,0,0.13)',
                zIndex: 1000,
                width: size.width,
                height: size.height,
                padding: 0,
                minWidth: 300,
                minHeight: 300,
                maxWidth: '95vw',
                maxHeight: '95vh',
                userSelect: dragging || resizing ? 'none' : 'auto',
            }}
        >
            {/* Drag bar */}
            <div
                style={{ 
                    cursor: 'move', 
                    background: '#f3f4f6', 
                    borderTopLeftRadius: 8, 
                    borderTopRightRadius: 8, 
                    padding: 8, 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center' 
                }}
                onMouseDown={onDragMouseDown}
            >
                <span style={{ 
                    color: textColors.accent, 
                    ...applyTypography(typography.ui.button.md)
                }}>SAT Calculator</span>
                <button 
                    onClick={onClose} 
                    style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: textColors.accent, 
                        cursor: 'pointer',
                        ...applyTypography(typography.ui.button.lg),
                        fontSize: '20px',
                        fontWeight: 700,
                    }} 
                    aria-label="Close Calculator"
                >×</button>
            </div>
            <iframe
                src={DESMOS_URL}
                title="SAT Calculator"
                style={{ width: '100%', height: size.height - 40, border: 'none', borderRadius: 8 }}
                allowFullScreen
            />
            {/* Resize handle */}
            <div
                style={{
                    position: 'absolute',
                    right: 0,
                    bottom: 0,
                    width: 24,
                    height: 24,
                    cursor: 'nwse-resize',
                    zIndex: 2,
                    background: 'transparent',
                    display: 'flex',
                    alignItems: 'flex-end',
                    justifyContent: 'flex-end',
                }}
                onMouseDown={onResizeMouseDown}
            >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="16 20 20 20 20 16"/><line x1="14" y1="20" x2="20" y2="14"/></svg>
            </div>
        </div>
    );
};

// Performance Dropdown Button component
const PerformanceDropdownButton: React.FC<{
  answers: { [id: string]: string };
  allQuestions: any[];
  questionNumber: number;
  totalQuestions: number;
}> = ({ answers, allQuestions, questionNumber, totalQuestions }) => {
  // Import the progress storage functions
  const [detailedAnswers, setDetailedAnswers] = React.useState<{ [id: string]: string }>({});
  
  React.useEffect(() => {
    try {
      // Import the getAnsweredQuestionsMap function dynamically
      import('../utils/progressStorage').then(({ getAnsweredQuestionsMap }) => {
        const storedAnswers = getAnsweredQuestionsMap();
        setDetailedAnswers(storedAnswers);
        console.log('PerformanceDropdown DEBUG:');
        console.log('- Stored answers from localStorage:', storedAnswers);
        console.log('- Session answers:', answers);
        console.log('- Total questions passed:', allQuestions.length);
        console.log('- Merged answers:', { ...answers, ...storedAnswers });
        console.log('- Keys in merged:', Object.keys({ ...answers, ...storedAnswers }));
      }).catch(err => {
        console.error('Failed to load progress storage:', err);
        setDetailedAnswers({});
      });
    } catch (err) {
      console.error('Error loading stored answers:', err);
      setDetailedAnswers({});
    }
  }, [answers, allQuestions, questionNumber, totalQuestions]);

  // We'll use only detailed answers from localStorage for counting
  // Session answers are not needed for performance tracking since they're already saved to localStorage

  const [open, setOpen] = React.useState(false);
  const [catOpen, setCatOpen] = React.useState<{ [cat: string]: boolean }>({});
  const [domainOpen, setDomainOpen] = React.useState<{ [key: string]: boolean }>({});
  const [skillOpen, setSkillOpen] = React.useState<{ [key: string]: boolean }>({});
  const [showAllTime, setShowAllTime] = React.useState(true);
  const [showResetConfirm, setShowResetConfirm] = React.useState(false);

  // Helper: get correct/total and color for a set of questions (only answered questions)
  function getStats(questions: any[], useSessionData = false) {
    // Choose data source based on toggle state
    const selectedAnswers = useSessionData ? answers : detailedAnswers;
    const answeredQuestions = questions.filter(q => {
      const hasAnswer = selectedAnswers[q.id] !== undefined && 
                       selectedAnswers[q.id] !== null && 
                       selectedAnswers[q.id] !== '' &&
                       selectedAnswers[q.id] !== '__ANSWERED__';
      return hasAnswer;
    });
    
    const correctAnswers = answeredQuestions.filter(q => {
      const userAnswer = selectedAnswers[q.id];
      return isAnswerCorrect(userAnswer, q.correctAnswer, q.options);
    });
    
    const total = answeredQuestions.length;
    const correct = correctAnswers.length;
    const percent = total > 0 ? correct / total : 0;
    
    // Debug logging for overall stats
    if (questions === allQuestions) {
      console.log('=== FINAL getStats DEBUG (Overall) ===');
      console.log('- Using session data:', useSessionData);
      console.log('- Total questions available:', questions.length);
      console.log('- Selected answers object:', selectedAnswers);
      console.log('- Selected answer keys:', Object.keys(selectedAnswers));
      console.log('- Answered questions found:', answeredQuestions.length);
      console.log('- Correct answers:', correct);
      console.log('- Display will show: ' + correct + '/' + total);
      
      // Verify each answered question
      answeredQuestions.forEach((q, i) => {
        const userAnswer = selectedAnswers[q.id];
        const isCorrect = isAnswerCorrect(userAnswer, q.correctAnswer, q.options);
        console.log(`  ${i+1}. Question ${q.id}: User="${userAnswer}" Correct="${q.correctAnswer}" ✓=${isCorrect}`);
      });
    }
    
    return { correct, total, percent };
  }
  function getColor(percent: number, total?: number) {
    // If total is 0, show gray
    if (typeof total === 'number' && total === 0) return '#a3a3a3';
    if (isNaN(percent)) return '#a3a3a3'; // gray for 0/0
    // 0/1 = red, 1/1 = green, gradient in between
    // Use HSL: 0deg (red) to 120deg (green)
    const hue = percent * 120; // 0 = red, 120 = green
    return `hsl(${hue}, 70%, 48%)`;
  }

  // Group by category
  const categories = Array.from(new Set(allQuestions.map(q => q.category)));
  // Remove 'additional topics in math' from filter if present
  const filteredCategories = categories.filter(cat => cat.toLowerCase() !== 'additional topics in math');
  const byCategory: { [cat: string]: any[] } = {};
  filteredCategories.forEach(cat => {
    byCategory[cat] = allQuestions.filter(q => q.category === cat);
  });

  // Group by domain within category
  const getDomains = (cat: string) => {
    const doms = Array.from(new Set(byCategory[cat].map(q => q.domain)));
    const byDom: { [dom: string]: any[] } = {};
    doms.forEach(dom => {
      byDom[dom] = byCategory[cat].filter(q => q.domain === dom);
    });
    return byDom;
  };

  // Group by skill within domain
  const getSkills = (cat: string, dom: string) => {
    const domQs = byCategory[cat].filter(q => q.domain === dom);
    const skills = Array.from(new Set(domQs.map(q => q.skill)));
    const bySkill: { [skill: string]: any[] } = {};
    skills.forEach(skill => {
      bySkill[skill] = domQs.filter(q => q.skill === skill);
    });
    return bySkill;
  };

  // Overall stats (answered only)
  const overallStats = getStats(allQuestions, !showAllTime);

  // Reset progress handler
  const handleResetProgress = () => {
    try {
      import('../utils/progressStorage').then(({ clearProgress }) => {
        clearProgress();
        setDetailedAnswers({});
        setShowResetConfirm(false);
        console.log('Progress reset successfully');
      }).catch(err => {
        console.error('Failed to reset progress:', err);
      });
    } catch (err) {
      console.error('Error resetting progress:', err);
    }
  };

  return (
    <div style={{ position: 'relative', display: 'inline-block' }}>
      <button
        title={`Show Performance`}
        style={{
          padding: '10px',
          borderRadius: 14,
          width: 44,
          height: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: 'none', // No background
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          transition: 'all 0.2s',
        }}
        onClick={() => setOpen(v => !v)}
        aria-label="Show Performance"
        onMouseEnter={e => { e.currentTarget.style.background = 'rgba(16,185,129,0.08)'; }}
        onMouseLeave={e => { e.currentTarget.style.background = 'none'; }}
      >
        {/* Bar chart icon for stats/performance */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="13" width="3.5" height="8" rx="1.5" fill="#10b981"/>
          <rect x="8.5" y="9" width="3.5" height="12" rx="1.5" fill="#f59e42"/>
          <rect x="14" y="5" width="3.5" height="16" rx="1.5" fill="#6366f1"/>
        </svg>
      </button>
      {open && (
        <div style={{
          position: 'absolute',
          top: 54,
          left: '50%',
          transform: 'translateX(-50%)',
          minWidth: 540,
          width: 'max-content',
          maxWidth: '90vw',
          background: '#fff',
          border: '1.5px solid #e5e7eb',
          borderRadius: 12,
          boxShadow: '0 8px 32px rgba(16,24,40,0.12)',
          zIndex: 10,
          padding: '14px 20px', // smaller padding
          textAlign: 'left',
          animation: 'fadeInScale 0.2s',
          maxHeight: 420,
          overflowY: 'auto',
          overflowX: 'auto',
          whiteSpace: 'nowrap',
          fontSize: 13 // smaller default font size
        }}>
          <div style={{ fontWeight: 700, color: getColor(overallStats.percent, overallStats.total), fontSize: 18, marginBottom: 8 }}>Performance</div>
          
          {/* Toggle Controls */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12, padding: '8px 12px', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
              <span style={{ fontSize: 13, fontWeight: 500, color: '#475569' }}>Stats:</span>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ fontSize: 12, color: showAllTime ? '#10b981' : '#94a3b8' }}>All-time</span>
                <button
                  onClick={() => setShowAllTime(!showAllTime)}
                  style={{
                    width: 44,
                    height: 22,
                    borderRadius: 11,
                    border: 'none',
                    background: showAllTime ? '#10b981' : '#cbd5e1',
                    position: 'relative',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                  aria-label={`Switch to ${showAllTime ? 'current session' : 'all-time'} stats`}
                >
                  <div style={{
                    width: 18,
                    height: 18,
                    borderRadius: '50%',
                    background: '#fff',
                    position: 'absolute',
                    top: 2,
                    left: showAllTime ? 2 : 24,
                    transition: 'all 0.2s ease',
                    boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                  }} />
                </button>
                <span style={{ fontSize: 12, color: !showAllTime ? '#10b981' : '#94a3b8' }}>Session</span>
              </div>
            </div>
            
            {/* Reset Button */}
            <div style={{ position: 'relative' }}>
              {!showResetConfirm ? (
                <button
                  onClick={() => setShowResetConfirm(true)}
                  style={{
                    padding: '4px 8px',
                    fontSize: 11,
                    background: '#fee2e2',
                    color: '#dc2626',
                    border: '1px solid #fecaca',
                    borderRadius: 6,
                    cursor: 'pointer',
                    fontWeight: 500,
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#fecaca'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = '#fee2e2'; }}
                >
                  Reset Progress
                </button>
              ) : (
                <div style={{ display: 'flex', gap: 4 }}>
                  <button
                    onClick={handleResetProgress}
                    style={{
                      padding: '4px 6px',
                      fontSize: 10,
                      background: '#dc2626',
                      color: 'white',
                      border: 'none',
                      borderRadius: 4,
                      cursor: 'pointer',
                      fontWeight: 500
                    }}
                  >
                    Confirm
                  </button>
                  <button
                    onClick={() => setShowResetConfirm(false)}
                    style={{
                      padding: '4px 6px',
                      fontSize: 10,
                      background: '#6b7280',
                      color: 'white',
                      border: 'none',
                      borderRadius: 4,
                      cursor: 'pointer',
                      fontWeight: 500
                    }}
                  >
                    Cancel
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div style={{ fontSize: 15, marginBottom: 8, color: getColor(overallStats.percent, overallStats.total) }}>
            {overallStats.correct} / {overallStats.total} correct {!showAllTime && '(this session)'}
          </div>
          {/* Category Level */}
          {filteredCategories.map(cat => {
            const catStats = getStats(byCategory[cat], !showAllTime);
            return (
              <div key={cat}>
                <button
                  style={{
                    background: 'none', border: 'none', color: getColor(catStats.percent, catStats.total), fontWeight: 600, fontSize: 15, cursor: 'pointer', padding: 0, marginBottom: 2, display: 'flex', alignItems: 'center', gap: 6
                  }}
                  onClick={() => setCatOpen(o => ({ ...o, [cat]: !o[cat] }))}
                  aria-label={`Toggle ${cat}`}
                >
                  <span style={{ fontSize: 17 }}>{cat.charAt(0).toUpperCase() + cat.slice(1)}</span>
                  <span style={{ fontSize: 13, marginLeft: 8 }}>{catStats.correct} / {catStats.total}</span>
                  <span style={{ marginLeft: 6 }}>{catOpen[cat] ? '▼' : '▶'}</span>
                </button>
                {catOpen[cat] && (
                  <div style={{ marginLeft: 16, marginBottom: 4 }}>
                    {/* Domain Level */}
                    {Object.entries(getDomains(cat)).map(([dom, domQs]) => {
                      const domStats = getStats(domQs, !showAllTime);
                      const domKey = cat + ':' + dom;
                      return (
                        <div key={domKey}>
                          <button
                            style={{
                              background: 'none', border: 'none', color: getColor(domStats.percent, domStats.total), fontWeight: 500, fontSize: 14, cursor: 'pointer', padding: 0, marginBottom: 1, display: 'flex', alignItems: 'center', gap: 6
                            }}
                            onClick={() => setDomainOpen(o => ({ ...o, [domKey]: !o[domKey] }))}
                            aria-label={`Toggle ${dom}`}
                          >
                            <span>{dom}</span>
                            <span style={{ fontSize: 12, marginLeft: 8 }}>{domStats.correct} / {domStats.total}</span>
                            <span style={{ marginLeft: 6 }}>{domainOpen[domKey] ? '▼' : '▶'}</span>
                          </button>
                          {domainOpen[domKey] && (
                            <div style={{ marginLeft: 16, marginBottom: 2 }}>
                              {/* Skill Level */}
                              {Object.entries(getSkills(cat, dom)).map(([skill, skillQs]) => {
                                const skillStats = getStats(skillQs, !showAllTime);
                                const skillKey = domKey + ':' + skill;
                                return (
                                  <div key={skillKey} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 2, fontSize: 12, color: getColor(skillStats.percent, skillStats.total), fontWeight: 400, whiteSpace: 'nowrap' }}>
                                    <span>{skill}</span>
                                    <span style={{ fontSize: 10, marginLeft: 8 }}>{skillStats.correct} / {skillStats.total}</span>
                                  </div>
                                );
                              })}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default QuestionDisplay;