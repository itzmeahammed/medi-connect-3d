import { Doctor, Appointment, Bed, DiseaseStats, FloorPlan } from '../types';

export const mockDoctors: Doctor[] = [
  {
    id: '1',
    name: 'Dr. Sarah Chen',
    specialization: 'Cardiology',
    experience: 12,
    rating: 4.9,
    availability: ['09:00', '10:00', '14:00', '15:00'],
    avatar: 'https://images.pexels.com/photos/5215024/pexels-photo-5215024.jpeg?auto=compress&cs=tinysrgb&w=200',
    department: 'Cardiac Care'
  },
  {
    id: '2',
    name: 'Dr. Michael Rodriguez',
    specialization: 'Neurology',
    experience: 15,
    rating: 4.8,
    availability: ['11:00', '13:00', '16:00', '17:00'],
    avatar: 'https://images.pexels.com/photos/6749773/pexels-photo-6749773.jpeg?auto=compress&cs=tinysrgb&w=200',
    department: 'Neuroscience'
  },
  {
    id: '3',
    name: 'Dr. Emily Johnson',
    specialization: 'Pediatrics',
    experience: 8,
    rating: 4.9,
    availability: ['08:00', '09:00', '13:00', '14:00'],
    avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=200',
    department: 'Children\'s Care'
  },
  {
    id: '4',
    name: 'Dr. James Wilson',
    specialization: 'Orthopedics',
    experience: 20,
    rating: 4.7,
    availability: ['10:00', '11:00', '15:00', '16:00'],
    avatar: 'https://images.pexels.com/photos/6749775/pexels-photo-6749775.jpeg?auto=compress&cs=tinysrgb&w=200',
    department: 'Orthopedic Surgery'
  },
  {
    id: '5',
    name: 'Dr. Lisa Park',
    specialization: 'Emergency Medicine',
    experience: 10,
    rating: 4.8,
    availability: ['24/7'],
    avatar: 'https://images.pexels.com/photos/5452293/pexels-photo-5452293.jpeg?auto=compress&cs=tinysrgb&w=200',
    department: 'Emergency'
  },
  {
    id: '6',
    name: 'Dr. Robert Kim',
    specialization: 'Internal Medicine',
    experience: 18,
    rating: 4.6,
    availability: ['09:00', '11:00', '14:00', '16:00'],
    avatar: 'https://images.pexels.com/photos/6749773/pexels-photo-6749773.jpeg?auto=compress&cs=tinysrgb&w=200',
    department: 'General Medicine'
  }
];

export const mockAppointments: Appointment[] = [
  {
    id: '1',
    patientId: 'patient1',
    doctorId: '1',
    date: '2025-01-20',
    time: '09:00',
    symptoms: 'Chest pain, shortness of breath',
    status: 'scheduled',
    type: 'in-person'
  },
  {
    id: '2',
    patientId: 'patient2',
    doctorId: '2',
    date: '2025-01-20',
    time: '11:00',
    symptoms: 'Severe headaches, dizziness',
    status: 'scheduled',
    type: 'teleconsultation'
  },
  {
    id: '3',
    patientId: 'patient1',
    doctorId: '3',
    date: '2025-01-21',
    time: '14:00',
    symptoms: 'Child fever and cough',
    status: 'completed',
    type: 'in-person'
  }
];

export const mockBeds: Bed[] = [
  { id: 'A101', ward: 'ICU', floor: 1, status: 'occupied', patientId: 'p1', lastUpdated: '2025-01-19T10:30:00Z' },
  { id: 'A102', ward: 'ICU', floor: 1, status: 'available', lastUpdated: '2025-01-19T09:15:00Z' },
  { id: 'A103', ward: 'ICU', floor: 1, status: 'reserved', lastUpdated: '2025-01-19T11:45:00Z' },
  { id: 'A104', ward: 'ICU', floor: 1, status: 'available', lastUpdated: '2025-01-19T08:20:00Z' },
  { id: 'B201', ward: 'General', floor: 2, status: 'occupied', patientId: 'p2', lastUpdated: '2025-01-19T08:20:00Z' },
  { id: 'B202', ward: 'General', floor: 2, status: 'available', lastUpdated: '2025-01-19T12:10:00Z' },
  { id: 'B203', ward: 'General', floor: 2, status: 'occupied', patientId: 'p3', lastUpdated: '2025-01-19T07:30:00Z' },
  { id: 'B204', ward: 'General', floor: 2, status: 'available', lastUpdated: '2025-01-19T13:25:00Z' },
  { id: 'C301', ward: 'Pediatrics', floor: 3, status: 'occupied', patientId: 'p4', lastUpdated: '2025-01-19T07:30:00Z' },
  { id: 'C302', ward: 'Pediatrics', floor: 3, status: 'available', lastUpdated: '2025-01-19T13:25:00Z' },
  { id: 'C303', ward: 'Pediatrics', floor: 3, status: 'reserved', lastUpdated: '2025-01-19T06:45:00Z' },
  { id: 'D401', ward: 'Emergency', floor: 4, status: 'available', lastUpdated: '2025-01-19T06:45:00Z' },
  { id: 'D402', ward: 'Emergency', floor: 4, status: 'occupied', patientId: 'p5', lastUpdated: '2025-01-19T14:20:00Z' },
  { id: 'D403', ward: 'Emergency', floor: 4, status: 'maintenance', lastUpdated: '2025-01-19T06:45:00Z' }
];

