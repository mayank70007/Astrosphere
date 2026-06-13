import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaGem } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '../context/AuthContext';
import { gemstoneAPI, favoritesAPI } from '../services/api';
import GemstoneCard from '../components/GemstoneCard';
import SearchFilter from '../components/SearchFilter';

const Catalog = () => {
  const { darkMode } = useTheme();
  const { isAuthenticated } = useAuth();
  const [gemstones, setGemstones] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedZodiac, setSelectedZodiac] = useState('');
  const [selectedColor, setSelectedColor] = useState('');

  useEffect(() => {
    fetchGemstones();
    if (isAuthenticated) {
      fetchFavorites();
    }
  }, [searchTerm, selectedZodiac, selectedColor]);

  const fetchGemstones = async () => {
    try {
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (selectedZodiac) params.zodiac = selectedZodiac;
      if (selectedColor) params.color = selectedColor;

      const res = await gemstoneAPI.getAll(params);
      setGemstones(res.data);
    } catch (error) {
      console.error('Error fetching gemstones:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchFavorites = async () => {
    try {
      const res = await favoritesAPI.getAll();
      setFavorites(res.data.map((g) => g._id));
    } catch (error) {
      console.error('Error fetching favorites:', error);
    }
  };

  const handleToggleFavorite = async (gemstoneId) => {
    if (!isAuthenticated) return;

    try {
      if (favorites.includes(gemstoneId)) {
        await favoritesAPI.remove(gemstoneId);
        setFavorites((prev) => prev.filter((id) => id !== gemstoneId));
      } else {
        await favoritesAPI.add(gemstoneId);
        setFavorites((prev) => [...prev, gemstoneId]);
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    }
  };

  const firstSix = gemstones.slice(0, 6);
  const remainingGems = gemstones.slice(6);

  return (
    <div className={`min-h-screen pt-24 pb-16 px-4 ${darkMode ? 'bg-cosmic' : 'bg-cosmic-light'}`}>
      {/* Background */}
      <div className="fixed top-1/3 right-0 w-80 h-80 rounded-full bg-gem-600/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-1/3 left-0 w-80 h-80 rounded-full bg-emerald-600/10 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
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
            <FaGem className={darkMode ? 'text-gem-400' : 'text-gem-600'} />
            <span className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-gem-300' : 'text-gem-700'}`}>
              Celestial Remedy Assets
            </span>
          </div>
          <h1
            className={`text-3xl md:text-4xl font-display font-bold mb-3 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Gemstone <span className="gradient-text">Catalog</span>
          </h1>
          <p className={`text-sm max-w-xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Browse and filter verified astrological remedies, orbital alignments, and planetary crystal values.
          </p>
        </motion.div>

        {/* Gemstones First 2 Rows */}
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gem-400"></div>
          </div>
        ) : firstSix.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {firstSix.map((gem, index) => (
              <GemstoneCard
                key={gem._id}
                gemstone={gem}
                index={index}
                isFavorite={favorites.includes(gem._id)}
                onToggleFavorite={handleToggleFavorite}
                showFavorite={isAuthenticated}
              />
            ))}
          </div>
        ) : null}

        {/* Search & Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className={`rounded-2xl p-5 mb-8 border ${darkMode ? 'glass-dark border-white/5' : 'glass-light border-gem-200/20'}`}
        >
          <SearchFilter
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            selectedZodiac={selectedZodiac}
            onZodiacChange={setSelectedZodiac}
            selectedColor={selectedColor}
            onColorChange={setSelectedColor}
          />
        </motion.div>

        {/* Results count */}
        <div className={`mb-6 text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
          Showing {gemstones.length} calibrated remedy profile{gemstones.length !== 1 ? 's' : ''}
        </div>

        {/* Gemstones Remaining Rows */}
        {!loading && remainingGems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {remainingGems.map((gem, index) => (
              <GemstoneCard
                key={gem._id}
                gemstone={gem}
                index={index + 6}
                isFavorite={favorites.includes(gem._id)}
                onToggleFavorite={handleToggleFavorite}
                showFavorite={isAuthenticated}
              />
            ))}
          </div>
        )}

        {!loading && gemstones.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <FaGem className={`text-5xl mx-auto mb-4 ${darkMode ? 'text-gem-750' : 'text-gem-200'}`} />
            <p className={`text-lg ${darkMode ? 'text-gray-450' : 'text-gray-500'}`}>
              No remedy alignments found matching current natal search filters.
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Catalog;
