import { create } from 'zustand';
import { localAppointmentAPI, localDoctorAPI } from '../services/localApiService';
import { mockDoctors } from '../utils/mockData';

interface Appointment {
  id: string;
  patientId: string;
  doctorId: string;
  date: string;
  time: string;
  symptoms: string;
  status: string;
  type: string;
}

interface Doctor {
  id: string;
  name: string;
  specialization: string;
  department: string;
  experience: number;
  rating: number;
  availability: string[];
  avatar: string;
}

interface AppointmentState {
  appointments: Appointment[];
  doctors: Doctor[];
  selectedDoctor: Doctor | null;
  availableSlots: string[];
  isLoading: boolean;
  fetchAppointments: () => Promise<void>;
  searchDoctors: (params?: any) => Promise<void>;
  createAppointment: (appointmentData: any) => Promise<void>;
  updateAppointmentStatus: (id: string, status: string) => Promise<void>;
  getDoctorAvailability: (doctorId: string, date: string) => Promise<void>;
  setSelectedDoctor: (doctor: Doctor | null) => void;
}

export const useAppointmentStore = create<AppointmentState>((set, get) => ({
  appointments: [],
  doctors: mockDoctors,
  selectedDoctor: null,
  availableSlots: [],
  isLoading: false,

  fetchAppointments: async () => {
    set({ isLoading: true });
    try {
      const response = await localAppointmentAPI.getAll();
      set({ appointments: response.data, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch appointments:', error);
      set({ isLoading: false });
    }
  },

  searchDoctors: async (params = {}) => {
    set({ isLoading: true });
    try {
      const response = await localDoctorAPI.search(params);
      set({ doctors: response.data, isLoading: false });
    } catch (error) {
      console.error('Failed to search doctors:', error);
      set({ isLoading: false });
    }
  },

  createAppointment: async (appointmentData: any) => {
    try {
      const response = await localAppointmentAPI.create(appointmentData);
      const appointments = get().appointments;
      set({ appointments: [...appointments, response.data] });
    } catch (error) {
      console.error('Failed to create appointment:', error);
      throw error;
    }
  },

  updateAppointmentStatus: async (id: string, status: string) => {
    try {
      const response = await localAppointmentAPI.updateStatus(id, status);
      const appointments = get().appointments;
      const updatedAppointments = appointments.map(apt => 
        apt.id === id ? { ...apt, ...response.data } : apt
      );
      set({ appointments: updatedAppointments });
    } catch (error) {
      console.error('Failed to update appointment status:', error);
      throw error;
    }
  },

  getDoctorAvailability: async (doctorId: string, date: string) => {
    try {
      const response = await localAppointmentAPI.getDoctorAvailability(doctorId, date);
      set({ availableSlots: response.data.availableSlots });
    } catch (error) {
      console.error('Failed to get doctor availability:', error);
      set({ availableSlots: [] });
    }
  },

  setSelectedDoctor: (doctor: Doctor | null) => {
    set({ selectedDoctor: doctor });
  }
}));