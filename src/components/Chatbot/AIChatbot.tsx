import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Bot, User } from 'lucide-react';
import { useAIStore } from '../../store/aiStore';

export function AIChatbot() {
  const [inputMessage, setInputMessage] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const { chatMessages, isTyping, sendMessage, clearChat } = useAIStore();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [chatMessages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    try {
      await sendMessage(inputMessage);
      setInputMessage('');
    } catch (error) {
      console.error('Chatbot error:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 max-w-4xl mx-auto"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#3D405B] mb-2">AI Health Assistant</h2>
        <p className="text-[#6D6875]">Get instant health advice and symptom analysis</p>
      </div>

      <div className="bg-white/60 backdrop-blur-lg rounded-2xl border border-white/20 shadow-lg h-[600px] flex flex-col">
        <div className="flex-1 p-6 overflow-y-auto space-y-4">
          <AnimatePresence>
            {chatMessages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className={`flex items-start space-x-3 ${message.isBot ? '' : 'flex-row-reverse space-x-reverse'}`}
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  message.isBot ? 'bg-[#D4A373]' : 'bg-[#B5838D]'
                }`}>
                  {message.isBot ? <Bot className="w-5 h-5 text-white" /> : <User className="w-5 h-5 text-white" />}
                </div>
                
                <div className={`max-w-xs lg:max-w-md px-4 py-3 rounded-2xl ${
                  message.isBot 
                    ? 'bg-white/80 text-[#3D405B]' 
                    : 'bg-[#D4A373] text-white'
                }`}>
                  <p className="text-sm leading-relaxed">{message.text}</p>
                  <p className={`text-xs mt-1 ${
                    message.isBot ? 'text-[#6D6875]' : 'text-white/70'
                  }`}>
                    {new Date(message.timestamp).toLocaleTimeString()}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isTyping && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start space-x-3"
            >
              <div className="w-10 h-10 rounded-full bg-[#D4A373] flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div className="bg-white/80 px-4 py-3 rounded-2xl">
                <div className="flex space-x-1">
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -5, 0] }}
                      transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.1 }}
                      className="w-2 h-2 bg-[#D4A373] rounded-full"
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
          <div ref={messagesEndRef} />
        </div>

        <div className="p-6 border-t border-white/20">
          <div className="flex space-x-3">
            <input
              type="text"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              placeholder="Type your message..."
              className="flex-1 p-3 border border-[#D4A373]/20 rounded-xl focus:ring-2 focus:ring-[#D4A373] focus:border-transparent"
            />
            <motion.button
              onClick={handleSendMessage}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#D4A373] text-white p-3 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
            >
              <Send className="w-5 h-5" />
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}