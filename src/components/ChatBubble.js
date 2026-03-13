import React from 'react';

const ChatBubble = ({ message, sender }) => {
  const isBot = sender === 'bot';

  return (
    <div className={`flex ${isBot ? 'justify-start' : 'justify-end'} mb-4`}>
      <div
        className={`max-w-[80%] p-4 rounded-2xl shadow-sm ${
          isBot
            ? 'bg-white text-slate-700 rounded-tl-none'
            : 'bg-emerald-600 text-white rounded-tr-none'
        }`}
      >
        <p className="text-sm leading-relaxed">{message}</p>
      </div>
    </div>
  );
};

export default ChatBubble;