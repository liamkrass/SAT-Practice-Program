import React, { useMemo } from 'react';
import SafeButton from './SafeButton';
import { typography, applyTypography, textColors } from '../styles/typography';

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
}

interface QuestionFilterProps {
  selectedDomains: string[];
  onDomainsChange: (domains: string[]) => void;
  onClose: () => void;
  questions: Question[];
}

const QuestionFilter: React.FC<QuestionFilterProps> = ({
  selectedDomains,
  onDomainsChange,
  onClose,
  questions
}) => {
  // Get all unique domains from questions, filtering out 'Additional topics in math'
  const allDomains = useMemo(() => {
    const set = new Set<string>();
    questions.forEach(q => { if (q.domain) set.add(q.domain); });
    return Array.from(set)
      .filter(domain => domain.toLowerCase() !== 'additional topics in math')
      .sort();
  }, [questions]);

  // Toggle domain selection
  const toggleDomain = (domain: string) => {
    if (selectedDomains.includes(domain)) {
      onDomainsChange(selectedDomains.filter(d => d !== domain));
    } else {
      onDomainsChange([...selectedDomains, domain]);
    }
  };

  // Reset all
  const reset = () => onDomainsChange([]);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: 'rgba(30,41,59,0.25)',
        zIndex: 300,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backdropFilter: 'blur(8px)'
      }}
      onClick={onClose}
    >
      <div
        style={{
          background: '#fff',
          borderRadius: 24,
          boxShadow: '0 12px 48px rgba(60,72,100,0.15)',
          padding: 24,
          maxWidth: 400,
          width: '92vw',
          maxHeight: '90vh',
          overflow: 'auto',
          position: 'relative'
        }}
        onClick={e => e.stopPropagation()}
      >
        <div style={{ marginBottom: 18, textAlign: 'center' }}>
          <h2 style={{
            ...applyTypography(typography.heading.lg),
            color: textColors.primary,
            marginBottom: 0
          }}>
            Filter Domains
          </h2>
        </div>
        <div style={{ marginBottom: 18 }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: 10
          }}>
            {allDomains.map(domain => (
              <label key={domain} style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                background: selectedDomains.includes(domain)
                  ? 'linear-gradient(90deg, #10b981 0%, #34d399 100%)'
                  : '#f8fafc',
                color: selectedDomains.includes(domain)
                  ? textColors.white : textColors.primary,
                border: '2px solid',
                borderColor: selectedDomains.includes(domain)
                  ? '#10b981' : '#e5e7eb',
                borderRadius: 10,
                padding: '10px 12px',
                cursor: 'pointer',
                fontWeight: selectedDomains.includes(domain) ? 600 : 500,
                boxShadow: selectedDomains.includes(domain)
                  ? '0 2px 8px rgba(16, 185, 129, 0.10)'
                  : '0 1px 4px rgba(0,0,0,0.03)',
                transition: 'all 0.2s ease'
              }}>
                <input
                  type="checkbox"
                  checked={selectedDomains.includes(domain)}
                  onChange={() => toggleDomain(domain)}
                  style={{ accentColor: '#10b981', width: 16, height: 16 }}
                />
                <span>{domain}</span>
              </label>
            ))}
          </div>
        </div>
        <div style={{
          display: 'flex',
          gap: 10,
          justifyContent: 'flex-end',
          paddingTop: 10,
          borderTop: '1px solid #e5e7eb'
        }}>
          <SafeButton
            variant="secondary"
            onClick={reset}
            disabled={selectedDomains.length === 0}
          >
            Reset
          </SafeButton>
          <SafeButton
            variant="primary"
            onClick={onClose}
          >
            Apply
          </SafeButton>
        </div>
      </div>
    </div>
  );
};

export default QuestionFilter;
