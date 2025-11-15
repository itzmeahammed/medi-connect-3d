import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Bed, MapPin, Clock, Users, RefreshCw } from 'lucide-react';
import { useHospitalStore } from '../../store/hospitalStore';

export function BedDashboard() {
  const [selectedWard, setSelectedWard] = useState<string>('All');
  const [autoRefresh, setAutoRefresh] = useState(true);
  const { beds, bedStats, fetchBeds, fetchBedStats, updateBedStatus } = useHospitalStore();

  useEffect(() => {
    fetchBeds();
    fetchBedStats();
  }, []);

  // Auto-refresh simulation
  useEffect(() => {
    if (autoRefresh) {
      const interval = setInterval(() => {
        fetchBeds();
        fetchBedStats();
      }, 5000);
      
      return () => clearInterval(interval);
    }
  }, [autoRefresh, fetchBeds, fetchBedStats]);

  const wards = ['All', ...Array.from(new Set(beds.map(bed => bed.ward)))];
  const filteredBeds = selectedWard === 'All' ? beds : beds.filter(bed => bed.ward === selectedWard);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'occupied': return 'bg-red-500';
      case 'reserved': return 'bg-yellow-500';
      case 'maintenance': return 'bg-gray-500';
      case 'cleaning': return 'bg-blue-500';
      default: return 'bg-gray-400';
    }
  };

  const getStatusTextColor = (status: string) => {
    switch (status) {
      case 'available': return 'text-green-800 bg-green-100';
      case 'occupied': return 'text-red-800 bg-red-100';
      case 'reserved': return 'text-yellow-800 bg-yellow-100';
      case 'maintenance': return 'text-gray-800 bg-gray-100';
      case 'cleaning': return 'text-blue-800 bg-blue-100';
      default: return 'text-gray-800 bg-gray-100';
    }
  };

  const handleStatusChange = async (bedId: string, newStatus: string) => {
    try {
      await updateBedStatus(bedId, newStatus);
    } catch (error) {
      console.error('Failed to update bed status:', error);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#3D405B] mb-2">Real-Time Bed Availability</h2>
        <p className="text-[#6D6875]">Monitor hospital bed status across all wards</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-5 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#6D6875] text-sm font-medium">Total Beds</p>
              <p className="text-2xl font-bold text-[#3D405B]">{bedStats.total || 0}</p>
            </div>
            <Bed className="w-8 h-8 text-[#D4A373]" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#6D6875] text-sm font-medium">Available</p>
              <p className="text-2xl font-bold text-green-600">{bedStats.available || 0}</p>
            </div>
            <div className="w-8 h-8 bg-green-500 rounded-full" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#6D6875] text-sm font-medium">Occupied</p>
              <p className="text-2xl font-bold text-red-600">{bedStats.occupied || 0}</p>
            </div>
            <div className="w-8 h-8 bg-red-500 rounded-full" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#6D6875] text-sm font-medium">Reserved</p>
              <p className="text-2xl font-bold text-yellow-600">{bedStats.reserved || 0}</p>
            </div>
            <div className="w-8 h-8 bg-yellow-500 rounded-full" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[#6D6875] text-sm font-medium">Occupancy Rate</p>
              <p className="text-2xl font-bold text-[#D4A373]">
                {bedStats.total ? Math.round((bedStats.occupied / bedStats.total) * 100) : 0}%
              </p>
            </div>
            <Users className="w-8 h-8 text-[#D4A373]" />
          </div>
        </motion.div>
      </div>

      <div className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-xl font-semibold text-[#3D405B]">Bed Management</h3>
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <motion.button
                onClick={() => setAutoRefresh(!autoRefresh)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`p-2 rounded-lg ${autoRefresh ? 'bg-[#D4A373] text-white' : 'bg-gray-200 text-gray-600'}`}
              >
                <RefreshCw className={`w-4 h-4 ${autoRefresh ? 'animate-spin' : ''}`} />
              </motion.button>
              <span className="text-sm text-[#6D6875]">Auto-refresh</span>
            </div>
            
            <div className="flex space-x-2">
              {wards.map((ward) => (
                <motion.button
                  key={ward}
                  onClick={() => setSelectedWard(ward)}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-colors ${
                    selectedWard === ward
                      ? 'bg-[#D4A373] text-white'
                      : 'bg-white/50 text-[#3D405B] hover:bg-[#D4A373]/20'
                  }`}
                >
                  {ward}
                </motion.button>
              ))}
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredBeds.map((bed, index) => (
              <motion.div
                key={bed.id}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/30 shadow-md hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-semibold text-[#3D405B]">{bed.id}</h4>
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ repeat: Infinity, duration: 2 }}
                    className={`w-3 h-3 rounded-full ${getStatusColor(bed.status)}`}
                  />
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-[#6D6875]" />
                    <span className="text-sm text-[#6D6875]">
                      {bed.ward} - Floor {bed.floor}
                    </span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-[#6D6875]" />
                    <span className="text-xs text-[#6D6875]">
                      Updated {new Date(bed.lastUpdated).toLocaleTimeString()}
                    </span>
                  </div>
                  
                  <div className={`px-3 py-1 rounded-full text-xs font-medium capitalize ${getStatusTextColor(bed.status)}`}>
                    {bed.status}
                  </div>
                  
                  <select
                    value={bed.status}
                    onChange={(e) => handleStatusChange(bed.id, e.target.value)}
                    className="w-full p-2 text-sm border border-[#D4A373]/20 rounded-lg focus:ring-1 focus:ring-[#D4A373]"
                  >
                    <option value="available">Available</option>
                    <option value="reserved">Reserved</option>
                    <option value="occupied">Occupied</option>
                    <option value="cleaning">Cleaning</option>
                    <option value="maintenance">Maintenance</option>
                  </select>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}