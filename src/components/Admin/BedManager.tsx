import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bed, Filter, RefreshCw } from 'lucide-react';
import { useHospitalStore } from '../../store/hospitalStore';
import { useRealTimeUpdates } from '../../hooks/useSocket';

export function BedManager() {
  const { beds, bedStats, fetchBeds, fetchBedStats, updateBedStatus } = useHospitalStore();
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [selectedWard, setSelectedWard] = useState('all');

  useEffect(() => {
    fetchBeds();
    fetchBedStats();
  }, []);

  // Real-time updates
  useRealTimeUpdates('beds:updated', (updatedBed) => {
    fetchBeds();
    fetchBedStats();
  });

  const handleStatusChange = async (bedId: string, newStatus: string) => {
    try {
      await updateBedStatus(bedId, newStatus);
    } catch (error) {
      console.error('Failed to update bed status:', error);
    }
  };

  const filteredBeds = beds.filter(bed => {
    if (selectedStatus !== 'all' && bed.status !== selectedStatus) return false;
    if (selectedWard !== 'all' && bed.roomId?.department !== selectedWard) return false;
    return true;
  });

  const wards = Array.from(new Set(beds.map(bed => bed.roomId?.department).filter(Boolean)));
  const statuses = ['available', 'reserved', 'occupied', 'cleaning', 'maintenance'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-500';
      case 'occupied': return 'bg-red-500';
      case 'reserved': return 'bg-yellow-500';
      case 'cleaning': return 'bg-blue-500';
      case 'maintenance': return 'bg-gray-500';
      default: return 'bg-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-[#3D405B]">Bed Management</h3>
        <motion.button
          onClick={() => { fetchBeds(); fetchBedStats(); }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#D4A373] text-white px-4 py-2 rounded-xl flex items-center space-x-2 shadow-lg"
        >
          <RefreshCw className="w-5 h-5" />
          <span>Refresh</span>
        </motion.button>
      </div>

      {/* Bed Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {Object.entries(bedStats).map(([status, count]) => (
          <motion.div
            key={status}
            whileHover={{ scale: 1.02 }}
            className="bg-white/60 backdrop-blur-lg rounded-xl p-4 border border-white/20 shadow-lg text-center"
          >
            <p className="text-2xl font-bold text-[#3D405B]">{count as number}</p>
            <p className="text-sm text-[#6D6875] capitalize">{status}</p>
          </motion.div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex space-x-4">
        <div>
          <label className="block text-sm font-medium text-[#3D405B] mb-2">Filter by Status</label>
          <select
            value={selectedStatus}
            onChange={(e) => setSelectedStatus(e.target.value)}
            className="p-2 border border-[#D4A373]/20 rounded-lg focus:ring-2 focus:ring-[#D4A373]"
          >
            <option value="all">All Statuses</option>
            {statuses.map(status => (
              <option key={status} value={status}>{status}</option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium text-[#3D405B] mb-2">Filter by Ward</label>
          <select
            value={selectedWard}
            onChange={(e) => setSelectedWard(e.target.value)}
            className="p-2 border border-[#D4A373]/20 rounded-lg focus:ring-2 focus:ring-[#D4A373]"
          >
            <option value="all">All Wards</option>
            {wards.map(ward => (
              <option key={ward} value={ward}>{ward}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Bed Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredBeds.map((bed, index) => (
          <motion.div
            key={bed.id}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.02, y: -2 }}
            className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/30 shadow-md"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-[#3D405B]">{bed.label}</h4>
              <div className={`w-3 h-3 rounded-full ${getStatusColor(bed.status)}`} />
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-[#6D6875]" />
                <span className="text-sm text-[#6D6875]">
                  {bed.roomId?.department} - {bed.roomId?.number}
                </span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-[#6D6875]" />
                <span className="text-xs text-[#6D6875]">
                  {bed.patientId ? 'Occupied' : 'Available'}
                </span>
              </div>
              
              <select
                value={bed.status}
                onChange={(e) => handleStatusChange(bed.id, e.target.value)}
                className="w-full p-2 text-sm border border-[#D4A373]/20 rounded-lg focus:ring-1 focus:ring-[#D4A373]"
              >
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}