import React from 'react';
import { typography, applyTypography, textColors } from '../styles/typography';

interface Skill {
    name: string;
    score: number;
    maxScore: number;
}

interface SkillBreakdownProps {
    skills: Skill[];
}

const SkillBreakdown: React.FC<SkillBreakdownProps> = ({ skills }) => {
    return (
        <div style={{
            background: '#f8fafc',
            borderRadius: 20,
            padding: '32px',
            border: '1px solid #e5e7eb'
        }}>
            <h2 style={{
                ...applyTypography(typography.heading.lg),
                color: textColors.primary,
                marginBottom: 24,
                textAlign: 'center'
            }}>Detailed Skill Analysis</h2>
            
            {skills.length > 0 ? (
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '20px'
                }}>
                    {skills.map((skill, index) => {
                        const percentage = skill.maxScore > 0 ? (skill.score / skill.maxScore) * 100 : 0;
                        const isGood = percentage >= 70;
                        const isOkay = percentage >= 40;
                        
                        return (
                            <div key={index} style={{
                                background: '#fff',
                                borderRadius: 16,
                                padding: '24px',
                                border: '1px solid #e5e7eb',
                                boxShadow: '0 2px 8px rgba(60,72,100,0.06)'
                            }}>
                                <h3 style={{
                                    ...applyTypography(typography.heading.sm),
                                    color: textColors.primary,
                                    marginBottom: 12,
                                    textTransform: 'capitalize'
                                }}>{skill.name}</h3>
                                
                                <div style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: 12
                                }}>
                                    <span style={{
                                        ...applyTypography(typography.body.lg),
                                        color: textColors.primary
                                    }}>
                                        {skill.score} / {skill.maxScore}
                                    </span>
                                    <span style={{
                                        ...applyTypography(typography.heading.sm),
                                        color: isGood ? textColors.success : isOkay ? textColors.warning : textColors.error
                                    }}>
                                        {Math.round(percentage)}%
                                    </span>
                                </div>
                                
                                {/* Progress bar */}
                                <div style={{
                                    width: '100%',
                                    height: 8,
                                    background: '#e5e7eb',
                                    borderRadius: 4,
                                    overflow: 'hidden'
                                }}>
                                    <div style={{
                                        width: `${percentage}%`,
                                        height: '100%',
                                        background: isGood ? 
                                            'linear-gradient(90deg, #10b981, #34d399)' : 
                                            isOkay ? 
                                            'linear-gradient(90deg, #f59e42, #fbbf24)' : 
                                            'linear-gradient(90deg, #ef4444, #f87171)',
                                        transition: 'width 0.5s ease'
                                    }} />
                                </div>
                                
                                <div style={{
                                    marginTop: 8,
                                    ...applyTypography(typography.ui.caption),
                                    color: textColors.secondary
                                }}>
                                    {isGood ? 'Excellent performance' : 
                                     isOkay ? 'Room for improvement' : 
                                     'Needs more practice'}
                                </div>
                            </div>
                        );
                    })}
                </div>
            ) : (
                <div style={{
                    background: '#fff',
                    borderRadius: 16,
                    padding: '40px',
                    textAlign: 'center',
                    border: '1px solid #e5e7eb'
                }}>
                    <p style={{
                        ...applyTypography(typography.body.lg),
                        color: textColors.secondary,
                        margin: 0
                    }}>No skill data available yet. Complete some practice questions to see your skill breakdown!</p>
                </div>
            )}
        </div>
    );
};

export default SkillBreakdown;