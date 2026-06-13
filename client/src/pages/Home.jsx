import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { FaArrowRight, FaStar, FaCompass, FaGem } from 'react-icons/fa';
import { HiSparkles, HiCollection, HiBookmark } from 'react-icons/hi';
import { useTheme } from '../context/ThemeContext';

const Home = () => {
  const { darkMode } = useTheme();

  const features = [
    {
      icon: <HiSparkles className="text-2xl" />,
      title: 'Gemstone Recommendation',
      desc: 'Generate deep-level gemstone remedies matching precise sun signs, ascendants, and client goals.',
      gradient: 'from-gem-500 to-amber-600',
    },
    {
      icon: <HiCollection className="text-2xl" />,
      title: 'Remedy Database',
      desc: 'Access detailed astrological characteristics, ruling planets, best ritual days, and activation protocols.',
      gradient: 'from-orange-500 to-amber-600',
    },
    {
      icon: <HiBookmark className="text-2xl" />,
      title: 'Prescription Archives',
      desc: 'Maintain client directories, save astrological prescriptions, and track calibration history securely.',
      gradient: 'from-gold-500 to-orange-600',
    },
  ];

  const steps = [
    { num: '01', title: 'Natal Coordinates', desc: 'Input client details, sun signs, ascendants, and primary life ambitions.' },
    { num: '02', title: 'Gemstone Recommendation', desc: 'Our engine calculates planetary transits and computes the perfect gemstone remedies.' },
    { num: '03', title: 'Prescribe & Deploy', desc: 'Access activation protocols, best wear days, and save details to client profiles.' },
  ];

  const popularGems = [
    { name: 'Ruby (Manikya)', color: 'from-red-500 to-rose-600', emoji: '🔴', zodiac: 'Aries' },
    { name: 'Emerald (Panna)', color: 'from-emerald-500 to-green-600', emoji: '🟢', zodiac: 'Taurus' },
    { name: 'Blue Sapphire (Neelam)', color: 'from-blue-500 to-indigo-600', emoji: '🔵', zodiac: 'Virgo' },
    { name: 'Amethyst (Jamuniya)', color: 'from-purple-500 to-violet-600', emoji: '🟣', zodiac: 'Aquarius' },
  ];

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-cosmic' : 'bg-cosmic-light'}`}>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Gradient orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gem-600/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-gold-500/10 blur-[120px]" />

        <div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8 ${
                darkMode
                  ? 'bg-gem-600/10 border border-gem-500/20'
                  : 'bg-gem-50 border border-gem-200/50'
              }`}
            >
              <FaCompass className={darkMode ? 'text-gem-400' : 'text-gem-600'} />
              <span className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-gem-300' : 'text-gem-700'}`}>
                Astrological Remedy Calibration Platform
              </span>
            </motion.div>

            {/* Heading */}
            <h1 className={`text-4xl sm:text-5xl md:text-7xl font-display font-extrabold leading-tight mb-6 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Prescribe Precision{' '}
              <br className="sm:hidden" />
              <span className="gradient-text">Celestial</span>
              <br />
              Remedies
            </h1>

            <p className={`text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed ${
              darkMode ? 'text-gray-300' : 'text-gray-600'
            }`}>
              Map natal charts, align planetary energies, and prescribe targeted gemstone remedies
              for your clients with our enterprise-grade astrology consulting workspace.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to="/recommend">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-primary flex items-center gap-2.5 !px-8 !py-4 !text-base shadow-glow"
                >
                  <FaCompass />
                  Get Recommendation
                  <FaArrowRight className="text-sm" />
                </motion.button>
              </Link>
              <Link to="/catalog">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-secondary flex items-center gap-2.5 !px-8 !py-4 !text-base"
                >
                  Explore Gemstone Catalog
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl md:text-4xl font-display font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              The <span className="gradient-text">AstroSphere</span> Advantage
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Equipping modern consultants with standard celestial calibration protocols
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.15 }}
                whileHover={{ y: -8 }}
                className={`p-6 rounded-2xl transition-all duration-300 border ${
                  darkMode
                    ? 'glass-dark border-white/5 hover:border-gem-500/20 hover:shadow-glow'
                    : 'glass-light border-gem-200/30 hover:shadow-xl hover:border-gem-400/20'
                }`}
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center text-white mb-4`}
                >
                  {feature.icon}
                </div>
                <h3 className={`text-lg font-display font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {feature.title}
                </h3>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {feature.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-4 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-gem-500/5 blur-[150px] pointer-events-none" />
        <div className="max-w-6xl mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl md:text-4xl font-display font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Calibration <span className="gradient-text">Workflow</span>
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="text-center group"
              >
                <div
                  className={`text-5xl font-display font-extrabold mb-4 transition-colors duration-300 ${
                    darkMode ? 'text-gem-800/40 group-hover:text-gem-500' : 'text-gem-100 group-hover:text-gem-600'
                  }`}
                >
                  {step.num}
                </div>
                <h3 className={`text-lg font-display font-bold mb-2 ${
                  darkMode ? 'text-white' : 'text-gray-900'
                }`}>
                  {step.title}
                </h3>
                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Gemstones Preview */}
      <section className="py-24 px-4 relative">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className={`text-3xl md:text-4xl font-display font-bold mb-4 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Trending <span className="gradient-text">Remedies</span>
            </h2>
            <p className={`text-lg max-w-2xl mx-auto ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}>
              Top zodiac-aligned remedies deployed by astrological consultants
            </p>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {popularGems.map((gem, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
                className={`relative overflow-hidden rounded-2xl p-6 text-center cursor-pointer border ${
                  darkMode ? 'glass-dark border-white/5 shadow-glow' : 'glass-light border-gem-200/20 shadow-lg'
                }`}
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${gem.color} opacity-10`} />
                <div className="relative z-10">
                  <div className="text-4xl mb-3">{gem.emoji}</div>
                  <h3 className={`font-display font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {gem.name}
                  </h3>
                  <p className={`text-xs mt-1 font-semibold uppercase tracking-wider ${darkMode ? 'text-gem-400' : 'text-gem-600'}`}>
                    {gem.zodiac} Aligned
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/catalog">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="btn-secondary flex items-center gap-2.5 mx-auto"
              >
                Explore Gemstone Catalog
                <FaArrowRight className="text-sm" />
              </motion.button>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className={`relative overflow-hidden rounded-3xl p-8 md:p-14 text-center border ${
              darkMode ? 'glass-dark border-white/5 shadow-glow' : 'glass-light border-gem-200/30 shadow-2xl'
            }`}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-gem-600/10 to-gold-500/10" />
            <div className="relative z-10">
              <h2 className={`text-3xl md:text-4xl font-display font-bold mb-4 ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Get Gemstone <span className="gradient-text">Recommendation</span>
              </h2>
              <p className={`text-lg mb-8 max-w-xl mx-auto leading-relaxed ${
                darkMode ? 'text-gray-300' : 'text-gray-600'
              }`}>
                Map coordinates, query transit calculations, and formulate optimal client gemstone remedies.
              </p>
              <Link to="/recommend">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="btn-gold flex items-center gap-2.5 mx-auto !px-8 !py-4 !text-base shadow-glow-gold"
                >
                  <FaCompass />
                  Get Recommendation
                  <FaArrowRight className="text-sm" />
                </motion.button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
