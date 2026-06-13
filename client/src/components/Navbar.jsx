import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { HiMenu, HiX } from 'react-icons/hi';
import { FaCompass } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const { isAuthenticated, logout, user } = useAuth();
  const { darkMode } = useTheme();
  const location = useLocation();

  const navLinks = [
    { name: 'Gemstone Catalog', path: '/catalog' },
    { name: 'Gemstone Recommendation', path: '/recommend' },
  ];

  if (isAuthenticated) {
    navLinks.push({ name: 'My Gemstones', path: '/my-gemstones' });
    navLinks.push({ name: 'Dashboard', path: '/dashboard' });
  }

  const isActive = (path) => location.pathname === path;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        darkMode
          ? 'bg-gem-950/80 backdrop-blur-xl border-b border-white/5'
          : 'bg-white/80 backdrop-blur-xl border-b border-gem-200/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-18">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.6 }}
            >
              <FaCompass
                className={`text-2xl ${
                  darkMode ? 'text-gem-400' : 'text-gem-600'
                }`}
              />
            </motion.div>
            <span
              className={`text-xl font-display font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Astro<span className="gradient-text">Sphere</span>
              <span className="text-[9px] ml-1.5 px-1.5 py-0.5 rounded bg-gem-500/10 text-gem-500 font-semibold border border-gem-500/20 uppercase tracking-widest align-middle">
                CRM
              </span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                  isActive(link.path)
                    ? darkMode
                      ? 'bg-gem-600/20 text-gem-300'
                      : 'bg-gem-100 text-gem-700'
                    : darkMode
                    ? 'text-gray-300 hover:text-white hover:bg-white/5'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right side */}
          <div className="hidden md:flex items-center gap-3">
            {isAuthenticated ? (
              <div className="flex items-center gap-3">
                <span
                  className={`text-sm ${
                    darkMode ? 'text-gem-300' : 'text-gem-600'
                  }`}
                >
                  Hi, {user?.name?.split(' ')[0]}
                </span>
                <button
                  onClick={logout}
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    darkMode
                      ? 'text-gray-300 hover:text-white border border-white/10 hover:border-white/20'
                      : 'text-gray-600 hover:text-gray-900 border border-gray-200 hover:border-gray-300'
                  }`}
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link
                  to="/login"
                  className={`px-4 py-2 rounded-xl text-sm font-medium transition-all duration-300 ${
                    darkMode
                      ? 'text-gray-300 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="btn-primary !px-4 !py-2 !text-sm"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`p-2 rounded-xl transition-colors ${
                darkMode
                  ? 'text-white hover:bg-white/10'
                  : 'text-gray-800 hover:bg-gray-100'
              }`}
            >
              {mobileOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className={`md:hidden overflow-hidden ${
              darkMode
                ? 'bg-gem-950/95 backdrop-blur-xl'
                : 'bg-white/95 backdrop-blur-xl'
            }`}
          >
            <div className="px-4 py-4 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setMobileOpen(false)}
                  className={`block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-300 ${
                    isActive(link.path)
                      ? darkMode
                        ? 'bg-gem-600/20 text-gem-300'
                        : 'bg-gem-100 text-gem-700'
                      : darkMode
                      ? 'text-gray-300 hover:bg-white/5'
                      : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <hr
                className={`${
                  darkMode ? 'border-white/10' : 'border-gray-200'
                }`}
              />
              {isAuthenticated ? (
                <button
                  onClick={() => {
                    logout();
                    setMobileOpen(false);
                  }}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium ${
                    darkMode ? 'text-gray-300' : 'text-gray-600'
                  }`}
                >
                  Logout
                </button>
              ) : (
                <div className="space-y-2">
                  <Link
                    to="/login"
                    onClick={() => setMobileOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-sm font-medium ${
                      darkMode ? 'text-gray-300' : 'text-gray-600'
                    }`}
                  >
                    Login
                  </Link>
                  <Link
                    to="/register"
                    onClick={() => setMobileOpen(false)}
                    className="block text-center btn-primary !text-sm"
                  >
                    Sign Up
                  </Link>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
