import React from 'react';

const DotsLoader = () => {
  return (
    <div className="flex space-x-2 justify-center items-center">
      <div className="w-3 h-3 rounded-full animate-pulse-glow" style={{ animationDelay: '0s', background: 'linear-gradient(45deg, #A239F0, #E6A9FF)' }}></div>
      <div className="w-3 h-3 rounded-full animate-pulse-glow" style={{ animationDelay: '0.2s', background: 'linear-gradient(45deg, #A239F0, #E6A9FF)' }}></div>
      <div className="w-3 h-3 rounded-full animate-pulse-glow" style={{ animationDelay: '0.4s', background: 'linear-gradient(45deg, #A239F0, #E6A9FF)' }}></div>
    </div>
  );
};

export default DotsLoader;