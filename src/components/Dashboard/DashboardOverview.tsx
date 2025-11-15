import { motion } from 'framer-motion';
import { Users, Bed, Calendar, TrendingUp, AlertCircle, CheckCircle, Phone } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
  color: string;
}

function StatCard({ title, value, icon, trend, color }: StatCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -5 }}
      className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm font-medium">{title}</p>
          <p className={`text-2xl font-bold ${color}`}>{value}</p>
          {trend && (
            <p className="text-sm text-gray-600 mt-1">{trend}</p>
          )}
        </div>
        <div className={`p-3 rounded-xl ${color.replace('text-', 'bg-')}/10`}>
          {icon}
        </div>
      </div>
    </motion.div>
  );
}

export function DashboardOverview() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 space-y-8"
    >
      {/* Header */}
      <motion.div variants={itemVariants} className="mb-8">
        <h2 className="text-4xl font-bold text-gray-900 mb-2">Welcome back, Dr. Sarah Chen</h2>
        <p className="text-lg text-gray-600">Here's your healthcare dashboard overview</p>
      </motion.div>

      {/* Stats Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        <motion.div variants={itemVariants}>
          <StatCard
            title="Total Patients"
            value="1,247"
            icon={<Users className="w-6 h-6 text-[#0D9488]" />}
            trend="+12% from last month"
            color="text-[#0D9488]"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Available Beds"
            value="23"
            icon={<Bed className="w-6 h-6 text-[#0D9488]" />}
            trend="78% occupancy"
            color="text-[#0D9488]"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Today's Appointments"
            value="45"
            icon={<Calendar className="w-6 h-6 text-[#0D9488]" />}
            trend="8 teleconsultations"
            color="text-[#0D9488]"
          />
        </motion.div>
        <motion.div variants={itemVariants}>
          <StatCard
            title="Patient Satisfaction"
            value="4.9"
            icon={<TrendingUp className="w-6 h-6 text-[#0D9488]" />}
            trend="+0.2 this month"
            color="text-[#0D9488]"
          />
        </motion.div>
      </motion.div>

      {/* Main Content Grid */}
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="grid grid-cols-1 lg:grid-cols-3 gap-6"
      >
        {/* Recent Activity */}
        <motion.div
          variants={itemVariants}
          whileHover={{ scale: 1.01 }}
          className="lg:col-span-2 bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Recent Activity</h3>
          <div className="space-y-4">
            {[
              { time: '10:30 AM', event: 'New patient registered', type: 'info', icon: Users },
              { time: '11:15 AM', event: 'Emergency admission - Room A101', type: 'urgent', icon: AlertCircle },
              { time: '11:45 AM', event: 'Teleconsultation completed', type: 'success', icon: CheckCircle },
              { time: '12:20 PM', event: 'Bed B202 now available', type: 'info', icon: Bed }
            ].map((activity, index) => {
              const ActivityIcon = activity.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-center space-x-4 p-4 rounded-xl bg-white/30 hover:bg-white/50 transition-colors"
                >
                  <div className={`p-2 rounded-lg ${
                    activity.type === 'urgent' ? 'bg-red-500/20' :
                    activity.type === 'success' ? 'bg-green-500/20' : 'bg-[#0D9488]/20'
                  }`}>
                    <ActivityIcon className={`w-5 h-5 ${
                      activity.type === 'urgent' ? 'text-red-500' :
                      activity.type === 'success' ? 'text-green-500' : 'text-[#0D9488]'
                    }`} />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{activity.event}</p>
                    <p className="text-xs text-gray-600">{activity.time}</p>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    activity.type === 'urgent' ? 'bg-red-500' :
                    activity.type === 'success' ? 'bg-green-500' : 'bg-[#0D9488]'
                  }`} />
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Quick Stats */}
        <motion.div
          variants={itemVariants}
          className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Stats</h3>
          <div className="space-y-4">
            <div className="p-4 bg-[#0D9488]/10 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Active Cases</p>
              <p className="text-2xl font-bold text-[#0D9488]">156</p>
            </div>
            <div className="p-4 bg-[#0D9488]/10 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Pending Reports</p>
              <p className="text-2xl font-bold text-[#0D9488]">23</p>
            </div>
            <div className="p-4 bg-green-500/10 rounded-xl">
              <p className="text-sm text-gray-600 mb-1">Completed Today</p>
              <p className="text-2xl font-bold text-green-500">89</p>
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Quick Actions */}
      <motion.div
        variants={itemVariants}
        className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
      >
        <h3 className="text-xl font-semibold text-gray-900 mb-6">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { label: 'Book Appointment', color: 'bg-[#0D9488]', icon: Calendar },
            { label: 'Emergency Alert', color: 'bg-red-500', icon: AlertCircle },
            { label: 'View Reports', color: 'bg-[#0D9488]', icon: TrendingUp },
            { label: 'Staff Directory', color: 'bg-[#0D9488]', icon: Users },
            { label: 'Teleconsult', color: 'bg-blue-500', icon: Phone },
            { label: 'Bed Status', color: 'bg-green-500', icon: Bed }
          ].map((action, index) => {
            const ActionIcon = action.icon;
            return (
              <motion.button
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                whileTap={{ scale: 0.95 }}
                className={`${action.color} text-white p-4 rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow flex flex-col items-center space-y-2`}
              >
                <ActionIcon className="w-5 h-5" />
                <span className="text-xs text-center">{action.label}</span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </motion.div>
  );
}