import React from 'react';

const ClickTest: React.FC = () => {
  const handleClick = () => {
    alert('Click is working!');
    console.log('Test button clicked successfully');
  };

  return (
    <div style={{
      position: 'fixed',
      top: 20,
      left: 20,
      zIndex: 9999,
      padding: 20,
      background: 'red',
      color: 'white',
      borderRadius: 8
    }}>
      <button 
        onClick={handleClick}
        style={{
          padding: '10px 20px',
          background: 'blue',
          color: 'white',
          border: 'none',
          borderRadius: 4,
          cursor: 'pointer'
        }}
      >
        TEST CLICK
      </button>
    </div>
  );
};

export default ClickTest;
