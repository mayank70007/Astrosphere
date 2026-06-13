import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaTrash } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { favoritesAPI } from '../services/api';
import GemstoneCard from '../components/GemstoneCard';

const MyGemstones = () => {
  const { darkMode } = useTheme();
  const { refreshUser } = useAuth();
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const res = await favoritesAPI.getAll();
      setFavorites(res.data);
    } catch (error) {
      console.error('Error fetching favorites:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = async (gemstoneId) => {
    try {
      await favoritesAPI.remove(gemstoneId);
      setFavorites((prev) => prev.filter((g) => g._id !== gemstoneId));
      refreshUser();
    } catch (error) {
      console.error('Error removing favorite:', error);
    }
  };

  return (
    <div className={`min-h-screen pt-24 pb-16 px-4 ${darkMode ? 'bg-cosmic' : 'bg-cosmic-light'}`}>
      {/* Background orbs */}
      <div className="fixed top-1/4 right-0 w-80 h-80 rounded-full bg-gem-600/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-1/4 left-0 w-80 h-80 rounded-full bg-gold-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${
              darkMode
                ? 'bg-gem-600/10 border border-gem-500/20'
                : 'bg-gem-50 border border-gem-200/50'
            }`}
          >
            <FaHeart className={darkMode ? 'text-gem-400 animate-pulse' : 'text-gem-600 animate-pulse'} />
            <span className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-gem-300' : 'text-gem-700'}`}>
              Saved Remedies
            </span>
          </div>
          <h1 className={`text-3xl md:text-4xl font-display font-bold mb-3 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            My <span className="gradient-text">Gemstones</span>
          </h1>
          <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Your curated collection of recommended planetary crystals and specimens.
          </p>
        </motion.div>

        {/* Content */}
        <div>
          {loading ? (
            <div className="flex items-center justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gem-400"></div>
            </div>
          ) : favorites.length === 0 ? (
            <div className="text-center py-20">
              <FaHeart className={`text-5xl mx-auto mb-4 ${darkMode ? 'text-gem-750' : 'text-gem-200'}`} />
              <p className={`text-lg mb-2 font-semibold ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                No Saved Gemstones Found
              </p>
              <p className={`text-sm max-w-md mx-auto ${darkMode ? 'text-gray-500' : 'text-gray-400'}`}>
                Get recommendations or browse the gemstone catalog to select and save gemstone specimens to your portfolio.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {favorites.map((gem, index) => (
                <div key={gem._id} className="relative group">
                  <GemstoneCard gemstone={gem} index={index} />
                  <button
                    onClick={() => handleRemoveFavorite(gem._id)}
                    className={`absolute top-3 right-3 z-30 p-2 rounded-full transition-all backdrop-blur-md ${
                      darkMode
                        ? 'bg-red-500/20 text-red-400 hover:bg-red-500/40 border border-red-500/10'
                        : 'bg-red-50 text-red-500 hover:bg-red-100 border border-red-200/20 shadow-md'
                    }`}
                    title="Remove Specimen"
                  >
                    <FaTrash className="text-xs" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyGemstones;
