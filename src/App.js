import React from 'react';
import { useConversation } from './hooks/useConversation';
import InputArea from './components/InputArea';

function App() {
  const { messages, isTyping, currentStep, handleUserAnswer, userData } = useConversation();
  
  // Get the very last message from the bot to display as the main question
  const latestBotMessage = messages.filter(m => m.sender === 'bot').slice(-1)[0]?.text;

  return (
    <div className="container" style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      height: '100vh', 
      overflow: 'hidden' // Prevents the whole page from bouncing
    }}>
      
      {/* Header Area - Fixed at top */}
      <div style={{ 
        position: 'fixed', 
        top: '40px', 
        left: 0, 
        width: '100%', 
        textAlign: 'center', 
        color: '#cbd5e1', 
        fontSize: '11px', 
        letterSpacing: '3px', 
        fontWeight: 'bold',
        zIndex: 10 
      }}>
        NIMHANS CLINICAL PROTOCOL • CONFIDENTIAL
      </div>

      {/* NEW: Scrollable Main Content Area */}
      <main style={{ 
        flex: 1, 
        overflowY: 'auto', // Allows scrolling if content is long
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        padding: '100px 20px 120px 20px', // Space for header and footer
        width: '100%'
      }}>
        
        {/* Simplified Thank You part for Patients */}
        {!currentStep && !isTyping ? (
          <div style={{ 
            animation: 'slideUp 0.8s ease', 
            textAlign: 'center', 
            background: '#ffffff', 
            padding: '60px 40px', 
            borderRadius: '32px', 
            width: '100%', 
            maxWidth: '500px',
            boxShadow: '0 20px 50px rgba(0,0,0,0.05)',
            border: '1px solid #f1f5f9'
          }}>
            <div style={{ fontSize: '50px', marginBottom: '20px' }}>✅</div>
            <h2 style={{ marginBottom: '20px', color: '#1e293b', fontSize: '28px' }}>Thank you, {userData.name || 'there'}.</h2>
            <p style={{ color: '#64748b', lineHeight: '1.6', fontSize: '18px', marginBottom: '30px' }}>
              Your responses have been securely recorded. This will help your counselor understand your situation better before your session begins.
            </p>
            <div style={{ 
              padding: '15px', 
              background: '#f8fafc', 
              borderRadius: '12px', 
              fontSize: '14px', 
              color: '#94a3b8',
              border: '1px solid #f1f5f9'
            }}>
              Your privacy is our priority. This information is shared only with your clinical team.
            </div>
          </div>
        ) : (
          /* Otherwise, show the active question and input */
          <div style={{ width: '100%', maxWidth: '800px', textAlign: 'center' }}>
            {isTyping ? (
              <div style={{ fontSize: '18px', color: '#94a3b8', fontStyle: 'italic' }}>Thinking...</div>
            ) : (
              <h1 style={{ 
                transition: 'all 0.5s ease', 
                fontSize: 'clamp(1.5rem, 5vw, 3rem)', // Text shrinks if long
                marginBottom: '40px' 
              }}>
                {latestBotMessage}
              </h1>
            )}

            <InputArea 
              currentStep={currentStep} 
              onSendMessage={handleUserAnswer} 
              isTyping={isTyping} 
            />
          </div>
        )}
      </main>

      {/* Progress Bar - Fixed at bottom */}
      <div style={{ 
        position: 'fixed', 
        bottom: '0', 
        left: '0', 
        height: '6px', 
        background: '#10b981', 
        transition: 'width 1s cubic-bezier(0.4, 0, 0.2, 1)', 
        zIndex: 10,
        width: `${currentStep ? (messages.filter(m => m.sender === 'bot').length / 12) * 100 : 100}%` 
      }} />
    </div>
  );
}

export default App;