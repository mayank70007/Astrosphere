import { Link } from 'react-router-dom';
import { FaCompass, FaHeart, FaHome, FaGem, FaStar } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const Footer = () => {
  const { darkMode } = useTheme();

  return (
    <footer
      className={`relative py-12 mt-auto ${
        darkMode
          ? 'bg-gem-950/80 backdrop-blur-xl border-t border-white/5'
          : 'bg-white/80 backdrop-blur-xl border-t border-gem-200/30'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-4">
              <FaCompass
                className={`text-2xl ${
                  darkMode ? 'text-gem-400' : 'text-gem-600'
                }`}
              />
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
            <p
              className={`text-sm leading-relaxed ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              The premier celestial remedy calibration engine. Map client natal charts,
              prescribe high-vibrational gemstone alignments, and track cosmic remedies in real time.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3
              className={`font-display font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Quick Navigation
            </h3>
            <div className="space-y-2">
              {[
                { name: 'Command Home', path: '/', icon: <FaHome className="text-xs" /> },
                { name: 'Gemstone Catalog', path: '/catalog', icon: <FaGem className="text-xs" /> },
                { name: 'Gemstone Recommendation', path: '/recommend', icon: <FaStar className="text-xs" /> },
              ].map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-2 text-sm transition-colors ${
                    darkMode
                      ? 'text-gray-400 hover:text-gem-300'
                      : 'text-gray-500 hover:text-gem-600'
                  }`}
                >
                  {link.icon}
                  {link.name}
                </Link>
              ))}
            </div>
          </div>

          {/* About */}
          <div>
            <h3
              className={`font-display font-semibold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}
            >
              Enterprise Astrological Intelligence
            </h3>
            <p
              className={`text-sm leading-relaxed ${
                darkMode ? 'text-gray-400' : 'text-gray-500'
              }`}
            >
              AstroSphere CRM combines advanced transit calculations with ancient Vedic gemstone
              methodologies, providing professional consultants with a secure client management remedy framework.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className={`mt-8 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-4 ${
            darkMode ? 'border-white/5' : 'border-gray-200'
          }`}
        >
          <p
            className={`text-sm ${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            © {new Date().getFullYear()} AstroSphere CRM. All rights reserved.
          </p>
          <p
            className={`text-sm flex items-center gap-1 ${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            }`}
          >
            Made with <FaHeart className="text-red-400 text-xs" /> for Humara Pandit
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