export const mockDiseaseStats: DiseaseStats[] = [
  { name: 'Hypertension', cases: 234, percentage: 28, trend: 'up' },
  { name: 'Diabetes', cases: 189, percentage: 23, trend: 'stable' },
  { name: 'Respiratory Issues', cases: 156, percentage: 19, trend: 'down' },
  { name: 'Cardiac Conditions', cases: 134, percentage: 16, trend: 'up' },
  { name: 'Neurological', cases: 112, percentage: 14, trend: 'stable' }
];

export const mockFloorPlans: FloorPlan[] = [
  { 
    id: '1', 
    name: 'Ground Floor', 
    floor: 0, 
    departments: ['Emergency', 'Reception', 'Pharmacy', 'Radiology'], 
    bedCount: 8, 
    occupancy: 6,
    rooms: [
      { id: 'E001', name: 'Emergency Room 1', type: 'Emergency', beds: 2, position: { x: -4, y: 0, z: -2 } },
      { id: 'E002', name: 'Emergency Room 2', type: 'Emergency', beds: 2, position: { x: -4, y: 0, z: 2 } },
      { id: 'R001', name: 'Reception', type: 'Reception', beds: 0, position: { x: 0, y: 0, z: 0 } },
      { id: 'P001', name: 'Pharmacy', type: 'Pharmacy', beds: 0, position: { x: 4, y: 0, z: -2 } },
      { id: 'X001', name: 'Radiology', type: 'Radiology', beds: 4, position: { x: 4, y: 0, z: 2 } }
    ]
  },
  { 
    id: '2', 
    name: 'First Floor', 
    floor: 1, 
    departments: ['ICU', 'Surgery', 'Recovery'], 
    bedCount: 24, 
    occupancy: 18,
    rooms: [
      { id: 'I101', name: 'ICU Room 1', type: 'ICU', beds: 1, position: { x: -6, y: 3, z: -3 } },
      { id: 'I102', name: 'ICU Room 2', type: 'ICU', beds: 1, position: { x: -6, y: 3, z: -1 } },
      { id: 'I103', name: 'ICU Room 3', type: 'ICU', beds: 1, position: { x: -6, y: 3, z: 1 } },
      { id: 'I104', name: 'ICU Room 4', type: 'ICU', beds: 1, position: { x: -6, y: 3, z: 3 } },
      { id: 'S101', name: 'Surgery Room 1', type: 'Surgery', beds: 1, position: { x: 0, y: 3, z: -3 } },
      { id: 'S102', name: 'Surgery Room 2', type: 'Surgery', beds: 1, position: { x: 0, y: 3, z: 3 } },
      { id: 'R101', name: 'Recovery Ward A', type: 'Recovery', beds: 6, position: { x: 6, y: 3, z: -2 } },
      { id: 'R102', name: 'Recovery Ward B', type: 'Recovery', beds: 6, position: { x: 6, y: 3, z: 2 } }
    ]
  },
  { 
    id: '3', 
    name: 'Second Floor', 
    floor: 2, 
    departments: ['General Medicine', 'Cardiology'], 
    bedCount: 32, 
    occupancy: 24,
    rooms: [
      { id: 'G201', name: 'General Ward A', type: 'General', beds: 8, position: { x: -4, y: 6, z: -3 } },
      { id: 'G202', name: 'General Ward B', type: 'General', beds: 8, position: { x: -4, y: 6, z: 3 } },
      { id: 'C201', name: 'Cardiology Room 1', type: 'Cardiology', beds: 4, position: { x: 4, y: 6, z: -3 } },
      { id: 'C202', name: 'Cardiology Room 2', type: 'Cardiology', beds: 4, position: { x: 4, y: 6, z: 0 } },
      { id: 'C203', name: 'Cardiology Room 3', type: 'Cardiology', beds: 4, position: { x: 4, y: 6, z: 3 } }
    ]
  },
  { 
    id: '4', 
    name: 'Third Floor', 
    floor: 3, 
    departments: ['Pediatrics', 'Maternity', 'NICU'], 
    bedCount: 28, 
    occupancy: 19,
    rooms: [
      { id: 'P301', name: 'Pediatrics Ward A', type: 'Pediatrics', beds: 6, position: { x: -4, y: 9, z: -2 } },
      { id: 'P302', name: 'Pediatrics Ward B', type: 'Pediatrics', beds: 6, position: { x: -4, y: 9, z: 2 } },
      { id: 'M301', name: 'Maternity Room 1', type: 'Maternity', beds: 4, position: { x: 2, y: 9, z: -3 } },
      { id: 'M302', name: 'Maternity Room 2', type: 'Maternity', beds: 4, position: { x: 2, y: 9, z: 0 } },
      { id: 'N301', name: 'NICU', type: 'NICU', beds: 8, position: { x: 6, y: 9, z: 2 } }
    ]
  },
  { 
    id: '5', 
    name: 'Fourth Floor', 
    floor: 4, 
    departments: ['Neurology', 'Oncology', 'Orthopedics'], 
    bedCount: 20, 
    occupancy: 15,
    rooms: [
      { id: 'N401', name: 'Neurology Room 1', type: 'Neurology', beds: 4, position: { x: -4, y: 12, z: -2 } },
      { id: 'N402', name: 'Neurology Room 2', type: 'Neurology', beds: 4, position: { x: -4, y: 12, z: 2 } },
      { id: 'O401', name: 'Oncology Ward', type: 'Oncology', beds: 6, position: { x: 2, y: 12, z: 0 } },
      { id: 'T401', name: 'Orthopedic Room 1', type: 'Orthopedics', beds: 3, position: { x: 6, y: 12, z: -2 } },
      { id: 'T402', name: 'Orthopedic Room 2', type: 'Orthopedics', beds: 3, position: { x: 6, y: 12, z: 2 } }
    ]
  }
];

