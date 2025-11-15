export interface User {
  id: string;
  name: string;
  email: string;
  role: 'patient' | 'doctor' | 'admin';
  avatar?: string;
}

export interface Doctor {
  id: string;
  name: string;
  specialization: string;
  experience: number;
  rating: number;
  availability: string[];
  avatar: string;
  department: string;
}

export interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  symptoms: string;
  status: 'scheduled' | 'completed' | 'cancelled';
  type: 'in-person' | 'teleconsultation';
}

export interface Bed {
  id: string;
  ward: string;
  floor: number;
  status: 'available' | 'occupied' | 'reserved' | 'maintenance' | 'cleaning';
  patientId?: string;
  lastUpdated: string;
}

export interface ChatMessage {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: string;
}

export interface DiseaseStats {
  name: string;
  cases: number;
  percentage: number;
  trend: 'up' | 'down' | 'stable';
}

export interface FloorPlan {
  id: string;
  name: string;
  floor: number;
  departments: string[];
  bedCount: number;
  occupancy: number;
  rooms?: {
    id: string;
    name: string;
    type: string;
    beds: number;
    position: { x: number; y: number; z: number };
  }[];
}

export interface Room3D {
  id: string;
  name: string;
  type: string;
  beds: number;
  position: { x: number; y: number; z: number };
  status?: 'available' | 'partial' | 'full';
  department?: string;
}