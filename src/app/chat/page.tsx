'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Image from 'next/image';
import { companions } from '@/data/companions';
import { motion, AnimatePresence } from 'framer-motion';
import { generateChatResponse } from '@/lib/chat-service';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

interface ChatHistory {
  companionId: string;
  messages: Message[];
}

export default function ChatPage() {
  const [selectedCompanion, setSelectedCompanion] = useState(companions[0]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [showSidebar, setShowSidebar] = useState(true);
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleAIResponse = useCallback(async (userMessage: string) => {
    setIsTyping(true);
    try {
      const chatHistory = messages.map(msg => ({
        role: msg.sender === 'user' ? 'user' as const : 'assistant' as const,
        content: msg.text
      }));

      const response = await generateChatResponse(selectedCompanion, userMessage, chatHistory);
      
      const aiMessage: Message = {
        id: Date.now().toString(),
        text: response,
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error getting AI response:', error);
    } finally {
      setIsTyping(false);
    }
  }, [messages, selectedCompanion]);

  // Load selected companion from sessionStorage if coming from profile page
  useEffect(() => {
    const storedCompanionId = sessionStorage.getItem('selectedCompanionId');
    if (storedCompanionId) {
      const companion = companions.find(c => c.id === storedCompanionId);
      if (companion) {
        setSelectedCompanion(companion);
        sessionStorage.removeItem('selectedCompanionId');
      }
    }
  }, []);

  // Send welcome message when companion is selected and no history exists
  useEffect(() => {
    const sendWelcomeMessage = async () => {
      if (messages.length === 0) {
        await handleAIResponse(`Hi there! I'm ${selectedCompanion.name}. ${selectedCompanion.description}`);
      }
    };

    sendWelcomeMessage();
  }, [selectedCompanion, messages.length, handleAIResponse]);

  // Load chat history when companion is selected
  useEffect(() => {
    const loadChatHistory = () => {
      try {
        const savedChats = localStorage.getItem('chatHistory');
        if (savedChats) {
          const allChats: ChatHistory[] = JSON.parse(savedChats);
          const currentChat = allChats.find(chat => chat.companionId === selectedCompanion.id);
          if (currentChat) {
            // Convert string timestamps back to Date objects
            const messagesWithDates = currentChat.messages.map(msg => ({
              ...msg,
              timestamp: new Date(msg.timestamp)
            }));
            setMessages(messagesWithDates);
            return;
          }
        }
        // If no history found, start with empty messages
        setMessages([]);
      } catch (error) {
        console.error('Error loading chat history:', error);
        setMessages([]);
      }
    };

    loadChatHistory();
  }, [selectedCompanion.id]);

  // Save chat history whenever messages change
  useEffect(() => {
    const saveChatHistory = () => {
      try {
        const savedChats = localStorage.getItem('chatHistory');
        let allChats: ChatHistory[] = savedChats ? JSON.parse(savedChats) : [];
        
        // Remove old chat history for this companion if it exists
        allChats = allChats.filter(chat => chat.companionId !== selectedCompanion.id);
        
        // Add current chat history
        allChats.push({
          companionId: selectedCompanion.id,
          messages: messages
        });

        // Keep only last 50 messages per companion to manage storage
        allChats = allChats.map(chat => ({
          ...chat,
          messages: chat.messages.slice(-50)
        }));

        localStorage.setItem('chatHistory', JSON.stringify(allChats));
      } catch (error) {
        console.error('Error saving chat history:', error);
      }
    };

    if (messages.length > 0) {
      saveChatHistory();
    }
  }, [messages, selectedCompanion.id]);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setShowSidebar(false); // Hide sidebar on mobile after sending message

    // Get AI response
    await handleAIResponse(inputMessage);
  };

  const handleCompanionSelect = (companion: typeof companions[0]) => {
    setSelectedCompanion(companion);
    setShowSidebar(false); // Hide sidebar on mobile after selection
  };

  const clearChatHistory = () => {
    if (confirm('Are you sure you want to clear your chat history with ' + selectedCompanion.name + '?')) {
      setMessages([]);
      const savedChats = localStorage.getItem('chatHistory');
      if (savedChats) {
        let allChats: ChatHistory[] = JSON.parse(savedChats);
        allChats = allChats.filter(chat => chat.companionId !== selectedCompanion.id);
        localStorage.setItem('chatHistory', JSON.stringify(allChats));
      }
    }
  };

  return (
    <main className="pt-20">
      <div className="flex h-[calc(100vh-5rem)] bg-black">
        {/* Sidebar - Contact List */}
        <AnimatePresence>
          {(showSidebar || window.innerWidth > 768) && (
            <motion.div
              initial={{ x: -320 }}
              animate={{ x: 0 }}
              exit={{ x: -320 }}
              className="absolute md:relative w-80 h-full border-r border-gray-800 flex flex-col bg-black z-20"
            >
              {/* Search Bar */}
              <div className="p-4 border-b border-gray-800">
                <input
                  type="text"
                  placeholder="Search companions..."
                  className="w-full px-4 py-2 rounded-full bg-gray-900 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
                />
              </div>

              {/* Companions List */}
              <div className="flex-1 overflow-y-auto">
                {companions.map(companion => (
                  <motion.div
                    key={companion.id}
                    whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.05)' }}
                    className={`flex items-center gap-4 p-4 cursor-pointer transition-colors ${
                      selectedCompanion.id === companion.id ? 'bg-gray-900' : ''
                    }`}
                    onClick={() => handleCompanionSelect(companion)}
                  >
                    <div className="relative w-12 h-12 rounded-full overflow-hidden">
                      <Image
                        src={companion.image}
                        alt={companion.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-baseline">
                        <h3 className="text-white font-medium truncate">{companion.name}</h3>
                        <span className="text-xs text-gray-400">Online</span>
                      </div>
                      <p className="text-sm text-gray-400 truncate">{companion.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-black/95">
          {/* Chat Header */}
          <div className="h-16 border-b border-gray-800 flex items-center px-6 gap-4">
            <button 
              onClick={() => setShowSidebar(true)}
              className="md:hidden text-white p-2 -ml-2"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="relative w-10 h-10 rounded-full overflow-hidden">
              <Image
                src={selectedCompanion.image}
                alt={selectedCompanion.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <h2 className="text-white font-medium">{selectedCompanion.name}</h2>
              <p className="text-sm text-green-400">Online Now</p>
            </div>
            <div className="flex items-center gap-4">
              <button 
                onClick={clearChatHistory}
                className="text-gray-400 hover:text-white"
                title="Clear chat history"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              <button className="text-gray-400 hover:text-white">
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4">
            {messages.map(message => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {message.sender === 'ai' && (
                  <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                    <Image
                      src={selectedCompanion.image}
                      alt={selectedCompanion.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    message.sender === 'user'
                      ? 'bg-red-600 text-white rounded-tr-none'
                      : 'bg-gray-800 text-white rounded-tl-none'
                  }`}
                >
                  <p>{message.text}</p>
                  <p className="text-xs opacity-50 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </p>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex items-center space-x-2">
                <div className="relative w-8 h-8 rounded-full overflow-hidden mr-2 flex-shrink-0">
                  <Image
                    src={selectedCompanion.image}
                    alt={selectedCompanion.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="bg-gray-800 px-4 py-2 rounded-2xl rounded-tl-none">
                  <div className="flex space-x-2">
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                    <div className="w-2 h-2 bg-gray-500 rounded-full animate-bounce"></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="h-20 border-t border-gray-800 p-4 flex items-center gap-4">
            <button className="text-gray-400 hover:text-white p-2">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </button>
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type a message..."
              className="flex-1 bg-gray-900 rounded-full px-6 py-3 text-white focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button
              onClick={handleSendMessage}
              className="bg-red-600 hover:bg-red-700 text-white rounded-full p-3 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </main>
  );
} 