export const generateMockAnalytics = () => {
  return {
    patientFlow: Array.from({ length: 7 }, (_, i) => ({
      day: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'][i],
      patients: Math.floor(Math.random() * 50) + 30,
      discharges: Math.floor(Math.random() * 40) + 20
    })),
    bedOccupancy: Array.from({ length: 30 }, (_, i) => ({
      date: new Date(Date.now() - (29 - i) * 24 * 60 * 60 * 1000).toLocaleDateString(),
      occupied: Math.floor(Math.random() * 20) + 60,
      available: Math.floor(Math.random() * 15) + 25
    }))
  };
};

// Enhanced hospital map data with detailed room layouts
export const mockHospitalMap = {
  floors: mockFloorPlans,
  totalBeds: mockBeds.length,
  occupancyRate: Math.round((mockBeds.filter(b => b.status === 'occupied').length / mockBeds.length) * 100)
};

// AI Response Templates for local simulation
export const aiResponseTemplates = {
  symptoms: {
    'chest pain': {
      probableConditions: [
        { name: 'Angina', confidence: '75%' },
        { name: 'Heart Arrhythmia', confidence: '60%' },
        { name: 'Muscle Strain', confidence: '40%' }
      ],
      urgencyLevel: 'high' as const,
      recommendedDepartment: 'Cardiac Care',
      recommendedSpecialization: 'Cardiology',
      nextSteps: 'Seek immediate medical attention. Monitor symptoms closely.',
      redFlags: ['Severe chest pain', 'Difficulty breathing', 'Sweating'],
      disclaimer: 'This is not a medical diagnosis. Please consult with a healthcare professional.',
      recommendedDoctors: mockDoctors.filter(d => d.specialization === 'Cardiology')
    },
    'headache': {
      probableConditions: [
        { name: 'Tension Headache', confidence: '70%' },
        { name: 'Migraine', confidence: '55%' },
        { name: 'Cluster Headache', confidence: '30%' }
      ],
      urgencyLevel: 'medium' as const,
      recommendedDepartment: 'Neuroscience',
      recommendedSpecialization: 'Neurology',
      nextSteps: 'Monitor frequency and intensity. Consider stress management.',
      redFlags: ['Sudden severe headache', 'Vision changes', 'Neck stiffness'],
      disclaimer: 'This is not a medical diagnosis. Please consult with a healthcare professional.',
      recommendedDoctors: mockDoctors.filter(d => d.specialization === 'Neurology')
    },
    'fever': {
      probableConditions: [
        { name: 'Viral Infection', confidence: '65%' },
        { name: 'Bacterial Infection', confidence: '45%' },
        { name: 'Flu', confidence: '50%' }
      ],
      urgencyLevel: 'medium' as const,
      recommendedDepartment: 'General Medicine',
      recommendedSpecialization: 'Internal Medicine',
      nextSteps: 'Rest, hydration, monitor temperature. Seek care if fever persists.',
      redFlags: ['High fever >103°F', 'Difficulty breathing', 'Severe dehydration'],
      disclaimer: 'This is not a medical diagnosis. Please consult with a healthcare professional.',
      recommendedDoctors: mockDoctors.filter(d => d.specialization === 'Internal Medicine')
    },
    'default': {
      probableConditions: [
        { name: 'General Health Consultation', confidence: '80%' }
      ],
      urgencyLevel: 'low' as const,
      recommendedDepartment: 'General Medicine',
      recommendedSpecialization: 'Internal Medicine',
      nextSteps: 'Schedule a routine consultation for proper evaluation.',
      redFlags: [],
      disclaimer: 'This is not a medical diagnosis. Please consult with a healthcare professional.',
      recommendedDoctors: mockDoctors.slice(0, 3)
    }
  },
  
  chatResponses: {
    'hello': "Hello! I'm your AI health assistant. Please describe your symptoms and I'll help you understand what might be causing them and suggest the right specialist to see.",
    'chest pain': "Chest pain can have various causes. Given your symptoms, I recommend seeing a cardiologist urgently. Common causes include angina, heart arrhythmia, or muscle strain. Please seek immediate medical attention if the pain is severe.",
    'headache': "Headaches can range from tension headaches to migraines. Based on your description, I suggest consulting with a neurologist if headaches are frequent or severe. In the meantime, ensure you're staying hydrated and getting adequate rest.",
    'fever': "Fever often indicates your body is fighting an infection. Monitor your temperature and other symptoms. If fever persists above 101°F (38.3°C) or is accompanied by severe symptoms, please seek medical attention promptly.",
    'default': "Thank you for sharing your symptoms. I recommend scheduling an appointment with one of our specialists for a proper evaluation. Would you like me to help you book an appointment based on your symptoms?"
  }
};

