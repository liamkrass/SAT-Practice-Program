import React, { useState, useEffect } from 'react';
import { typography, applyTypography, textColors } from '../styles/typography';

interface WelcomePopupProps {
  onClose: () => void;
}

const WELCOME_POPUP_KEY = 'sat-app-welcome-shown';

const WelcomePopup: React.FC<WelcomePopupProps> = ({ onClose }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Small delay for smooth animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsVisible(false);
    // Save to localStorage that user has seen the welcome message
    localStorage.setItem(WELCOME_POPUP_KEY, 'true');
    // Small delay for animation before calling parent onClose
    setTimeout(onClose, 200);
  };

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(0, 0, 0, 0.7)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 2000,
        padding: '20px',
        opacity: isVisible ? 1 : 0,
        transition: 'opacity 0.3s ease-out'
      }}
      onClick={handleClose}
    >
      <div
        style={{
          background: 'linear-gradient(135deg, #ffffff 0%, #f8fafc 100%)',
          borderRadius: 24,
          boxShadow: '0 20px 60px rgba(0, 0, 0, 0.2)',
          padding: '40px 32px',
          maxWidth: 480,
          width: '100%',
          position: 'relative',
          border: '2px solid #e2e8f0',
          transform: isVisible ? 'scale(1) translateY(0)' : 'scale(0.9) translateY(20px)',
          transition: 'all 0.3s ease-out'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div style={{ 
          textAlign: 'center', 
          marginBottom: 28,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 12
        }}>
          {/* Welcome icon */}
          <div style={{
            width: 60,
            height: 60,
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 8px 25px rgba(99, 102, 241, 0.3)'
          }}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" 
                    fill="white" stroke="white" strokeWidth="1"/>
            </svg>
          </div>
          
          <h2 style={{
            ...applyTypography(typography.heading.xl),
            color: textColors.primary,
            margin: 0,
            fontWeight: 700
          }}>
            Welcome to SAT Practice! 👋
          </h2>
        </div>

        {/* Message content */}
        <div style={{
          background: '#f8fafc',
          borderRadius: 16,
          padding: '24px',
          marginBottom: 24,
          border: '1px solid #e2e8f0'
        }}>
          <p style={{
            ...applyTypography(typography.body.lg),
            color: textColors.primary,
            margin: 0,
            lineHeight: '1.6',
            textAlign: 'left'
          }}>
            A lot of new people are using this so I just want everyone to know that:
          </p>
          
          <div style={{ marginTop: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {/* English section */}
            <div style={{
              background: '#eff6ff',
              borderRadius: 12,
              padding: '16px',
              border: '1px solid #dbeafe'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: '20px' }}>📝</span>
                <span style={{
                  ...applyTypography(typography.body.md),
                  fontWeight: 600,
                  color: '#1e40af'
                }}>
                  For English Questions:
                </span>
              </div>
              <p style={{
                ...applyTypography(typography.body.md),
                color: '#1e40af',
                margin: 0,
                lineHeight: '1.5'
              }}>
                <strong>AI Generated is your best bet</strong> - the question bank ones are broken.
              </p>
            </div>

            {/* Math section */}
            <div style={{
              background: '#f0fdf4',
              borderRadius: 12,
              padding: '16px',
              border: '1px solid #dcfce7'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                <span style={{ fontSize: '20px' }}>🔢</span>
                <span style={{
                  ...applyTypography(typography.body.md),
                  fontWeight: 600,
                  color: '#166534'
                }}>
                  For Math Questions:
                </span>
              </div>
              <p style={{
                ...applyTypography(typography.body.md),
                color: '#166534',
                margin: 0,
                lineHeight: '1.5'
              }}>
                The <strong>question bank works fine</strong> but some visual elements are broken and I'm too lazy to do anything about it.
              </p>
            </div>
          </div>
        </div>

        {/* Close button */}
        <button
          onClick={handleClose}
          style={{
            width: '100%',
            background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
            color: 'white',
            border: 'none',
            borderRadius: 16,
            padding: '16px 24px',
            cursor: 'pointer',
            ...applyTypography(typography.ui.button.lg),
            fontWeight: 600,
            boxShadow: '0 4px 16px rgba(99, 102, 241, 0.3)',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 6px 24px rgba(99, 102, 241, 0.4)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(99, 102, 241, 0.3)';
          }}
        >
          Got it, let's start practicing! 🚀
        </button>
      </div>
    </div>
  );
};

// Helper function to check if user has seen the welcome popup
export const shouldShowWelcomePopup = (): boolean => {
  return !localStorage.getItem(WELCOME_POPUP_KEY);
};

// Helper function to mark welcome popup as shown (for testing)
export const markWelcomePopupAsShown = (): void => {
  localStorage.setItem(WELCOME_POPUP_KEY, 'true');
};

// Helper function to reset welcome popup (for testing)
export const resetWelcomePopup = (): void => {
  localStorage.removeItem(WELCOME_POPUP_KEY);
};

export default WelcomePopup;
