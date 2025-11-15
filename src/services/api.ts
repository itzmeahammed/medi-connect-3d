import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Request interceptor to add auth token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor for token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        const refreshToken = localStorage.getItem('refreshToken');
        if (refreshToken) {
          const response = await axios.post(`${API_BASE_URL}/auth/refresh`, {
            refreshToken
          });
          
          const { accessToken } = response.data;
          localStorage.setItem('accessToken', accessToken);
          
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return api(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        window.location.href = '/login';
      }
    }
    
    return Promise.reject(error);
  }
);

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/auth/login', { email, password }),
  
  register: (userData: any) =>
    api.post('/auth/register', userData),
  
  refreshToken: (refreshToken: string) =>
    api.post('/auth/refresh', { refreshToken })
};

export const appointmentAPI = {
  create: (appointmentData: any) =>
    api.post('/appointments', appointmentData),
  
  getAll: () =>
    api.get('/appointments'),
  
  updateStatus: (id: string, status: string) =>
    api.patch(`/appointments/${id}/status`, { status }),
  
  getDoctorAvailability: (doctorId: string, date: string) =>
    api.get(`/appointments/doctors/${doctorId}/availability?date=${date}`)
};

export const bedAPI = {
  getAll: (params?: any) =>
    api.get('/beds', { params }),
  
  updateStatus: (id: string, status: string, patientId?: string, notes?: string) =>
    api.patch(`/beds/${id}/status`, { status, patientId, notes }),
  
  getStats: () =>
    api.get('/beds/stats'),
  
  create: (bedData: any) =>
    api.post('/beds', bedData)
};

export const hospitalAPI = {
  getFloors: () =>
    api.get('/hospital/floors'),
  
  getRooms: (params?: any) =>
    api.get('/hospital/rooms', { params }),
  
  getMap: () =>
    api.get('/hospital/map'),
  
  createFloor: (floorData: any) =>
    api.post('/hospital/floors', floorData),
  
  createRoom: (roomData: any) =>
    api.post('/hospital/rooms', roomData)
};

export const doctorAPI = {
  search: (params?: any) =>
    api.get('/doctors/search', { params }),
  
  getProfile: (id: string) =>
    api.get(`/doctors/${id}`),
  
  create: (doctorData: any) =>
    api.post('/doctors', doctorData),
  
  updateSlots: (id: string, slots: any[]) =>
    api.patch(`/doctors/${id}/slots`, { slots })
};

export const aiAPI = {
  analyzeSymptoms: (symptoms: string, age?: number, medicalHistory?: string) =>
    api.post('/ai/triage', { symptoms, age, medicalHistory }),
  
  chat: (message: string, conversationId?: string) =>
    api.post('/ai/chat', { message, conversationId }),
  
  getChatHistory: (conversationId?: string) =>
    api.get(`/ai/chat/${conversationId || ''}`)
};