
// Modern Typography System for SAT Practice App
// Using Inter, Manrope, and Plus Jakarta Sans for a clean, professional look

export const fonts = {
  // Primary font stack - Inter for body text and UI elements
  primary: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  
  // Display font stack - Manrope for headings and display text
  display: "'Manrope', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  
  // Accent font stack - Plus Jakarta Sans for special elements
  accent: "'Plus Jakarta Sans', 'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
  
  // Monospace for code or data
  mono: "'SF Mono', 'Monaco', 'Inconsolata', 'Roboto Mono', monospace"
};

export const typography = {
  // Display styles for hero sections and main titles
  display: {
    xl: {
      fontFamily: fonts.display,
      fontSize: '4rem', // 64px
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.05em',
    },
    lg: {
      fontFamily: fonts.display,
      fontSize: '3rem', // 48px
      fontWeight: 800,
      lineHeight: 1.15,
      letterSpacing: '-0.04em',
    },
    md: {
      fontFamily: fonts.display,
      fontSize: '2.5rem', // 40px
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.03em',
    },
    sm: {
      fontFamily: fonts.display,
      fontSize: '2rem', // 32px
      fontWeight: 700,
      lineHeight: 1.25,
      letterSpacing: '-0.025em',
    }
  },

  // Heading styles for section titles and important text
  heading: {
    xl: {
      fontFamily: fonts.display,
      fontSize: '1.875rem', // 30px
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.025em',
    },
    lg: {
      fontFamily: fonts.display,
      fontSize: '1.5rem', // 24px
      fontWeight: 700,
      lineHeight: 1.35,
      letterSpacing: '-0.02em',
    },
    md: {
      fontFamily: fonts.accent,
      fontSize: '1.25rem', // 20px
      fontWeight: 600,
      lineHeight: 1.4,
      letterSpacing: '-0.015em',
    },
    sm: {
      fontFamily: fonts.accent,
      fontSize: '1.125rem', // 18px
      fontWeight: 600,
      lineHeight: 1.45,
      letterSpacing: '-0.01em',
    }
  },

  // Body text styles for content and descriptions
  body: {
    xl: {
      fontFamily: fonts.primary,
      fontSize: '1.25rem', // 20px
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: '-0.01em',
    },
    lg: {
      fontFamily: fonts.primary,
      fontSize: '1.125rem', // 18px
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: '-0.005em',
    },
    md: {
      fontFamily: fonts.primary,
      fontSize: '1rem', // 16px
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: '0em',
    },
    sm: {
      fontFamily: fonts.primary,
      fontSize: '0.875rem', // 14px
      fontWeight: 400,
      lineHeight: 1.6,
      letterSpacing: '0.005em',
    }
  },

  // UI element styles for buttons, labels, and interactive elements
  ui: {
    button: {
      lg: {
        fontFamily: fonts.primary,
        fontSize: '1.125rem', // 18px
        fontWeight: 600,
        letterSpacing: '0.01em',
      },
      md: {
        fontFamily: fonts.primary,
        fontSize: '1rem', // 16px
        fontWeight: 600,
        letterSpacing: '0.005em',
      },
      sm: {
        fontFamily: fonts.primary,
        fontSize: '0.875rem', // 14px
        fontWeight: 500,
        letterSpacing: '0.025em',
      }
    },
    
    label: {
      fontFamily: fonts.primary,
      fontSize: '0.875rem', // 14px
      fontWeight: 500,
      letterSpacing: '0.025em',
      textTransform: 'uppercase',
    },
    
    caption: {
      fontFamily: fonts.primary,
      fontSize: '0.75rem', // 12px
      fontWeight: 500,
      letterSpacing: '0.05em',
      color: '#6b7280',
    }
  },

  // Question-specific styles
  question: {
    title: {
      fontFamily: fonts.display,
      fontSize: '1.375rem', // 22px
      fontWeight: 700,
      lineHeight: 1.4,
      letterSpacing: '-0.02em',
      color: '#232946',
    },
    
    option: {
      fontFamily: fonts.primary,
      fontSize: '1rem', // 16px
      fontWeight: 500,
      lineHeight: 1.5,
      letterSpacing: '-0.005em',
    },
    
    number: {
      fontFamily: fonts.primary,
      fontSize: '0.875rem', // 14px
      fontWeight: 600,
      letterSpacing: '0.05em',
      fontVariantNumeric: 'tabular-nums',
    }
  }
};

// Utility function to apply typography styles safely
export const applyTypography = (style: any) => {
  if (!style) return {};
  
  const typographyStyle: any = {};
  
  if (style.fontFamily) typographyStyle.fontFamily = style.fontFamily;
  if (style.fontSize) typographyStyle.fontSize = style.fontSize;
  if (style.fontWeight) typographyStyle.fontWeight = style.fontWeight;
  if (style.lineHeight) typographyStyle.lineHeight = style.lineHeight;
  if (style.letterSpacing) typographyStyle.letterSpacing = style.letterSpacing;
  if (style.color) typographyStyle.color = style.color;
  if (style.textTransform) typographyStyle.textTransform = style.textTransform;
  if (style.fontVariantNumeric) typographyStyle.fontVariantNumeric = style.fontVariantNumeric;
  
  return typographyStyle;
};

// Color palette for text
export const textColors = {
  primary: '#1f2937',
  secondary: '#6b7280',
  tertiary: '#9ca3af',
  accent: '#6366f1',
  success: '#10b981',
  warning: '#f59e42',
  error: '#ef4444',
  white: '#ffffff',
};
