import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, User, Stethoscope, Clock } from 'lucide-react';
import { useAppointmentStore } from '../../store/appointmentStore';

export function DoctorManager() {
  const { doctors, searchDoctors, isLoading } = useAppointmentStore();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    specialization: '',
    department: '',
    bio: '',
    experience: 0,
    languages: ['English'],
    videoEnabled: true,
    slots: []
  });

  useEffect(() => {
    searchDoctors();
  }, []);

  const specializations = [
    'Cardiology', 'Neurology', 'Pediatrics', 'Orthopedics', 'Dermatology',
    'Psychiatry', 'Radiology', 'Emergency Medicine', 'Internal Medicine', 'Surgery'
  ];

  const departments = [
    'Cardiac Care', 'Neuroscience', 'Children\'s Care', 'Orthopedic Surgery',
    'Emergency', 'ICU', 'General Medicine', 'Surgery', 'Radiology'
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-[#3D405B]">Doctor Management</h3>
        <motion.button
          onClick={() => setShowCreateForm(true)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="bg-[#D4A373] text-white px-4 py-2 rounded-xl flex items-center space-x-2 shadow-lg"
        >
          <Plus className="w-5 h-5" />
          <span>Add Doctor</span>
        </motion.button>
      </div>

      {showCreateForm && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
        >
          <h4 className="text-lg font-semibold text-[#3D405B] mb-4">Add New Doctor</h4>
          <div className="grid md:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Full Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="p-3 border border-[#D4A373]/20 rounded-xl focus:ring-2 focus:ring-[#D4A373]"
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="p-3 border border-[#D4A373]/20 rounded-xl focus:ring-2 focus:ring-[#D4A373]"
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="p-3 border border-[#D4A373]/20 rounded-xl focus:ring-2 focus:ring-[#D4A373]"
            />
            <input
              type="tel"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="p-3 border border-[#D4A373]/20 rounded-xl focus:ring-2 focus:ring-[#D4A373]"
            />
            <select
              value={formData.specialization}
              onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
              className="p-3 border border-[#D4A373]/20 rounded-xl focus:ring-2 focus:ring-[#D4A373]"
            >
              <option value="">Select Specialization</option>
              {specializations.map(spec => (
                <option key={spec} value={spec}>{spec}</option>
              ))}
            </select>
            <select
              value={formData.department}
              onChange={(e) => setFormData({ ...formData, department: e.target.value })}
              className="p-3 border border-[#D4A373]/20 rounded-xl focus:ring-2 focus:ring-[#D4A373]"
            >
              <option value="">Select Department</option>
              {departments.map(dept => (
                <option key={dept} value={dept}>{dept}</option>
              ))}
            </select>
          </div>
          
          <div className="mt-4">
            <textarea
              placeholder="Bio"
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              className="w-full p-3 border border-[#D4A373]/20 rounded-xl focus:ring-2 focus:ring-[#D4A373] h-20 resize-none"
            />
          </div>

          <div className="flex space-x-3 mt-6">
            <motion.button
              type="button"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex-1 bg-[#D4A373] text-white py-3 rounded-xl font-medium"
            >
              Create Doctor
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
        </motion.div>
      )}

      <div className="grid gap-4">
        {doctors.map((doctor, index) => (
          <motion.div
            key={doctor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ scale: 1.01 }}
            className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
          >
            <div className="flex items-center space-x-4">
              <div className="w-16 h-16 bg-[#D4A373]/20 rounded-full flex items-center justify-center">
                <Stethoscope className="w-8 h-8 text-[#D4A373]" />
              </div>
              <div className="flex-1">
                <h4 className="text-lg font-semibold text-[#3D405B]">{doctor.userId?.name}</h4>
                <p className="text-[#6D6875]">{doctor.specialization} • {doctor.department}</p>
                <p className="text-sm text-[#6D6875]">{doctor.experience} years experience</p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1 mb-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm font-medium text-[#3D405B]">{doctor.rating}</span>
                </div>
                <div className={`px-2 py-1 rounded-full text-xs ${
                  doctor.videoEnabled ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {doctor.videoEnabled ? 'Video Enabled' : 'In-Person Only'}
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}