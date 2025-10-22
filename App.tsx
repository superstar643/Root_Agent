
import React, { useState, useRef, useEffect } from 'react';
import { ChatMessage, MessageRole } from './types';
import { getAgentResponse } from './services/geminiService';
import ChatMessageComponent from './components/ChatMessage';
import InputBar from './components/InputBar';
import LoadingIndicator from './components/LoadingIndicator';

const App: React.FC = () => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: MessageRole.AGENT,
      text: 'I am the Crisis Response Root Agent. How can I assist you with emergency information or resources?',
    },
  ]);
  const [userInput, setUserInput] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!userInput.trim() || isLoading) return;

    const userMessage: ChatMessage = { role: MessageRole.USER, text: userInput };
    setMessages((prev) => [...prev, userMessage]);
    setUserInput('');
    setIsLoading(true);

    try {
      const agentResponseText = await getAgentResponse(userInput);
      const agentMessage: ChatMessage = { role: MessageRole.AGENT, text: agentResponseText };
      setMessages((prev) => [...prev, agentMessage]);
    } catch (error) {
      const errorMessage: ChatMessage = {
        role: MessageRole.AGENT,
        text: 'An unexpected error occurred. Please check the console for details.',
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-center p-2 sm:p-4 font-sans">
      <div className="w-full max-w-3xl h-[95vh] sm:h-[90vh] bg-gray-800 rounded-lg shadow-2xl flex flex-col border border-gray-700">
        <header className="p-4 border-b border-gray-700 text-center">
          <h1 className="text-xl sm:text-2xl font-bold text-blue-300">Crisis Response Agent</h1>
          <p className="text-xs sm:text-sm text-gray-400">Triage & Coordination System</p>
        </header>

        <main className="flex-grow p-4 overflow-y-auto space-y-6">
          {messages.map((msg, index) => (
            <ChatMessageComponent key={index} role={msg.role} text={msg.text} />
          ))}
          {isLoading && (
            <div className="flex justify-start">
               <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center font-bold text-blue-300 mr-3 flex-shrink-0">A</div>
              <div className="bg-gray-700 rounded-lg px-4 py-3 max-w-lg shadow-md">
                <LoadingIndicator />
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </main>

        <InputBar 
          userInput={userInput}
          setUserInput={setUserInput}
          handleSubmit={handleSubmit}
          isLoading={isLoading}
        />
      </div>
    </div>
  );
};

export default App;
