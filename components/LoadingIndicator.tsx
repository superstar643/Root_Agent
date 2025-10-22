
import React from 'react';

const LoadingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-2">
      <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse"></div>
      <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse delay-200"></div>
      <div className="w-2.5 h-2.5 bg-blue-400 rounded-full animate-pulse delay-400"></div>
    </div>
  );
};

export default LoadingIndicator;
