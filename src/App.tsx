import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAuthStore } from './store/authStore';
import { LoginForm } from './components/Auth/LoginForm';
import { LandingPage } from './components/Landing/LandingPage';
import { AdminDashboard } from './components/Admin/AdminDashboard';
import { Navbar } from './components/Layout/Navbar';
import { DashboardOverview } from './components/Dashboard/DashboardOverview';
import { AppointmentBooking } from './components/Appointments/AppointmentBooking';
import { AIChatbot } from './components/Chatbot/AIChatbot';
import { HospitalMap3D } from './components/Map3D/HospitalMap3D';
import { AnalyticsDashboard } from './components/Analytics/AnalyticsDashboard';
import { VideoCall } from './components/Teleconsultation/VideoCall';
import { BedDashboard } from './components/BedAvailability/BedDashboard';
import { SettingsPanel } from './components/Settings/SettingsPanel';
import { VideoCallInterface } from './components/WebRTC/VideoCallInterface';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [videoCallRoom, setVideoCallRoom] = useState<string | null>(null);
  const [showLanding, setShowLanding] = useState(true);
  const { isAuthenticated, user } = useAuthStore();

  if (showLanding && !isAuthenticated) {
    return <LandingPage onGetStarted={() => setShowLanding(false)} />;
  }

  if (!isAuthenticated) {
    return <LoginForm onToggleMode={() => setIsLoginMode(!isLoginMode)} isLogin={isLoginMode} />;
  }

  if (videoCallRoom) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-[#FAF3E0] via-[#FAF3E0] to-[#D4A373]/10 p-6">
        <VideoCallInterface 
          roomId={videoCallRoom} 
          onEndCall={() => setVideoCallRoom(null)} 
        />
      </div>
    );
  }

  const renderActiveComponent = () => {
    if (user?.role === 'admin' && activeTab === 'dashboard') {
      return <AdminDashboard />;
    }

    switch (activeTab) {
      case 'dashboard':
        return <DashboardOverview />;
      case 'appointments':
        return <AppointmentBooking />;
      case 'chatbot':
        return <AIChatbot />;
      case 'map3d':
        return <HospitalMap3D />;
      case 'analytics':
        return <AnalyticsDashboard />;
      case 'beds':
        return <BedDashboard />;
      case 'teleconsult':
        return <VideoCall onStartCall={(roomId) => setVideoCallRoom(roomId)} />;
      case 'settings':
        return <SettingsPanel />;
      default:
        return <DashboardOverview />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <main className="relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
          >
            {renderActiveComponent()}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Floating Action Menu */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1 }}
        className="fixed bottom-8 right-8 flex flex-col space-y-3"
      >
        <motion.button
          onClick={() => setActiveTab('teleconsult')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-[#D4A373] text-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
          title="Start Teleconsultation"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6zM14.553 7.106A1 1 0 0014 8v4a1 1 0 00.553.894l2 1A1 1 0 0018 13V7a1 1 0 00-1.447-.894l-2 1z" />
          </svg>
        </motion.button>

        <motion.button
          onClick={() => setActiveTab('beds')}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="w-14 h-14 bg-[#B5838D] text-white rounded-full shadow-lg hover:shadow-xl transition-shadow flex items-center justify-center"
          title="Bed Availability"
        >
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
          </svg>
        </motion.button>
      </motion.div>

      {/* Background decorative elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute top-1/4 right-1/4 w-64 h-64 bg-[#0D9488]/5 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-[#0D9488]/3 rounded-full blur-3xl"
        />
      </div>
    </div>
  );
}

export default App;