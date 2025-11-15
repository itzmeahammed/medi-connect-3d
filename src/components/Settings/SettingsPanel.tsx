import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  User, 
  Bell, 
  Shield, 
  Palette, 
  Globe, 
  Smartphone,
  Save
} from 'lucide-react';

export function SettingsPanel() {
  const [notifications, setNotifications] = useState({
    appointments: true,
    emergencies: true,
    updates: false,
    marketing: false
  });

  const [profile, setProfile] = useState({
    name: 'Dr. Sarah Chen',
    email: 'sarah.chen@mediconnect.com',
    phone: '+1 (555) 123-4567',
    department: 'Cardiology'
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-[#3D405B] mb-2">Settings & Preferences</h2>
        <p className="text-[#6D6875]">Customize your MediConnect experience</p>
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
        >
          <div className="flex items-center space-x-3 mb-6">
            <User className="w-6 h-6 text-[#D4A373]" />
            <h3 className="text-xl font-semibold text-[#3D405B]">Profile Information</h3>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-[#3D405B] mb-2">Full Name</label>
              <input
                type="text"
                value={profile.name}
                onChange={(e) => setProfile({...profile, name: e.target.value})}
                className="w-full p-3 border border-[#D4A373]/20 rounded-xl focus:ring-2 focus:ring-[#D4A373] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3D405B] mb-2">Email</label>
              <input
                type="email"
                value={profile.email}
                onChange={(e) => setProfile({...profile, email: e.target.value})}
                className="w-full p-3 border border-[#D4A373]/20 rounded-xl focus:ring-2 focus:ring-[#D4A373] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3D405B] mb-2">Phone</label>
              <input
                type="tel"
                value={profile.phone}
                onChange={(e) => setProfile({...profile, phone: e.target.value})}
                className="w-full p-3 border border-[#D4A373]/20 rounded-xl focus:ring-2 focus:ring-[#D4A373] focus:border-transparent"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-[#3D405B] mb-2">Department</label>
              <select
                value={profile.department}
                onChange={(e) => setProfile({...profile, department: e.target.value})}
                className="w-full p-3 border border-[#D4A373]/20 rounded-xl focus:ring-2 focus:ring-[#D4A373] focus:border-transparent"
              >
                <option>Cardiology</option>
                <option>Neurology</option>
                <option>Pediatrics</option>
                <option>Orthopedics</option>
                <option>Emergency Medicine</option>
              </select>
            </div>
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Bell className="w-6 h-6 text-[#D4A373]" />
            <h3 className="text-xl font-semibold text-[#3D405B]">Notification Preferences</h3>
          </div>

          <div className="space-y-4">
            {Object.entries(notifications).map(([key, value]) => (
              <div key={key} className="flex items-center justify-between p-3 bg-white/50 rounded-lg">
                <div>
                  <p className="font-medium text-[#3D405B] capitalize">{key.replace(/([A-Z])/g, ' $1')}</p>
                  <p className="text-sm text-[#6D6875]">
                    {key === 'appointments' && 'Get notified about upcoming appointments'}
                    {key === 'emergencies' && 'Receive emergency alerts and urgent notifications'}
                    {key === 'updates' && 'System updates and new feature announcements'}
                    {key === 'marketing' && 'Promotional emails and newsletters'}
                  </p>
                </div>
                <motion.button
                  onClick={() => setNotifications({...notifications, [key]: !value})}
                  whileTap={{ scale: 0.9 }}
                  className={`w-12 h-6 rounded-full transition-colors ${
                    value ? 'bg-[#D4A373]' : 'bg-gray-300'
                  }`}
                >
                  <motion.div
                    animate={{ x: value ? 24 : 0 }}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                    className="w-6 h-6 bg-white rounded-full shadow-md"
                  />
                </motion.button>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="lg:col-span-2 bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
        >
          <div className="flex items-center space-x-3 mb-6">
            <Shield className="w-6 h-6 text-[#D4A373]" />
            <h3 className="text-xl font-semibold text-[#3D405B]">Security & Privacy</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-white/50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Smartphone className="w-5 h-5 text-[#D4A373]" />
                  <h4 className="font-semibold text-[#3D405B]">Two-Factor Authentication</h4>
                </div>
                <p className="text-sm text-[#6D6875] mb-3">Add an extra layer of security to your account</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#D4A373] text-white py-2 rounded-lg text-sm font-medium"
                >
                  Enable 2FA
                </motion.button>
              </div>

              <div className="p-4 bg-white/50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Globe className="w-5 h-5 text-[#D4A373]" />
                  <h4 className="font-semibold text-[#3D405B]">Data Privacy</h4>
                </div>
                <p className="text-sm text-[#6D6875] mb-3">Manage your data sharing preferences</p>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#B5838D] text-white py-2 rounded-lg text-sm font-medium"
                >
                  View Privacy Settings
                </motion.button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-white/50 rounded-lg">
                <div className="flex items-center space-x-2 mb-2">
                  <Palette className="w-5 h-5 text-[#D4A373]" />
                  <h4 className="font-semibold text-[#3D405B]">Theme Preferences</h4>
                </div>
                <p className="text-sm text-[#6D6875] mb-3">Customize your interface appearance</p>
                <div className="flex space-x-2">
                  <div className="w-8 h-8 bg-[#D4A373] rounded-lg cursor-pointer border-2 border-[#D4A373]" />
                  <div className="w-8 h-8 bg-[#B5838D] rounded-lg cursor-pointer" />
                  <div className="w-8 h-8 bg-[#6D6875] rounded-lg cursor-pointer" />
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#D4A373] text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center space-x-2"
              >
                <Save className="w-5 h-5" />
                <span>Save All Changes</span>
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}