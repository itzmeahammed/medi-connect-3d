import { 
  mockDoctors, 
  mockAppointments, 
  mockBeds, 
  mockFloorPlans,
  aiResponseTemplates,
  localStorageService
} from '../utils/mockData';

// Simulate API delays for realistic UX
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const localAuthAPI = {
  login: async (email: string, password: string) => {
    await delay(1000);
    
    // Demo accounts
    const demoAccounts = [
      { email: 'admin@mediconnect.com', password: 'admin123', role: 'admin', name: 'Admin User' },
      { email: 'sarah.chen@mediconnect.com', password: 'doctor123', role: 'doctor', name: 'Dr. Sarah Chen' },
      { email: 'john@example.com', password: 'patient123', role: 'patient', name: 'John Doe' }
    ];
    
    const user = demoAccounts.find(acc => acc.email === email && acc.password === password);
    
    if (!user) {
      throw new Error('Invalid credentials');
    }
    
    const userData = {
      id: `user_${Date.now()}`,
      name: user.name,
      email: user.email,
      role: user.role
    };
    
    localStorageService.setUser(userData);
    
    return {
      data: {
        user: userData,
        accessToken: 'mock_access_token',
        refreshToken: 'mock_refresh_token'
      }
    };
  },
  
  register: async (userData: any) => {
    await delay(1000);
    
    const newUser = {
      id: `user_${Date.now()}`,
      name: userData.name,
      email: userData.email,
      role: userData.role || 'patient'
    };
    
    localStorageService.setUser(newUser);
    
    return {
      data: {
        user: newUser,
        accessToken: 'mock_access_token',
        refreshToken: 'mock_refresh_token'
      }
    };
  }
};

export const localAppointmentAPI = {
  create: async (appointmentData: any) => {
    await delay(800);
    
    const appointments = localStorageService.getAppointments();
    const newAppointment = {
      id: `apt_${Date.now()}`,
      ...appointmentData,
      status: 'scheduled',
      createdAt: new Date().toISOString()
    };
    
    appointments.push(newAppointment);
    localStorageService.setAppointments(appointments);
    
    return { data: newAppointment };
  },
  
  getAll: async () => {
    await delay(500);
    return { data: localStorageService.getAppointments() };
  },
  
  updateStatus: async (id: string, status: string) => {
    await delay(300);
    
    const appointments = localStorageService.getAppointments();
    const updatedAppointments = appointments.map(apt => 
      apt.id === id ? { ...apt, status, updatedAt: new Date().toISOString() } : apt
    );
    
    localStorageService.setAppointments(updatedAppointments);
    
    return { data: updatedAppointments.find(apt => apt.id === id) };
  },
  
  getDoctorAvailability: async (doctorId: string, date: string) => {
    await delay(400);
    
    const doctor = mockDoctors.find(d => d.id === doctorId);
    const availableSlots = doctor?.availability || [];
    
    return { data: { availableSlots } };
  }
};

export const localBedAPI = {
  getAll: async (params?: any) => {
    await delay(300);
    let beds = localStorageService.getBeds();
    
    if (params?.ward && params.ward !== 'All') {
      beds = beds.filter(bed => bed.ward === params.ward);
    }
    
    if (params?.status) {
      beds = beds.filter(bed => bed.status === params.status);
    }
    
    return { data: beds };
  },
  
  updateStatus: async (id: string, status: string, patientId?: string) => {
    await delay(200);
    
    const beds = localStorageService.getBeds();
    const updatedBeds = beds.map(bed => 
      bed.id === id 
        ? { 
            ...bed, 
            status, 
            patientId: status === 'available' ? undefined : patientId,
            lastUpdated: new Date().toISOString() 
          } 
        : bed
    );
    
    localStorageService.setBeds(updatedBeds);
    
    return { data: updatedBeds.find(bed => bed.id === id) };
  },
  
  getStats: async () => {
    await delay(200);
    
    const beds = localStorageService.getBeds();
    const stats = {
      total: beds.length,
      available: beds.filter(b => b.status === 'available').length,
      occupied: beds.filter(b => b.status === 'occupied').length,
      reserved: beds.filter(b => b.status === 'reserved').length,
      cleaning: beds.filter(b => b.status === 'cleaning').length,
      maintenance: beds.filter(b => b.status === 'maintenance').length
    };
    
    return { data: stats };
  }
};

