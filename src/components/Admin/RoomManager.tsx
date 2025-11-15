import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus, Settings, MapPin, Users } from 'lucide-react';
import { useHospitalStore } from '../../store/hospitalStore';

export function RoomManager() {
  const { floors, rooms, createRoom, isLoading } = useHospitalStore();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    floorId: '',
    number: '',
    name: '',
    type: 'General',
    capacity: 1,
    department: '',
    position: { x: 0, y: 0, z: 0 }
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createRoom(formData);
      setShowCreateForm(false);
      setFormData({
        floorId: '',
        number: '',
        name: '',
        type: 'General',
        capacity: 1,
        department: '',
        position: { x: 0, y: 0, z: 0 }
      });
    } catch (error) {
      console.error('Failed to create room:', error);
    }
  };

  const roomTypes = ['ICU', 'General', 'OT', 'Ward', 'Private', 'Emergency'];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-[#3D405B]">Room Management</h3>
        <motion.button
          onClick={() => setShowCreateForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#D4A373] text-white px-4 py-2 rounded-xl flex items-center space-x-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Add Room</span>
        </motion.button>
      </div>

      {showCreateForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
        >
          <h4 className="text-lg font-semibold text-[#3D405B] mb-4">Create New Room</h4>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#3D405B] mb-2">Floor</label>
                <select
                  value={formData.floorId}
                  onChange={(e) => setFormData({ ...formData, floorId: e.target.value })}
                  className="w-full p-3 border border-[#D4A373]/20 rounded-xl focus:ring-2 focus:ring-[#D4A373]"
                  required
                >
                  <option value="">Select Floor</option>
                  {floors.map(floor => (
                    <option key={floor.id} value={floor.id}>{floor.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3D405B] mb-2">Room Number</label>
                <input
                  type="text"
                  value={formData.number}
                  onChange={(e) => setFormData({ ...formData, number: e.target.value })}
                  className="w-full p-3 border border-[#D4A373]/20 rounded-xl focus:ring-2 focus:ring-[#D4A373]"
                  placeholder="A101"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3D405B] mb-2">Room Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full p-3 border border-[#D4A373]/20 rounded-xl focus:ring-2 focus:ring-[#D4A373]"
                  placeholder="ICU Room 1"
                  required
                />
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#3D405B] mb-2">Room Type</label>
                <select
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                  className="w-full p-3 border border-[#D4A373]/20 rounded-xl focus:ring-2 focus:ring-[#D4A373]"
                >
                  {roomTypes.map(type => (
                    <option key={type} value={type}>{type}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3D405B] mb-2">Capacity</label>
                <input
                  type="number"
                  min="1"
                  max="10"
                  value={formData.capacity}
                  onChange={(e) => setFormData({ ...formData, capacity: parseInt(e.target.value) })}
                  className="w-full p-3 border border-[#D4A373]/20 rounded-xl focus:ring-2 focus:ring-[#D4A373]"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-[#3D405B] mb-2">Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  className="w-full p-3 border border-[#D4A373]/20 rounded-xl focus:ring-2 focus:ring-[#D4A373]"
                  placeholder="Cardiology"
                  required
                />
              </div>
            </div>

            <div className="flex space-x-3">
              <motion.button
                type="submit"
                disabled={isLoading}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 bg-[#D4A373] text-white py-3 rounded-xl font-medium disabled:opacity-50"
              >
                Create Room
              </motion.button>
              <motion.button
                type="button"
                onClick={() => setShowCreateForm(false)}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-6 bg-gray-500 text-white py-3 rounded-xl font-medium"
              >
                Cancel
              </motion.button>
            </div>
          </form>
        </motion.div>
      )}

      <div className="grid gap-4">
        {rooms.map((room, index) => (
          <motion.div
            key={room.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.01 }}
            className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#B5838D]/20 rounded-xl flex items-center justify-center">
                  <Settings className="w-6 h-6 text-[#B5838D]" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-[#3D405B]">{room.name}</h4>
                  <p className="text-[#6D6875]">Room {room.number} • {room.type}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-[#3D405B]">{room.department}</p>
                <p className="text-xs text-[#6D6875]">Capacity: {room.capacity}</p>
              </div>
            </div>

            {room.beds && (
              <div className="mt-4 grid grid-cols-4 gap-4">
                <div className="text-center">
                  <p className="text-lg font-bold text-[#3D405B]">{room.beds.total}</p>
                  <p className="text-xs text-[#6D6875]">Total Beds</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-green-600">{room.beds.available}</p>
                  <p className="text-xs text-[#6D6875]">Available</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-red-600">{room.beds.occupied}</p>
                  <p className="text-xs text-[#6D6875]">Occupied</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-bold text-yellow-600">{room.beds.reserved}</p>
                  <p className="text-xs text-[#6D6875]">Reserved</p>
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  );
}