import { useEffect, useRef } from 'react';

// Mock socket implementation for local development
export const useSocket = () => {
  const socketRef = useRef<any>(null);

  useEffect(() => {
    // Create a mock socket object
    socketRef.current = {
      emit: (event: string, data?: any) => {
        console.log(`Mock socket emit: ${event}`, data);
      },
      on: (event: string, callback: (data: any) => void) => {
        console.log(`Mock socket listening to: ${event}`);
      },
      off: (event: string, callback?: (data: any) => void) => {
        console.log(`Mock socket stopped listening to: ${event}`);
      },
      disconnect: () => {
        console.log('Mock socket disconnected');
      }
    };

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    };
  }, []);

  return socketRef.current;
};

export const useRealTimeUpdates = (eventName: string, callback: (data: any) => void) => {
  const socket = useSocket();

  useEffect(() => {
    if (socket) {
      socket.on(eventName, callback);
      
      return () => {
        socket.off(eventName, callback);
      };
    }
  }, [socket, eventName, callback]);
};