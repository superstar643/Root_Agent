
import React from 'react';

interface InputBarProps {
  userInput: string;
  setUserInput: (value: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

const InputBar: React.FC<InputBarProps> = ({ userInput, setUserInput, handleSubmit, isLoading }) => {
  return (
    <form onSubmit={handleSubmit} className="p-4 border-t border-gray-700 flex items-center gap-4">
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Ask about emergencies, resources, shelters..."
        className="flex-grow bg-gray-700 text-gray-200 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-shadow"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !userInput.trim()}
        className="bg-blue-600 hover:bg-blue-500 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-full p-3 text-white transition-colors flex-shrink-0"
      >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
          <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
        </svg>
      </button>
    </form>
  );
};

export default InputBar;