export const localHospitalAPI = {
  getFloors: async () => {
    await delay(300);
    return { data: mockFloorPlans };
  },
  
  getRooms: async (params?: any) => {
    await delay(400);
    
    let rooms: any[] = [];
    mockFloorPlans.forEach(floor => {
      if (floor.rooms) {
        rooms.push(...floor.rooms.map(room => ({
          ...room,
          floorId: floor.id,
          floorName: floor.name,
          department: room.type
        })));
      }
    });
    
    if (params?.floorId) {
      rooms = rooms.filter(room => room.floorId === params.floorId);
    }
    
    return { data: rooms };
  },
  
  getMap: async () => {
    await delay(500);
    return { data: mockFloorPlans };
  }
};

export const localDoctorAPI = {
  search: async (params?: any) => {
    await delay(400);
    
    let doctors = [...mockDoctors];
    
    if (params?.specialization) {
      doctors = doctors.filter(d => 
        d.specialization.toLowerCase().includes(params.specialization.toLowerCase())
      );
    }
    
    if (params?.department) {
      doctors = doctors.filter(d => 
        d.department.toLowerCase().includes(params.department.toLowerCase())
      );
    }
    
    return { data: doctors };
  },
  
  getProfile: async (id: string) => {
    await delay(300);
    const doctor = mockDoctors.find(d => d.id === id);
    return { data: doctor };
  }
};

export const localAIAPI = {
  analyzeSymptoms: async (symptoms: string, age?: number, medicalHistory?: string) => {
    await delay(1500); // Simulate AI processing time
    
    const symptomLower = symptoms.toLowerCase();
    let response;
    
    if (symptomLower.includes('chest') || symptomLower.includes('heart')) {
      response = aiResponseTemplates.symptoms['chest pain'];
    } else if (symptomLower.includes('head') || symptomLower.includes('migraine')) {
      response = aiResponseTemplates.symptoms['headache'];
    } else if (symptomLower.includes('fever') || symptomLower.includes('temperature')) {
      response = aiResponseTemplates.symptoms['fever'];
    } else {
      response = aiResponseTemplates.symptoms['default'];
    }
    
    return { data: response };
  },
  
  chat: async (message: string, conversationId?: string) => {
    await delay(1000);
    
    const messageLower = message.toLowerCase();
    let response;
    
    if (messageLower.includes('hello') || messageLower.includes('hi')) {
      response = aiResponseTemplates.chatResponses['hello'];
    } else if (messageLower.includes('chest') || messageLower.includes('heart')) {
      response = aiResponseTemplates.chatResponses['chest pain'];
    } else if (messageLower.includes('head') || messageLower.includes('migraine')) {
      response = aiResponseTemplates.chatResponses['headache'];
    } else if (messageLower.includes('fever') || messageLower.includes('temperature')) {
      response = aiResponseTemplates.chatResponses['fever'];
    } else {
      response = aiResponseTemplates.chatResponses['default'];
    }
    
    // Save to chat history
    const history = localStorageService.getChatHistory();
    history.push(
      { id: Date.now().toString(), text: message, isBot: false, timestamp: new Date().toISOString() },
      { id: (Date.now() + 1).toString(), text: response, isBot: true, timestamp: new Date().toISOString() }
    );
    localStorageService.setChatHistory(history);
    
    return { data: { response } };
  },
  
  getChatHistory: async (conversationId?: string) => {
    await delay(200);
    return { data: localStorageService.getChatHistory() };
  }
};