import { motion } from 'framer-motion';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';
import { mockDiseaseStats, generateMockAnalytics } from '../../utils/mockData';

export function AnalyticsDashboard() {
  const analytics = generateMockAnalytics();
  
  const COLORS = ['#0D9488', '#0F766E', '#14B8A6', '#2DD4BF', '#5EEAD4'];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'down': return <TrendingDown className="w-4 h-4 text-red-500" />;
      default: return <Minus className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6"
    >
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Patient Analytics & Insights</h2>
        <p className="text-gray-600">Comprehensive healthcare data visualization and trends</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Weekly Patient Flow</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.patientFlow}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(13, 148, 136, 0.2)" />
              <XAxis dataKey="day" stroke="#6D6875" />
              <YAxis stroke="#6D6875" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(13, 148, 136, 0.2)',
                  borderRadius: '12px'
                }}
              />
              <Legend />
              <Bar dataKey="patients" fill="#0D9488" name="Admissions" radius={[4, 4, 0, 0]} />
              <Bar dataKey="discharges" fill="#14B8A6" name="Discharges" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Bed Occupancy Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={analytics.bedOccupancy}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(13, 148, 136, 0.2)" />
              <XAxis dataKey="date" stroke="#6D6875" />
              <YAxis stroke="#6D6875" />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(13, 148, 136, 0.2)',
                  borderRadius: '12px'
                }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="occupied" 
                stroke="#0D9488" 
                strokeWidth={3}
                name="Occupied Beds"
                dot={{ fill: '#0D9488', strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="available" 
                stroke="#14B8A6" 
                strokeWidth={3}
                name="Available Beds"
                dot={{ fill: '#14B8A6', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="lg:col-span-2 bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Top 5 Medical Conditions</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={mockDiseaseStats}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percentage }) => `${name} (${percentage}%)`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="cases"
              >
                {mockDiseaseStats.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(13, 148, 136, 0.2)',
                  borderRadius: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          whileHover={{ scale: 1.01 }}
          className="bg-white/60 backdrop-blur-lg rounded-2xl p-6 border border-white/20 shadow-lg"
        >
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Disease Trends</h3>
          <div className="space-y-4">
            {mockDiseaseStats.map((disease, index) => (
              <motion.div
                key={disease.name}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className="flex items-center justify-between p-3 bg-white/50 rounded-lg"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-900 text-sm">{disease.name}</p>
                  <p className="text-xs text-gray-600">{disease.cases} cases</p>
                </div>
                <div className="flex items-center space-x-2">
                  {getTrendIcon(disease.trend)}
                  <span className="text-sm font-medium text-[#0D9488]">{disease.percentage}%</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}