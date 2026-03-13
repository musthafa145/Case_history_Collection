import React, { useState, useEffect, useRef } from 'react';

const InputArea = ({ currentStep, onSendMessage, isTyping }) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedOptions, setSelectedOptions] = useState([]); // For Multi-Select
  const inputRef = useRef(null);

  useEffect(() => {
    if (!isTyping && inputRef.current) inputRef.current.focus();
    setInputValue(currentStep?.type === 'slider' ? 50 : '');
    setSelectedOptions([]);
  }, [currentStep, isTyping]);

  const toggleOption = (opt) => {
    if (selectedOptions.includes(opt)) {
      setSelectedOptions(selectedOptions.filter(i => i !== opt));
    } else {
      setSelectedOptions([...selectedOptions, opt]);
    }
  };

  if (!currentStep || isTyping) return null;

  return (
    <div style={{ width: '100%', maxWidth: '600px', margin: '0 auto' }}>
      
      {/* 1. TEXT / VOICE */}
      {(currentStep.type === 'text' || currentStep.type === 'voice_text') && (
        <form onSubmit={(e) => { e.preventDefault(); onSendMessage(inputValue); }}>
          <input ref={inputRef} value={inputValue} onChange={(e) => setInputValue(e.target.value)} placeholder="Type here..." />
          <button type="submit">Continue</button>
        </form>
      )}

      {/* 2. SINGLE CHOICE */}
      {currentStep.type === 'choice' && currentStep.options && (
        <div className="choice-container">
          {currentStep.options.map(option => (
            <button key={option} className="choice-btn" onClick={() => onSendMessage(option)}>
              {option}
            </button>
          ))}
        </div>
      )}

      {/* 3. MULTI-SELECT (For Personality traits) */}
      {currentStep.type === 'multi_select' && (
        <div style={{ textAlign: 'center' }}>
          <div className="choice-container" style={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'center' }}>
            {currentStep.options.map(opt => (
              <button 
                key={opt} 
                className="choice-btn" 
                style={{ width: 'auto', background: selectedOptions.includes(opt) ? '#10b981' : 'white', color: selectedOptions.includes(opt) ? 'white' : '#444' }}
                onClick={() => toggleOption(opt)}
              >
                {opt}
              </button>
            ))}
          </div>
          <button onClick={() => onSendMessage(selectedOptions)}>Confirm Selection</button>
        </div>
      )}

      {/* 4. SLIDER (Biologicals) */}
      {currentStep.type === 'slider' && (
        <div style={{ textAlign: 'center' }}>
          <input type="range" min="0" max="100" value={inputValue} onChange={(e) => setInputValue(e.target.value)} className="modern-slider" />
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#94a3b8', marginTop: '10px' }}>
            <span>{currentStep.labels[0]}</span>
            <span>{currentStep.labels[1]}</span>
          </div>
          <button onClick={() => onSendMessage(inputValue)}>Continue</button>
        </div>
      )}
    </div>
  );
};

export default InputArea;