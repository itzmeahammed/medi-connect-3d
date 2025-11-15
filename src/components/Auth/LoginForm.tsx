import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, LogIn, UserPlus } from 'lucide-react';
import { useAuthStore } from '../../store/authStore';

interface LoginFormProps {
  onToggleMode: () => void;
  isLogin: boolean;
}

export function LoginForm({ onToggleMode, isLogin }: LoginFormProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('patient');
  const [error, setError] = useState('');

  const { login, register, isLoading } = useAuthStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      if (isLogin) {
        await login(email, password);
      } else {
        await register({ name, email, password, role });
      }
    } catch (error: any) {
      setError(error.response?.data?.error || 'Authentication failed');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="min-h-screen flex items-center justify-center bg-white p-6"
    >
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="bg-white/60 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-lg w-full max-w-md"
      >
        <div className="text-center mb-8">
          <motion.div
            animate={{ rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-16 h-16 bg-[#0D9488] rounded-full flex items-center justify-center mx-auto mb-4"
          >
            <span className="text-2xl">🏥</span>
          </motion.div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">MediConnect</h1>
          <p className="text-gray-600">
            {isLogin ? 'Welcome back!' : 'Join our healthcare community'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Full Name</label>
              <div className="relative">
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-[#0D9488]/20 rounded-xl focus:ring-2 focus:ring-[#0D9488] focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
                <UserPlus className="absolute left-3 top-3.5 w-5 h-5 text-gray-600" />
              </div>
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-[#0D9488] focus:border-transparent"
                placeholder="Enter your email"
                required
              />
              <Mail className="absolute left-3 top-3.5 w-5 h-5 text-gray-600" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-900 mb-2">Password</label>
            <div className="relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-10 pr-4 py-3 border border-white/20 rounded-xl focus:ring-2 focus:ring-[#0D9488] focus:border-transparent"
                placeholder="Enter your password"
                required
              />
              <Lock className="absolute left-3 top-3.5 w-5 h-5 text-gray-600" />
            </div>
          </div>

          {!isLogin && (
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">Role</label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value)}
                className="w-full p-3 border border-[#0D9488]/20 rounded-xl focus:ring-2 focus:ring-[#0D9488] focus:border-transparent"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
                <option value="admin">Administrator</option>
              </select>
            </div>
          )}

          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 bg-red-100 border border-red-200 rounded-lg text-red-700 text-sm"
            >
              {error}
            </motion.div>
          )}

          <motion.button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className="w-full bg-[#0D9488] text-white py-3 rounded-xl font-medium shadow-lg hover:shadow-xl transition-shadow disabled:opacity-50 flex items-center justify-center space-x-2"
          >
            {isLoading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>
                <LogIn className="w-5 h-5" />
                <span>{isLogin ? 'Sign In' : 'Create Account'}</span>
              </>
            )}
          </motion.button>
        </form>

        <div className="mt-6 text-center">
          <button
            onClick={onToggleMode}
            className="text-[#0D9488] hover:text-[#0F766E] transition-colors text-sm"
          >
            {isLogin ? "Don't have an account? Sign up" : "Already have an account? Sign in"}
          </button>
        </div>

        {isLogin && (
          <div className="mt-6 p-4 bg-[#0D9488]/10 rounded-lg">
            <p className="text-xs text-gray-600 mb-2">Demo Accounts:</p>
            <div className="space-y-1 text-xs">
              <p><strong>Admin:</strong> admin@mediconnect.com / admin123</p>
              <p><strong>Doctor:</strong> sarah.chen@mediconnect.com / doctor123</p>
              <p><strong>Patient:</strong> john@example.com / patient123</p>
            </div>
          </div>
        )}
      </motion.div>
    </motion.div>
  );
}