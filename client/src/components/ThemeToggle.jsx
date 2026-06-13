import { motion } from 'framer-motion';
import { HiSun, HiMoon } from 'react-icons/hi';
import { useTheme } from '../context/ThemeContext';

const ThemeToggle = () => {
  const { darkMode, toggleTheme } = useTheme();

  return (
    <motion.button
      onClick={toggleTheme}
      whileTap={{ scale: 0.9 }}
      className={`relative p-2 rounded-xl transition-colors duration-300 ${
        darkMode
          ? 'text-yellow-300 hover:bg-white/10'
          : 'text-gem-600 hover:bg-gem-50'
      }`}
      aria-label="Toggle theme"
    >
      <motion.div
        key={darkMode ? 'moon' : 'sun'}
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        exit={{ scale: 0, rotate: 180 }}
        transition={{ duration: 0.3 }}
      >
        {darkMode ? <HiSun size={20} /> : <HiMoon size={20} />}
      </motion.div>
    </motion.button>
  );
};

export default ThemeToggle;
