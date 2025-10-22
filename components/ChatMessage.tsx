
import React from 'react';
import { ChatMessage as ChatMessageProps, MessageRole } from '../types';

const ChatMessage: React.FC<ChatMessageProps> = ({ role, text }) => {
  const isUser = role === MessageRole.USER;
  const isCommand = text.startsWith('[Send to');

  const containerClasses = isUser ? 'justify-end' : 'justify-start';
  const bubbleClasses = isUser
    ? 'bg-blue-600 text-white'
    : isCommand
    ? 'bg-gray-700 border border-amber-500 text-amber-200 font-mono text-sm'
    : 'bg-gray-700 text-gray-200';

  const icon = isUser ? (
    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center font-bold text-white ml-3 flex-shrink-0">
      U
    </div>
  ) : (
    <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center font-bold text-blue-300 mr-3 flex-shrink-0">
      A
    </div>
  );

  return (
    <div className={`flex items-end w-full ${containerClasses}`}>
      {!isUser && icon}
      <div className={`rounded-lg px-4 py-3 max-w-lg shadow-md ${bubbleClasses}`}>
        <p className="whitespace-pre-wrap">{text}</p>
      </div>
      {isUser && icon}
    </div>
  );
};

export default ChatMessage;
