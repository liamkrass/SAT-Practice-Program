// QuestionStats.tsx - Display comprehensive question statistics
import React from 'react';
import { mathQuestions, questionStats } from '../data/mathQuestions';
import { typography, applyTypography, textColors } from '../styles/typography';

interface QuestionStatsProps {
  onClose?: () => void;
  className?: string;
}

export const QuestionStats: React.FC<QuestionStatsProps> = ({ onClose, className = "" }) => {
  const stats = questionStats;
  
  // Calculate domain distribution
  const domainCounts = mathQuestions.reduce((acc: Record<string, number>, q) => {
    const domain = q.domain || 'Unknown';
    acc[domain] = (acc[domain] || 0) + 1;
    return acc;
  }, {});
  
  // Calculate skill distribution
  const skillCounts = mathQuestions.reduce((acc: Record<string, number>, q) => {
    const skill = q.skill || 'Unknown';
    acc[skill] = (acc[skill] || 0) + 1;
    return acc;
  }, {});
  
  // Get questions with visuals
  const questionsWithVisuals = mathQuestions.filter(q => 
    q.visual && q.visual !== 'None'
  );

  return (
    <div className={`question-stats-container ${className}`} style={{
      padding: '24px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      {onClose && (
        <button 
          onClick={onClose}
          style={{
            float: 'right',
            background: 'none',
            border: 'none',
            fontSize: '24px',
            cursor: 'pointer',
            color: '#666'
          }}
        >
          ×
        </button>
      )}
      
      <h2 style={{
        ...applyTypography(typography.heading.lg),
        color: textColors.primary,
        marginBottom: '24px',
        textAlign: 'center'
      }}>
        📊 SAT Question Database
      </h2>
      
      {/* Overview Stats */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '16px',
        marginBottom: '32px'
      }}>
        <div style={{
          padding: '16px',
          backgroundColor: '#f8f9fa',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#2563eb'
          }}>
            {stats.total}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            Total Questions
          </div>
        </div>
        
        <div style={{
          padding: '16px',
          backgroundColor: '#f0f8ff',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#059669'
          }}>
            {mathQuestions.length}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            Math Questions
          </div>
        </div>
        
        <div style={{
          padding: '16px',
          backgroundColor: '#fef3c7',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#d97706'
          }}>
            {0}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            Verbal Questions
          </div>
        </div>
        
        <div style={{
          padding: '16px',
          backgroundColor: '#f3e8ff',
          borderRadius: '8px',
          textAlign: 'center'
        }}>
          <div style={{
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#7c3aed'
          }}>
            {questionsWithVisuals.length}
          </div>
          <div style={{ fontSize: '14px', color: '#666' }}>
            With Visuals
          </div>
        </div>
      </div>
      
      {/* Domain Breakdown */}
      <div style={{ marginBottom: '32px' }}>
        <h3 style={{
          ...applyTypography(typography.heading.md),
          color: textColors.primary,
          marginBottom: '16px'
        }}>
          📚 By Domain
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '12px'
        }}>
          {Object.entries(domainCounts)
            .sort(([,a], [,b]) => (Number(b) - Number(a)))
            .map(([domain, count]) => (
              <div key={domain} style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: '12px 16px',
                backgroundColor: '#f8f9fa',
                borderRadius: '6px',
                border: '1px solid #e9ecef'
              }}>
                <span style={{ 
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#495057'
                }}>
                  {domain}
                </span>
                <span style={{
                  backgroundColor: '#2563eb',
                  color: 'white',
                  padding: '4px 8px',
                  borderRadius: '12px',
                  fontSize: '12px',
                  fontWeight: 'bold'
                }}>
                  {count}
                </span>
              </div>
            ))}
        </div>
      </div>
      
      {/* Source Breakdown */}
      <div style={{ marginBottom: '24px' }}>
        <h3 style={{
          ...applyTypography(typography.heading.md),
          color: textColors.primary,
          marginBottom: '16px'
        }}>
          📖 Sources
        </h3>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '12px'
        }}>
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#dcfce7',
            borderRadius: '6px',
            border: '1px solid #bbf7d0'
          }}>
            <div style={{ fontWeight: 'bold', color: '#166534' }}>
              College Board RTF
            </div>
            <div style={{ fontSize: '12px', color: '#166534' }}>
              {mathQuestions.length} authentic SAT questions
            </div>
          </div>
          
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#dbeafe',
            borderRadius: '6px',
            border: '1px solid #93c5fd'
          }}>
            <div style={{ fontWeight: 'bold', color: '#1e40af' }}>
              Khan Academy Style
            </div>
            <div style={{ fontSize: '12px', color: '#1e40af' }}>
              15 practice questions
            </div>
          </div>
          
          <div style={{
            padding: '12px 16px',
            backgroundColor: '#fef3c7',
            borderRadius: '6px',
            border: '1px solid #fde68a'
          }}>
            <div style={{ fontWeight: 'bold', color: '#92400e' }}>
              Practice Tests
            </div>
            <div style={{ fontSize: '12px', color: '#92400e' }}>
              Sample questions for testing
            </div>
          </div>
        </div>
      </div>
      
      {/* Features */}
      <div style={{
        padding: '16px',
        backgroundColor: '#f0f8ff',
        borderRadius: '8px',
        border: '1px solid #bfdbfe'
      }}>
        <h4 style={{
          margin: '0 0 12px 0',
          color: '#1e40af',
          fontSize: '16px',
          fontWeight: 'bold'
        }}>
          🎯 Perfect for 1450+ → 1600 Improvement
        </h4>
        
        <ul style={{
          margin: 0,
          paddingLeft: '20px',
          color: '#1e40af',
          fontSize: '14px',
          lineHeight: '1.6'
        }}>
          <li>Authentic College Board questions with proper domain/skill categorization</li>
          <li>Visual elements automatically rendered (graphs, tables, diagrams)</li>
          <li>Comprehensive skill tracking across all SAT math domains</li>
          <li>Adaptive practice based on performance analytics</li>
          <li>Real-time visual feedback and explanations</li>
        </ul>
      </div>
    </div>
  );
};

export default QuestionStats;
