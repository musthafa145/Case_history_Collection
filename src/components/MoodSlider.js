import React from 'react';

const MoodSlider = ({ value, onChange, labelLeft, labelRight }) => {
  return (
    <div className="w-full max-w-lg mx-auto mt-12">
      <input
        type="range"
        min="0"
        max="100"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          width: '100%',
          height: '6px',
          appearance: 'none',
          background: '#e2e8f0',
          borderRadius: '10px',
          outline: 'none',
          cursor: 'pointer'
        }}
      />
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
        <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '500' }}>{labelLeft}</span>
        <span style={{ fontSize: '14px', color: '#94a3b8', fontWeight: '500' }}>{labelRight}</span>
      </div>
    </div>
  );
};

export default MoodSlider;