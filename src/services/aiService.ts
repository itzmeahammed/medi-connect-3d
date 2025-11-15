import { Doctor } from '../types';
import { mockDoctors } from '../utils/mockData';

export class AIService {
  static async analyzeSymptomsAndRecommendDoctors(symptoms: string): Promise<{
    suggestedConditions: string[];
    recommendedDoctors: Doctor[];
    urgencyLevel: 'low' | 'medium' | 'high';
  }> {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const symptomKeywords = symptoms.toLowerCase();
    let suggestedConditions: string[] = [];
    let recommendedDoctors: Doctor[] = [];
    let urgencyLevel: 'low' | 'medium' | 'high' = 'low';

    // Simple keyword matching for demo purposes
    if (symptomKeywords.includes('chest pain') || symptomKeywords.includes('heart')) {
      suggestedConditions = ['Possible cardiac condition', 'Angina', 'Heart arrhythmia'];
      recommendedDoctors = mockDoctors.filter(d => d.specialization === 'Cardiology');
      urgencyLevel = 'high';
    } else if (symptomKeywords.includes('headache') || symptomKeywords.includes('dizzy')) {
      suggestedConditions = ['Tension headache', 'Migraine', 'Possible neurological issue'];
      recommendedDoctors = mockDoctors.filter(d => d.specialization === 'Neurology');
      urgencyLevel = 'medium';
    } else if (symptomKeywords.includes('fever') || symptomKeywords.includes('cough')) {
      suggestedConditions = ['Upper respiratory infection', 'Flu', 'Common cold'];
      recommendedDoctors = mockDoctors.filter(d => d.specialization === 'General Medicine' || d.specialization === 'Pediatrics');
      urgencyLevel = 'medium';
    } else {
      suggestedConditions = ['General health consultation recommended'];
      recommendedDoctors = mockDoctors.slice(0, 2);
      urgencyLevel = 'low';
    }

    return {
      suggestedConditions,
      recommendedDoctors,
      urgencyLevel
    };
  }

  static async getChatbotResponse(message: string): Promise<string> {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const msg = message.toLowerCase();
    
    if (msg.includes('hello') || msg.includes('hi')) {
      return "Hello! I'm your AI health assistant. Please describe your symptoms and I'll help you understand what might be causing them and suggest the right specialist to see.";
    }
    
    if (msg.includes('chest pain') || msg.includes('heart')) {
      return "Chest pain can have various causes. Given your symptoms, I recommend seeing a cardiologist urgently. Common causes include angina, heart arrhythmia, or muscle strain. Please seek immediate medical attention if the pain is severe.";
    }
    
    if (msg.includes('headache') || msg.includes('head pain')) {
      return "Headaches can range from tension headaches to migraines. Based on your description, I suggest consulting with a neurologist if headaches are frequent or severe. In the meantime, ensure you're staying hydrated and getting adequate rest.";
    }
    
    if (msg.includes('fever') || msg.includes('temperature')) {
      return "Fever often indicates your body is fighting an infection. Monitor your temperature and other symptoms. If fever persists above 101°F (38.3°C) or is accompanied by severe symptoms, please seek medical attention promptly.";
    }
    
    return "Thank you for sharing your symptoms. I recommend scheduling an appointment with one of our specialists for a proper evaluation. Would you like me to help you book an appointment based on your symptoms?";
  }
}