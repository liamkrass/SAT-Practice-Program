import React from 'react';
import { Link } from 'react-router-dom';
import { typography, applyTypography, textColors } from '../styles/typography';

const Home: React.FC = () => {
    return (
        <div style={{
            minHeight: '100vh',
            background: 'linear-gradient(135deg, #f8fafc 0%, #e0e7ff 100%)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
        }}>
            <div style={{
                background: '#fff',
                borderRadius: 28,
                boxShadow: '0 8px 32px rgba(60,72,100,0.13)',
                padding: '60px 40px',
                maxWidth: 480,
                width: '100%',
                textAlign: 'center',
                border: '1.5px solid #e5e7eb'
            }}>
                <h1 style={{
                    ...applyTypography(typography.display.lg),
                    color: textColors.primary,
                    marginBottom: 20,
                }}>
                    SAT Practice
                </h1>
                <p style={{
                    ...applyTypography(typography.body.xl),
                    color: textColors.secondary,
                    marginBottom: 48,
                }}>
                    Master the SAT with comprehensive practice questions
                </p>
                
                <Link 
                    to="/practice" 
                    style={{
                        display: 'inline-block',
                        background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)',
                        color: textColors.white,
                        textDecoration: 'none',
                        borderRadius: 20,
                        padding: '20px 40px',
                        boxShadow: '0 6px 28px rgba(99, 102, 241, 0.25)',
                        border: '2px solid #6366f1',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                        ...applyTypography(typography.ui.button.lg),
                    }}
                    onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-3px)';
                        e.currentTarget.style.boxShadow = '0 8px 32px rgba(99, 102, 241, 0.35)';
                    }}
                    onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '0 6px 28px rgba(99, 102, 241, 0.25)';
                    }}
                >
                    Start Practice
                </Link>
            </div>
        </div>
    );
};

export default Home;