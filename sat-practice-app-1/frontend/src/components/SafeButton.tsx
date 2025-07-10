import React from 'react';
import { typography, applyTypography, textColors } from '../styles/typography';

interface SafeButtonProps {
  children: React.ReactNode;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'success' | 'option' | 'selected';
  disabled?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

const SafeButton: React.FC<SafeButtonProps> = ({
  children,
  onClick,
  variant = 'primary',
  disabled = false,
  className = '',
  style = {}
}) => {
  const getVariantStyles = (): React.CSSProperties => {
    const baseStyles: React.CSSProperties = {
      border: 'none',
      borderRadius: '16px',
      padding: '14px 18px',
      cursor: disabled ? 'not-allowed' : 'pointer',
      outline: 'none',
      transition: 'all 0.15s ease',
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      fontSize: '16px',
      fontWeight: 500,
      textAlign: 'left',
      width: '100%',
      opacity: disabled ? 0.7 : 1,
      userSelect: 'none',
      // Ensure button can receive clicks
      pointerEvents: disabled ? 'none' : 'auto',
      position: 'relative',
      zIndex: 1
    };

    switch (variant) {
      case 'primary':
        return {
          ...baseStyles,
          background: 'linear-gradient(90deg, #6366f1 0%, #818cf8 100%)',
          color: textColors.white,
          border: '2px solid #6366f1'
        };
      case 'secondary':
        return {
          ...baseStyles,
          background: '#f4f6fb',
          color: textColors.accent,
          border: '2px solid #e5e7eb'
        };
      case 'success':
        return {
          ...baseStyles,
          background: 'linear-gradient(90deg, #10b981 0%, #34d399 100%)',
          color: textColors.white,
          border: '2px solid #10b981'
        };
      case 'option':
        return {
          ...baseStyles,
          background: '#f4f6fb',
          color: textColors.primary,
          border: '2px solid #e5e7eb'
        };
      case 'selected':
        return {
          ...baseStyles,
          background: 'linear-gradient(90deg, #a5b4fc 0%, #6366f1 100%)',
          color: textColors.white,
          border: '2px solid #6366f1'
        };
      default:
        return baseStyles;
    }
  };

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!disabled) {
      console.log('SafeButton: Click event fired for variant:', variant);
      onClick();
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log('SafeButton: Mouse down event for variant:', variant);
  };

  return (
    <button
      onClick={handleClick}
      onMouseDown={handleMouseDown}
      disabled={disabled}
      className={className}
      style={{
        ...getVariantStyles(),
        ...style
      }}
    >
      {children}
    </button>
  );
};

export default SafeButton;
