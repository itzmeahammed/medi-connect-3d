import { create } from 'zustand';
import { localHospitalAPI, localBedAPI } from '../services/localApiService';

interface Floor {
  id: string;
  name: string;
  floor: number;
  departments: string[];
  bedCount: number;
  occupancy: number;
  rooms?: any[];
}

interface Room {
  id: string;
  name: string;
  type: string;
  beds: number;
  position: { x: number; y: number; z: number };
  floorId?: string;
  floorName?: string;
  department?: string;
}

interface Bed {
  id: string;
  ward: string;
  floor: number;
  status: 'available' | 'reserved' | 'occupied' | 'cleaning' | 'maintenance';
  patientId?: string;
  lastUpdated: string;
}

interface HospitalState {
  floors: Floor[];
  rooms: Room[];
  beds: Bed[];
  bedStats: any;
  isLoading: boolean;
  fetchFloors: () => Promise<void>;
  fetchRooms: (params?: any) => Promise<void>;
  fetchBeds: (params?: any) => Promise<void>;
  fetchBedStats: () => Promise<void>;
  fetchHospitalMap: () => Promise<any>;
  updateBedStatus: (id: string, status: string, patientId?: string) => Promise<void>;
  createFloor: (floorData: any) => Promise<void>;
  createRoom: (roomData: any) => Promise<void>;
}

export const useHospitalStore = create<HospitalState>((set, get) => ({
  floors: [],
  rooms: [],
  beds: [],
  bedStats: {},
  isLoading: false,

  fetchFloors: async () => {
    set({ isLoading: true });
    try {
      const response = await localHospitalAPI.getFloors();
      set({ floors: response.data, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch floors:', error);
      set({ isLoading: false });
    }
  },

  fetchRooms: async (params = {}) => {
    set({ isLoading: true });
    try {
      const response = await localHospitalAPI.getRooms(params);
      set({ rooms: response.data, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch rooms:', error);
      set({ isLoading: false });
    }
  },

  fetchBeds: async (params = {}) => {
    set({ isLoading: true });
    try {
      const response = await localBedAPI.getAll(params);
      set({ beds: response.data, isLoading: false });
    } catch (error) {
      console.error('Failed to fetch beds:', error);
      set({ isLoading: false });
    }
  },

  fetchBedStats: async () => {
    try {
      const response = await localBedAPI.getStats();
      set({ bedStats: response.data });
    } catch (error) {
      console.error('Failed to fetch bed stats:', error);
    }
  },

  fetchHospitalMap: async () => {
    try {
      const response = await localHospitalAPI.getMap();
      return response.data;
    } catch (error) {
      console.error('Failed to fetch hospital map:', error);
      return [];
    }
  },

  updateBedStatus: async (id: string, status: string, patientId?: string) => {
    try {
      const response = await localBedAPI.updateStatus(id, status, patientId);
      
      // Update local state
      const beds = get().beds;
      const updatedBeds = beds.map(bed => 
        bed.id === id ? { ...bed, ...response.data } : bed
      );
      set({ beds: updatedBeds });
      
      // Trigger real-time update simulation
      setTimeout(() => {
        get().fetchBedStats();
      }, 100);
    } catch (error) {
      console.error('Failed to update bed status:', error);
      throw error;
    }
  },

  createFloor: async (floorData: any) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const floors = get().floors;
      const newFloor = {
        id: `floor_${Date.now()}`,
        ...floorData,
        bedCount: 0,
        occupancy: 0
      };
      set({ floors: [...floors, newFloor] });
    } catch (error) {
      console.error('Failed to create floor:', error);
      throw error;
    }
  },

  createRoom: async (roomData: any) => {
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      const rooms = get().rooms;
      const newRoom = {
        id: `room_${Date.now()}`,
        ...roomData
      };
      set({ rooms: [...rooms, newRoom] });
    } catch (error) {
      console.error('Failed to create room:', error);
      throw error;
    }
  }
}));