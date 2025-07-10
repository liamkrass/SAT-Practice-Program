import React, { useState } from 'react';
import SafeButton from './SafeButton';

const ButtonTest: React.FC = () => {
  const [clickCount, setClickCount] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>('');

  const handleClick = () => {
    console.log('Button clicked!');
    setClickCount(prev => prev + 1);
  };

  const handleOptionSelect = (option: string) => {
    console.log('Option selected:', option);
    setSelectedOption(option);
  };

  return (
    <div style={{ padding: '40px', maxWidth: '500px', margin: '0 auto' }}>
      <h2>Button Test Component</h2>
      
      <div style={{ marginBottom: '20px' }}>
        <h3>Basic Button Test</h3>
        <SafeButton onClick={handleClick} variant="primary">
          Click Me! (Clicked {clickCount} times)
        </SafeButton>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Option Buttons Test</h3>
        {['Option A', 'Option B', 'Option C', 'Option D'].map((option, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <SafeButton
              onClick={() => handleOptionSelect(option)}
              variant={selectedOption === option ? 'selected' : 'option'}
            >
              {option}
            </SafeButton>
          </div>
        ))}
        <p>Selected: {selectedOption || 'None'}</p>
      </div>

      <div style={{ marginBottom: '20px' }}>
        <h3>Different Variants</h3>
        <div style={{ display: 'flex', gap: '10px', flexDirection: 'column' }}>
          <SafeButton onClick={handleClick} variant="primary">Primary</SafeButton>
          <SafeButton onClick={handleClick} variant="secondary">Secondary</SafeButton>
          <SafeButton onClick={handleClick} variant="success">Success</SafeButton>
          <SafeButton onClick={handleClick} variant="option">Option</SafeButton>
          <SafeButton onClick={handleClick} variant="selected">Selected</SafeButton>
        </div>
      </div>

      <div>
        <h3>Disabled Button</h3>
        <SafeButton onClick={handleClick} variant="primary" disabled>
          Disabled Button
        </SafeButton>
      </div>
    </div>
  );
};

export default ButtonTest;
