import React from 'react';
import { useLocation } from 'react-router-dom';
import ScoreSummary from '../components/ScoreSummary';
import SkillBreakdown from '../components/SkillBreakdown';
import { typography, applyTypography, textColors } from '../styles/typography';

interface LocationState {
    overallScore?: number;
    mathScore?: number;
    verbalScore?: number;
    skillBreakdown?: Record<string, number>;
}

const Results: React.FC = () => {
    const location = useLocation<LocationState>();
    const state = location.state || {};
    const { overallScore = 0, mathScore = 0, verbalScore = 0, skillBreakdown = {} } = state;

    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
            padding: '40px 20px'
        }}>
            <div style={{
                maxWidth: '800px',
                margin: '0 auto',
                background: '#fff',
                borderRadius: 28,
                boxShadow: '0 8px 32px rgba(60,72,100,0.13)',
                padding: '48px 32px',
                border: '1.5px solid #e5e7eb'
            }}>
                <h1 style={{
                    ...applyTypography(typography.display.md),
                    color: textColors.primary,
                    textAlign: 'center',
                    marginBottom: 32
                }}>Practice Results</h1>
                <ScoreSummary overallScore={overallScore} mathScore={mathScore} verbalScore={verbalScore} skillBreakdown={skillBreakdown} />
                <SkillBreakdown skills={Object.entries(skillBreakdown).map(([name, score]) => ({ name, score, maxScore: 1 }))} />
            </div>
        </div>
    );
};

export default Results;