import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Building, Settings, Bed, Users, Plus, BarChart3 } from 'lucide-react';
import { useHospitalStore } from '../../store/hospitalStore';
import { mockFloorPlans, mockDoctors } from '../../utils/mockData';

export function AdminDashboard() {
  const [activeSection, setActiveSection] = useState('overview');
  const { floors, rooms, beds, bedStats, fetchFloors, fetchRooms, fetchBeds, fetchBedStats, createFloor, createRoom } = useHospitalStore();
  const [showCreateFloor, setShowCreateFloor] = useState(false);
  const [showCreateRoom, setShowCreateRoom] = useState(false);
  const [floorForm, setFloorForm] = useState({ name: '', level: 0, departments: [''] });
  const [roomForm, setRoomForm] = useState({ 
    floorId: '', 
    name: '', 
    type: 'General', 
    beds: 1, 
    position: { x: 0, y: 0, z: 0 } 
  });

  useEffect(() => {
    fetchFloors();
    fetchRooms();
    fetchBeds();
    fetchBedStats();
  }, []);

  const sections = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'floors', label: 'Floors', icon: Building },
    { id: 'rooms', label: 'Rooms', icon: Settings },
    { id: 'beds', label: 'Beds', icon: Bed },
    { id: 'doctors', label: 'Doctors', icon: Users }
  ];

  const handleCreateFloor = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createFloor({
        ...floorForm,
        departments: floorForm.departments.filter(d => d.trim())
      });
      setShowCreateFloor(false);
      setFloorForm({ name: '', level: 0, departments: [''] });
    } catch (error) {
      console.error('Failed to create floor:', error);
    }
  };

  const handleCreateRoom = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createRoom(roomForm);
      setShowCreateRoom(false);
      setRoomForm({ floorId: '', name: '', type: 'General', beds: 1, position: { x: 0, y: 0, z: 0 } });
    } catch (error) {
      console.error('Failed to create room:', error);
    }
  };

  const renderOverview = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Floors</p>
              <p className="text-2xl font-bold text-gray-900">{floors.length}</p>
            </div>
            <Building className="w-8 h-8 text-[#0D9488]" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Rooms</p>
              <p className="text-2xl font-bold text-gray-900">{rooms.length}</p>
            </div>
            <Settings className="w-8 h-8 text-[#0D9488]" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Total Beds</p>
              <p className="text-2xl font-bold text-gray-900">{bedStats.total || 0}</p>
            </div>
            <Bed className="w-8 h-8 text-[#0D9488]" />
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.02 }}
          className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-600 text-sm font-medium">Doctors</p>
              <p className="text-2xl font-bold text-gray-900">{mockDoctors.length}</p>
            </div>
            <Users className="w-8 h-8 text-[#0D9488]" />
          </div>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {[
              { time: '10:30 AM', event: 'New patient registered', type: 'info' },
              { time: '11:15 AM', event: 'Emergency admission - Room A101', type: 'urgent' },
              { time: '11:45 AM', event: 'Teleconsultation completed', type: 'success' },
              { time: '12:20 PM', event: 'Bed B202 now available', type: 'info' }
            ].map((activity, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center space-x-3 p-3 rounded-lg bg-white/30"
              >
                <div className={`w-2 h-2 rounded-full ${
                  activity.type === 'urgent' ? 'bg-red-500' :
                  activity.type === 'success' ? 'bg-green-500' : 'bg-[#0D9488]'
                }`} />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.event}</p>
                  <p className="text-xs text-gray-600">{activity.time}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <motion.button
              onClick={() => setShowCreateFloor(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#0D9488] text-white p-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Floor</span>
            </motion.button>
            
            <motion.button
              onClick={() => setShowCreateRoom(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#0D9488] text-white p-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow flex items-center space-x-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add Room</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-[#0D9488] text-white p-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow"
            >
              View Reports
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-green-500 text-white p-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow"
            >
              Emergency Alert
            </motion.button>
          </div>
        </motion.div>
      </div>

      {/* Create Floor Modal */}
      <AnimatePresence>
        {showCreateFloor && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl max-w-md w-full"
            >
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Create New Floor</h4>
              <form onSubmit={handleCreateFloor} className="space-y-4">
                <input
                  type="text"
                  placeholder="Floor Name"
                  value={floorForm.name}
                  onChange={(e) => setFloorForm({...floorForm, name: e.target.value})}
                  className="w-full p-3 border border-[#0D9488]/20 rounded-xl focus:ring-2 focus:ring-[#0D9488]"
                  required
                />
                <input
                  type="number"
                  placeholder="Floor Level"
                  value={floorForm.level}
                  onChange={(e) => setFloorForm({...floorForm, level: parseInt(e.target.value)})}
                  className="w-full p-3 border border-[#0D9488]/20 rounded-xl focus:ring-2 focus:ring-[#0D9488]"
                  required
                />
                <input
                  type="text"
                  placeholder="Departments (comma separated)"
                  value={floorForm.departments.join(', ')}
                  onChange={(e) => setFloorForm({...floorForm, departments: e.target.value.split(', ')})}
                  className="w-full p-3 border border-[#0D9488]/20 rounded-xl focus:ring-2 focus:ring-[#0D9488]"
                  required
                />
                <div className="flex space-x-3">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    className="flex-1 bg-[#0D9488] text-white py-3 rounded-xl font-medium"
                  >
                    Create Floor
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setShowCreateFloor(false)}
                    whileHover={{ scale: 1.02 }}
                    className="px-6 bg-gray-500 text-white py-3 rounded-xl font-medium"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Room Modal */}
      <AnimatePresence>
        {showCreateRoom && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-white/90 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-xl max-w-md w-full"
            >
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Create New Room</h4>
              <form onSubmit={handleCreateRoom} className="space-y-4">
                <select
                  value={roomForm.floorId}
                  onChange={(e) => setRoomForm({...roomForm, floorId: e.target.value})}
                  className="w-full p-3 border border-[#0D9488]/20 rounded-xl focus:ring-2 focus:ring-[#0D9488]"
                  required
                >
                  <option value="">Select Floor</option>
                  {floors.map(floor => (
                    <option key={floor.id} value={floor.id}>{floor.name}</option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Room Name"
                  value={roomForm.name}
                  onChange={(e) => setRoomForm({...roomForm, name: e.target.value})}
                  className="w-full p-3 border border-[#0D9488]/20 rounded-xl focus:ring-2 focus:ring-[#0D9488]"
                  required
                />
                <select
                  value={roomForm.type}
                  onChange={(e) => setRoomForm({...roomForm, type: e.target.value})}
                  className="w-full p-3 border border-[#0D9488]/20 rounded-xl focus:ring-2 focus:ring-[#0D9488]"
                >
                  <option value="General">General</option>
                  <option value="ICU">ICU</option>
                  <option value="Surgery">Surgery</option>
                  <option value="Emergency">Emergency</option>
                  <option value="Pediatrics">Pediatrics</option>
                </select>
                <input
                  type="number"
                  placeholder="Number of Beds"
                  min="1"
                  value={roomForm.beds}
                  onChange={(e) => setRoomForm({...roomForm, beds: parseInt(e.target.value)})}
                  className="w-full p-3 border border-[#0D9488]/20 rounded-xl focus:ring-2 focus:ring-[#0D9488]"
                  required
                />
                <div className="flex space-x-3">
                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    className="flex-1 bg-[#0D9488] text-white py-3 rounded-xl font-medium"
                  >
                    Create Room
                  </motion.button>
                  <motion.button
                    type="button"
                    onClick={() => setShowCreateRoom(false)}
                    whileHover={{ scale: 1.02 }}
                    className="px-6 bg-gray-500 text-white py-3 rounded-xl font-medium"
                  >
                    Cancel
                  </motion.button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );

  const renderFloors = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-xl font-semibold text-gray-900">Floor Management</h3>
        <motion.button
          onClick={() => setShowCreateFloor(true)}
          whileHover={{ scale: 1.05 }}
          className="bg-[#0D9488] text-white px-4 py-2 rounded-xl flex items-center space-x-2"
        >
          <Plus className="w-5 h-5" />
          <span>Add Floor</span>
        </motion.button>
      </div>

      <div className="grid gap-4">
        {floors.map((floor, index) => (
          <motion.div
            key={floor.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.01 }}
            className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-[#0D9488]/20 rounded-xl flex items-center justify-center">
                  <Building className="w-6 h-6 text-[#0D9488]" />
                </div>
                <div>
                  <h4 className="text-lg font-semibold text-gray-900">{floor.name}</h4>
                  <p className="text-gray-600">Level {floor.floor} • {floor.bedCount} beds</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">{floor.occupancy}/{floor.bedCount} occupied</p>
                <p className="text-xs text-gray-600">
                  {Math.round((floor.occupancy / floor.bedCount) * 100)}% occupancy
                </p>
              </div>
            </div>
            
            <div className="mt-4">
              <p className="text-sm font-medium text-gray-900 mb-2">Departments:</p>
              <div className="flex flex-wrap gap-2">
                {floor.departments.map((dept, deptIndex) => (
                  <span
                    key={deptIndex}
                    className="px-3 py-1 bg-[#0D9488]/20 text-[#0D9488] text-sm rounded-lg"
                  >
                    {dept}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'overview':
        return renderOverview();
      case 'floors':
        return renderFloors();
      case 'rooms':
        return <div className="text-center text-gray-600">Room management interface</div>;
      case 'beds':
        return <div className="text-center text-gray-600">Bed management interface</div>;
      case 'doctors':
        return <div className="text-center text-gray-600">Doctor management interface</div>;
      default:
        return renderOverview();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Hospital Administration</h2>
        <p className="text-gray-600">Manage floors, rooms, beds, and medical staff</p>
      </div>

      <div className="flex space-x-1 mb-8 bg-white/40 p-1 rounded-xl">
        {sections.map((section) => {
          const Icon = section.icon;
          return (
            <motion.button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`flex items-center space-x-2 px-6 py-3 rounded-lg transition-all ${
                activeSection === section.id
                  ? 'bg-[#0D9488] text-white shadow-lg'
                  : 'text-gray-600 hover:bg-white/50'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="font-medium">{section.label}</span>
            </motion.button>
          );
        })}
      </div>

      {renderActiveSection()}
    </motion.div>
  );
}