import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowLeft, FaRedo, FaHeart, FaGem, FaCompass } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { favoritesAPI } from '../services/api';
import RecommendationCard from '../components/RecommendationCard';
import { useState } from 'react';

const RecommendResult = () => {
  const { darkMode } = useTheme();
  const { isAuthenticated, refreshUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState({});

  const result = location.state?.result;
  const formData = location.state?.formData;

  if (!result) {
    return (
      <div className={`min-h-screen pt-24 flex flex-col items-center justify-center ${
        darkMode ? 'bg-cosmic' : 'bg-cosmic-light'
      }`}>
        <FaCompass className={`text-6xl mb-4 ${darkMode ? 'text-gem-400 animate-spin-slow' : 'text-gem-600'}`} />
        <h2 className={`text-2xl font-display font-bold mb-4 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          No Recommendations Found
        </h2>
        <p className={`mb-6 text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Please complete the gemstone recommendation form first.
        </p>
        <Link to="/recommend" className="btn-primary">
          Get Recommendation
        </Link>
      </div>
    );
  }

  const handleSaveFavorite = async (gemstoneId) => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }
    setSaving(true);
    try {
      await favoritesAPI.add(gemstoneId);
      setSaved((prev) => ({ ...prev, [gemstoneId]: true }));
      refreshUser();
    } catch (err) {
      console.error('Failed to save remedy:', err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className={`min-h-screen pt-24 pb-16 px-4 ${darkMode ? 'bg-cosmic' : 'bg-cosmic-light'}`}>
      {/* Background */}
      <div className="fixed top-1/4 left-0 w-96 h-96 rounded-full bg-gem-600/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-0 w-96 h-96 rounded-full bg-gold-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="w-16 h-16 rounded-full border border-dashed border-gem-500/40 flex items-center justify-center relative animate-spin-slow mx-auto mb-4">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gem-500 to-gold-500 flex items-center justify-center shadow-md">
              <FaCompass className="text-white text-lg" />
            </div>
          </div>
          <h1 className={`text-3xl md:text-4xl font-display font-bold mb-3 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Prescription <span className="gradient-text">Formulations</span>
          </h1>
          <p className="text-sm text-gray-650 text-gray-650">
            Natal alignment for <span className="font-extrabold text-gray-900">{formData?.name || 'Client'}</span> ({formData?.zodiac}) calibrated for <span className="font-extrabold text-gem-700">{formData?.goal}</span>
          </p>
        </motion.div>

        {/* Recommendation Cards */}
        <div className="space-y-6 mb-10">
          {result.recommendations?.map((gemstone, index) => (
            <div key={gemstone._id}>
              <RecommendationCard
                gemstone={gemstone}
                type={gemstone.name === result.zodiacGemstone ? 'zodiac' : 'goal'}
                index={index}
              />
              {/* Save button */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.2 }}
                className="flex justify-end mt-3"
              >
                <button
                  onClick={() => handleSaveFavorite(gemstone._id)}
                  disabled={saving || saved[gemstone._id]}
                  className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all border ${
                    saved[gemstone._id]
                      ? 'bg-green-500/10 text-green-400 border-green-500/20'
                      : darkMode
                      ? 'bg-white/5 text-gray-300 hover:bg-white/10 border-white/5 hover:border-gem-500/20'
                      : 'bg-white text-gray-600 hover:bg-gem-50 border-gray-200'
                  }`}
                >
                  <FaHeart className={saved[gemstone._id] ? 'text-red-400' : ''} />
                  {saved[gemstone._id] ? 'Prescribed & Saved' : 'Add to Saved Remedies'}
                </button>
              </motion.div>
            </div>
          ))}
        </div>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link to="/recommend">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-primary flex items-center gap-2.5 shadow-glow"
            >
              <FaRedo />
              New Recommendation
            </motion.button>
          </Link>
          <Link to="/catalog">
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn-secondary flex items-center gap-2.5"
            >
              Explore Gemstone Catalog
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
};

export default RecommendResult;
