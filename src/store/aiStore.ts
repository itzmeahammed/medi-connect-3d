import { create } from 'zustand';
import { localAIAPI } from '../services/localApiService';
import { localStorageService } from '../utils/mockData';

interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string;
}

interface AIAnalysis {
  probableConditions: { name: string; confidence: string }[];
  urgencyLevel: 'low' | 'medium' | 'high';
  recommendedDepartment: string;
  recommendedSpecialization: string;
  nextSteps: string;
  redFlags: string[];
  disclaimer: string;
  recommendedDoctors?: any[];
}

interface AIState {
  chatMessages: ChatMessage[];
  isTyping: boolean;
  lastAnalysis: AIAnalysis | null;
  isAnalyzing: boolean;
  sendMessage: (message: string, conversationId?: string) => Promise<void>;
  analyzeSymptoms: (symptoms: string, age?: number, medicalHistory?: string) => Promise<AIAnalysis>;
  clearChat: () => void;
  loadChatHistory: (conversationId?: string) => Promise<void>;
}

export const useAIStore = create<AIState>((set, get) => ({
  chatMessages: [
    {
      id: '1',
      text: "Hello! I'm your AI health assistant. How can I help you today?",
      isBot: true,
      timestamp: new Date().toISOString()
    }
  ],
  isTyping: false,
  lastAnalysis: null,
  isAnalyzing: false,

  sendMessage: async (message: string, conversationId?: string) => {
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      text: message,
      isBot: false,
      timestamp: new Date().toISOString()
    };

    set(state => ({
      chatMessages: [...state.chatMessages, userMessage],
      isTyping: true
    }));

    try {
      const response = await localAIAPI.chat(message, conversationId);
      const botMessage: ChatMessage = {
        id: (Date.now() + 1).toString(),
        text: response.data.response,
        isBot: true,
        timestamp: new Date().toISOString()
      };

      set(state => ({
        chatMessages: [...state.chatMessages, botMessage],
        isTyping: false
      }));
    } catch (error) {
      console.error('Chat error:', error);
      set({ isTyping: false });
    }
  },

  analyzeSymptoms: async (symptoms: string, age?: number, medicalHistory?: string) => {
    set({ isAnalyzing: true });
    try {
      const response = await localAIAPI.analyzeSymptoms(symptoms, age, medicalHistory);
      const analysis = response.data;
      set({ lastAnalysis: analysis, isAnalyzing: false });
      return analysis;
    } catch (error) {
      console.error('Symptom analysis error:', error);
      set({ isAnalyzing: false });
      throw error;
    }
  },

  clearChat: () => {
    set({
      chatMessages: [
        {
          id: '1',
          text: "Hello! I'm your AI health assistant. How can I help you today?",
          isBot: true,
          timestamp: new Date().toISOString()
        }
      ]
    });
    localStorageService.setChatHistory([]);
  },

  loadChatHistory: async (conversationId?: string) => {
    try {
      const response = await localAIAPI.getChatHistory(conversationId);
      if (response.data.length > 0) {
        set({ chatMessages: response.data });
      }
    } catch (error) {
      console.error('Failed to load chat history:', error);
    }
  }
}));