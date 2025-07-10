import React from 'react';
import { typography, applyTypography, textColors } from '../styles/typography';

interface ScoreSummaryProps {
  overallScore: number;
  mathScore: number;
  verbalScore: number;
  skillBreakdown: Record<string, number>;
}

const ScoreSummary: React.FC<ScoreSummaryProps> = ({ overallScore, mathScore, verbalScore, skillBreakdown }) => {
  return (
    <div style={{
      background: '#f8fafc',
      borderRadius: 20,
      padding: '32px',
      marginBottom: '32px',
      border: '1px solid #e5e7eb'
    }}>
      <h2 style={{
        ...applyTypography(typography.heading.lg),
        color: textColors.primary,
        marginBottom: 24,
        textAlign: 'center'
      }}>Score Summary</h2>
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))',
        gap: '20px',
        marginBottom: '24px'
      }}>
        <div style={{
          background: '#fff',
          borderRadius: 16,
          padding: '20px',
          textAlign: 'center',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            ...applyTypography(typography.display.sm),
            color: textColors.accent,
            marginBottom: 8
          }}>{overallScore}</div>
          <div style={{
            ...applyTypography(typography.ui.label),
            color: textColors.secondary
          }}>Overall Score</div>
        </div>
        
        <div style={{
          background: '#fff',
          borderRadius: 16,
          padding: '20px',
          textAlign: 'center',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            ...applyTypography(typography.display.sm),
            color: textColors.success,
            marginBottom: 8
          }}>{mathScore}</div>
          <div style={{
            ...applyTypography(typography.ui.label),
            color: textColors.secondary
          }}>Math Score</div>
        </div>
        
        <div style={{
          background: '#fff',
          borderRadius: 16,
          padding: '20px',
          textAlign: 'center',
          border: '1px solid #e5e7eb'
        }}>
          <div style={{
            ...applyTypography(typography.display.sm),
            color: textColors.warning,
            marginBottom: 8
          }}>{verbalScore}</div>
          <div style={{
            ...applyTypography(typography.ui.label),
            color: textColors.secondary
          }}>Verbal Score</div>
        </div>
      </div>
      
      <h3 style={{
        ...applyTypography(typography.heading.md),
        color: textColors.primary,
        marginBottom: 16
      }}>Skill Breakdown</h3>
      
      <div style={{
        background: '#fff',
        borderRadius: 16,
        padding: '20px',
        border: '1px solid #e5e7eb'
      }}>
        {Object.entries(skillBreakdown).length > 0 ? (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '12px'
          }}>
            {Object.entries(skillBreakdown).map(([skill, score]) => (
              <div key={skill} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '8px 0',
                borderBottom: '1px solid #f3f4f6'
              }}>
                <span style={{
                  ...applyTypography(typography.body.md),
                  color: textColors.primary,
                  textTransform: 'capitalize'
                }}>{skill}</span>
                <span style={{
                  ...applyTypography(typography.heading.sm),
                  color: textColors.accent
                }}>{score}</span>
              </div>
            ))}
          </div>
        ) : (
          <p style={{
            ...applyTypography(typography.body.md),
            color: textColors.secondary,
            textAlign: 'center',
            margin: 0
          }}>No skill data available</p>
        )}
      </div>
    </div>
  );
};

export default ScoreSummary;