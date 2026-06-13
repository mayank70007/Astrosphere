import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLock, FaCompass, FaArrowRight } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';

const Login = () => {
  const { darkMode } = useTheme();
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    setLoading(true);
    setError('');
    try {
      await login(formData.email, formData.password);
      navigate('/dashboard');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please verify credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen pt-24 pb-16 px-4 flex items-center justify-center ${
      darkMode ? 'bg-cosmic' : 'bg-cosmic-light'
    }`}>
      {/* Background */}
      <div className="fixed top-1/4 left-1/4 w-80 h-80 rounded-full bg-gem-600/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-gold-500/10 blur-[120px] pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md relative z-10"
      >
        <div className={`rounded-2xl p-8 border ${darkMode ? 'glass-dark border-white/5 shadow-glow' : 'glass-light border-gem-200/30 shadow-2xl'}`}>
          {/* Header */}
          <div className="text-center mb-8">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', bounce: 0.5 }}
              className={`w-16 h-16 rounded-2xl bg-gradient-to-br from-gem-500 to-gold-500 flex items-center justify-center mx-auto mb-4 shadow-lg`}
            >
              <FaCompass className="text-white text-2xl animate-spin-slow" />
            </motion.div>
            <h1 className={`text-2xl font-display font-bold mb-1 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Welcome Back
            </h1>
            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
              Access your AstroSphere CRM dashboard
            </p>
          </div>

          {/* Error */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-semibold mb-6"
            >
              {error}
            </motion.div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2.5 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <FaEnvelope className="text-gem-400 text-xs" />
                Business Email
              </label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="you@astrosphere.com"
                className={`input-glass ${darkMode ? 'input-glass-dark' : 'input-glass-light'}`}
              />
            </div>

            <div>
              <label className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2.5 ${
                darkMode ? 'text-gray-300' : 'text-gray-700'
              }`}>
                <FaLock className="text-gem-400 text-xs" />
                Password
              </label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                placeholder="••••••••"
                className={`input-glass ${darkMode ? 'input-glass-dark' : 'input-glass-light'}`}
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.01 }}
              whileTap={{ scale: loading ? 1 : 0.99 }}
              className={`w-full btn-primary !py-3.5 flex items-center justify-center gap-2 shadow-glow ${
                loading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
            >
              {loading ? (
                <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white" />
              ) : (
                <>
                  Sign In
                  <FaArrowRight className="text-sm" />
                </>
              )}
            </motion.button>
          </form>

          {/* Footer */}
          <p className={`text-center text-sm mt-6 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Don't have an account?{' '}
            <Link to="/register" className={`font-semibold ${darkMode ? 'text-gem-400 hover:text-gem-300' : 'text-gem-600 hover:text-gem-700'}`}>
              Sign Up
            </Link>
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default Login;