// Local storage keys
export const STORAGE_KEYS = {
  USER: 'mediconnect_user',
  APPOINTMENTS: 'mediconnect_appointments',
  BEDS: 'mediconnect_beds',
  CHAT_HISTORY: 'mediconnect_chat_history'
};

// Utility functions for local data management
export const localStorageService = {
  getUser: () => {
    const user = localStorage.getItem(STORAGE_KEYS.USER);
    return user ? JSON.parse(user) : null;
  },
  
  setUser: (user: any) => {
    localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(user));
  },
  
  removeUser: () => {
    localStorage.removeItem(STORAGE_KEYS.USER);
  },
  
  getAppointments: () => {
    const appointments = localStorage.getItem(STORAGE_KEYS.APPOINTMENTS);
    return appointments ? JSON.parse(appointments) : mockAppointments;
  },
  
  setAppointments: (appointments: any[]) => {
    localStorage.setItem(STORAGE_KEYS.APPOINTMENTS, JSON.stringify(appointments));
  },
  
  getBeds: () => {
    const beds = localStorage.getItem(STORAGE_KEYS.BEDS);
    return beds ? JSON.parse(beds) : mockBeds;
  },
  
  setBeds: (beds: any[]) => {
    localStorage.setItem(STORAGE_KEYS.BEDS, JSON.stringify(beds));
  },
  
  getChatHistory: () => {
    const history = localStorage.getItem(STORAGE_KEYS.CHAT_HISTORY);
    return history ? JSON.parse(history) : [];
  },
  
  setChatHistory: (history: any[]) => {
    localStorage.setItem(STORAGE_KEYS.CHAT_HISTORY, JSON.stringify(history));
  }
};