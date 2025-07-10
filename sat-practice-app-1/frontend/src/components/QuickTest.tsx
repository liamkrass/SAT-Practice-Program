import React, { useState, useRef, useEffect } from 'react';

interface QuickTestProps {
  onTestResult: (result: string) => void;
}

const QuickTest: React.FC<QuickTestProps> = ({ onTestResult }) => {
  const [clicks, setClicks] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (button) {
      const handleClick = () => {
        console.log('Native click event fired');
        setClicks(prev => prev + 1);
        onTestResult('Native event works!');
      };

      button.addEventListener('click', handleClick);
      return () => button.removeEventListener('click', handleClick);
    }
  }, [onTestResult]);

  return (
    <div style={{ padding: '20px', border: '2px solid red', margin: '10px' }}>
      <h3>Quick Button Test</h3>
      <button
        ref={buttonRef}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#6366f1',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer'
        }}
      >
        Test Button (Clicked {clicks} times)
      </button>
      
      <button
        onClick={() => {
          console.log('React onClick fired');
          setClicks(prev => prev + 1);
          onTestResult('React onClick works!');
        }}
        style={{
          padding: '12px 24px',
          fontSize: '16px',
          backgroundColor: '#10b981',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          cursor: 'pointer',
          marginLeft: '10px'
        }}
      >
        React Button (Clicked {clicks} times)
      </button>
    </div>
  );
};

export default QuickTest;
