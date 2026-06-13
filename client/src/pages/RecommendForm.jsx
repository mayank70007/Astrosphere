import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { FaGem, FaArrowRight, FaArrowLeft, FaUser, FaBirthdayCake, FaStar, FaBullseye, FaBrain, FaCompass } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';
import { recommendAPI } from '../services/api';

const zodiacSigns = [
  'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

const personalityTypes = [
  { value: 'Leader', icon: '👑', desc: 'Born to lead and inspire' },
  { value: 'Creative', icon: '🎨', desc: 'Artistic and imaginative' },
  { value: 'Analytical', icon: '🧠', desc: 'Logical and detail-oriented' },
  { value: 'Emotional', icon: '💖', desc: 'Empathetic and intuitive' },
  { value: 'Adventurous', icon: '🌍', desc: 'Bold and exploration-driven' },
];

const goals = [
  { value: 'Career Growth', icon: '📈', color: 'from-emerald-500 to-teal-600' },
  { value: 'Wealth', icon: '💰', color: 'from-gold-500 to-yellow-600' },
  { value: 'Love', icon: '❤️', color: 'from-pink-500 to-rose-600' },
  { value: 'Health', icon: '🌿', color: 'from-green-500 to-lime-600' },
  { value: 'Confidence', icon: '💪', color: 'from-orange-500 to-amber-600' },
  { value: 'Education', icon: '📚', color: 'from-blue-500 to-indigo-600' },
];

const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

const dashas = [
  'Sun (Surya) Dasha',
  'Moon (Chandra) Dasha',
  'Mars (Mangal) Dasha',
  'Rahu Dasha',
  'Jupiter (Guru) Dasha',
  'Saturn (Shani) Dasha',
  'Mercury (Budha) Dasha',
  'Ketu Dasha',
  'Venus (Shukra) Dasha',
];

const materialTiers = [
  'Any Tier / Material',
  'Precious Only (e.g. Ruby, Emerald, Sapphire)',
  'Semi-Precious Only (e.g. Agate, Topaz, Amethyst)',
];

const RecommendForm = () => {
  const { darkMode } = useTheme();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [step, setStep] = useState(1);

  const [formData, setFormData] = useState({
    name: '',
    dateOfBirth: '',
    zodiac: '',
    birthMonth: '',
    personalityType: 'Leader',
    goal: 'Career Growth',
    birthTime: '',
    birthPlace: '',
    currentDasha: '',
    materialTier: 'Any Tier / Material',
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    setError('');
  };

  const nextStep = () => {
    if (step === 1) {
      if (!formData.name.trim()) {
        setError('Client Name is required.');
        return;
      }
    } else if (step === 2) {
      if (!formData.zodiac) {
        setError('Please select a Sun Sign (Zodiac).');
        return;
      }
    }
    setError('');
    setStep((prev) => prev + 1);
  };

  const prevStep = () => {
    setError('');
    setStep((prev) => prev - 1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.goal) {
      setError('Please select a primary intention/goal.');
      return;
    }

    setLoading(true);
    try {
      const res = await recommendAPI.getRecommendation(formData);
      navigate('/recommend/result', { state: { result: res.data, formData } });
    } catch (err) {
      setError(err.response?.data?.message || 'Recommendation request failed. Please verify form details and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`min-h-screen pt-24 pb-16 px-4 ${darkMode ? 'bg-cosmic' : 'bg-cosmic-light'}`}>
      {/* Background orbs */}
      <div className="fixed top-1/3 left-0 w-80 h-80 rounded-full bg-gem-600/10 blur-[120px] pointer-events-none" />
      <div className="fixed bottom-1/3 right-0 w-80 h-80 rounded-full bg-gold-500/10 blur-[120px] pointer-events-none" />

      <div className="max-w-3xl mx-auto relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-full mb-4 ${
              darkMode
                ? 'bg-gem-600/10 border border-gem-500/20'
                : 'bg-gem-50 border border-gem-200/50'
            }`}
          >
            <FaCompass className={darkMode ? 'text-gem-400' : 'text-gem-600'} />
            <span className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-gem-300' : 'text-gem-700'}`}>
              Astrological Prescription Engine
            </span>
          </div>
          <h1
            className={`text-3xl md:text-4xl font-display font-bold mb-3 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}
          >
            Gemstone <span className="gradient-text">Recommendation</span>
          </h1>
          <p className={`text-sm max-w-xl mx-auto ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
            Formulate target-vibrational gemstone prescriptions using client planetary alignments and intentions.
          </p>
        </motion.div>

        {/* Progress Steps Indicator */}
        <div className="flex items-center justify-between mb-8 max-w-md mx-auto relative px-4">
          <div className="absolute top-1/2 left-0 right-0 h-0.5 bg-gray-200 -translate-y-1/2 z-0" />
          <div
            className="absolute top-1/2 left-0 h-0.5 bg-gem-500 -translate-y-1/2 z-0 transition-all duration-300"
            style={{ width: `${((step - 1) / 2) * 92 + 4}%` }}
          />
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              onClick={() => {
                if (num < step) setStep(num);
              }}
              className={`relative z-10 w-9 h-9 rounded-full flex items-center justify-center font-bold text-xs border transition-all duration-350 cursor-pointer ${
                step === num
                  ? 'bg-gem-600 border-gem-500 text-white shadow-glow'
                  : step > num
                  ? 'bg-gem-100 border-gem-300 text-gem-700'
                  : 'bg-white border-gray-200 text-gray-400 pointer-events-none'
              }`}
            >
              {num}
            </div>
          ))}
        </div>

        {/* Form Container */}
        <motion.form
          layout
          onSubmit={handleSubmit}
          className={`rounded-2xl p-6 md:p-8 space-y-8 border transition-all duration-300 ${
            darkMode ? 'glass-dark border-white/5 shadow-glow' : 'glass-light border-gem-200/30 shadow-2xl'
          }`}
        >
          {/* Step Subtitle */}
          <div className="text-center pb-4 border-b border-gray-100">
            <h3 className={`text-lg font-bold font-display ${darkMode ? 'text-white' : 'text-gray-900'}`}>
              {step === 1 && 'Step 1: Personal Details'}
              {step === 2 && 'Step 2: Astrological Profile'}
              {step === 3 && 'Step 3: Remedy Alignment'}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {step === 1 && 'Enter the client’s identity details and birth coordinates.'}
              {step === 2 && 'Select the client’s planetary sun sign and active celestial periods.'}
              {step === 3 && 'Specify the primary goal and temperament to calibrate remedies.'}
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm font-semibold"
            >
              {error}
            </motion.div>
          )}

          {/* Step Content */}
          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div
                key="step1"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Client Name */}
                <div>
                  <label className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2.5 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <FaUser className="text-gem-400 text-xs" />
                    Client Name <span className="text-red-400 font-bold">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleChange('name', e.target.value)}
                    placeholder="Enter client's full name"
                    className="w-full py-3.5 px-4 text-sm transition-all duration-300 bg-white/80 border border-gem-200/40 outline-none focus:border-gem-400 focus:ring-1 focus:ring-gem-400/20 rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md text-gray-900"
                  />
                </div>

                {/* Birth Date and Month */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2.5 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <FaBirthdayCake className="text-gem-400 text-xs" />
                      Birth Date
                    </label>
                    <input
                      type="date"
                      value={formData.dateOfBirth}
                      onChange={(e) => handleChange('dateOfBirth', e.target.value)}
                      className="w-full py-3.5 px-4 text-sm transition-all duration-300 bg-white/80 border border-gem-200/40 outline-none focus:border-gem-400 focus:ring-1 focus:ring-gem-400/20 rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md text-gray-900"
                    />
                  </div>
                  <div>
                    <label className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2.5 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <FaStar className="text-gold-400 text-xs" />
                      Birth Month
                    </label>
                    <select
                      value={formData.birthMonth}
                      onChange={(e) => handleChange('birthMonth', e.target.value)}
                      className="w-full py-3.5 px-4 text-sm transition-all duration-300 bg-white/80 border border-gem-200/40 outline-none focus:border-gem-400 focus:ring-1 focus:ring-gem-400/20 rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md cursor-pointer text-gray-900"
                    >
                      <option value="">Select month</option>
                      {months.map((m) => (
                        <option key={m} value={m} className="bg-white text-gray-800">
                          {m}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Birth Time and Birth Place */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2.5 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <FaCompass className="text-gem-400 text-xs animate-spin-slow" />
                      Birth Time
                    </label>
                    <input
                      type="time"
                      value={formData.birthTime}
                      onChange={(e) => handleChange('birthTime', e.target.value)}
                      className="w-full py-3.5 px-4 text-sm transition-all duration-300 bg-white/80 border border-gem-200/40 outline-none focus:border-gem-400 focus:ring-1 focus:ring-gem-400/20 rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md text-gray-900"
                    />
                  </div>
                  <div>
                    <label className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2.5 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <FaCompass className="text-gold-400 text-xs" />
                      Birth Place / City
                    </label>
                    <input
                      type="text"
                      value={formData.birthPlace}
                      onChange={(e) => handleChange('birthPlace', e.target.value)}
                      placeholder="e.g. Jaipur, India"
                      className="w-full py-3.5 px-4 text-sm transition-all duration-300 bg-white/80 border border-gem-200/40 outline-none focus:border-gem-400 focus:ring-1 focus:ring-gem-400/20 rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md text-gray-900"
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div
                key="step2"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Sun Sign */}
                <div>
                  <label className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-3.5 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <FaStar className="text-gem-400 text-xs" />
                    Sun Sign (Zodiac) <span className="text-red-400 font-bold">*</span>
                  </label>
                  <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
                    {zodiacSigns.map((sign) => (
                      <motion.button
                        key={sign}
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleChange('zodiac', sign)}
                        className={`p-3 rounded-xl text-xs font-bold uppercase tracking-wider text-center transition-all duration-200 border ${
                          formData.zodiac === sign
                            ? 'bg-gem-600 border-gem-500 text-white shadow-glow'
                            : 'bg-white/70 text-gray-600 hover:bg-gem-50 border-gem-200 hover:border-gem-300'
                        }`}
                      >
                        {sign}
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Current Dasha and Material Tier */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div>
                    <label className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2.5 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <FaStar className="text-gem-400 text-xs" />
                      Current Astrological Period (Dasha)
                    </label>
                    <select
                      value={formData.currentDasha}
                      onChange={(e) => handleChange('currentDasha', e.target.value)}
                      className="w-full py-3.5 px-4 text-sm transition-all duration-300 bg-white/80 border border-gem-200/40 outline-none focus:border-gem-400 focus:ring-1 focus:ring-gem-400/20 rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md cursor-pointer text-gray-900"
                    >
                      <option value="">Select active Dasha</option>
                      {dashas.map((dasha) => (
                        <option key={dasha} value={dasha} className="bg-white text-gray-800">
                          {dasha}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-2.5 ${
                      darkMode ? 'text-gray-300' : 'text-gray-700'
                    }`}>
                      <FaGem className="text-gold-400 text-xs" />
                      Gemstone Classification Tier
                    </label>
                    <select
                      value={formData.materialTier}
                      onChange={(e) => handleChange('materialTier', e.target.value)}
                      className="w-full py-3.5 px-4 text-sm transition-all duration-300 bg-white/80 border border-gem-200/40 outline-none focus:border-gem-400 focus:ring-1 focus:ring-gem-400/20 rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md cursor-pointer text-gray-900"
                    >
                      {materialTiers.map((tier) => (
                        <option key={tier} value={tier} className="bg-white text-gray-800">
                          {tier}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div
                key="step3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.2 }}
                className="space-y-6"
              >
                {/* Personality Type */}
                <div>
                  <label className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-3.5 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <FaBrain className="text-gem-400 text-xs" />
                    Client Temperament / Personality
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                    {personalityTypes.map((type) => (
                      <motion.button
                        key={type.value}
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleChange('personalityType', type.value)}
                        className={`flex items-center gap-3 p-4 rounded-xl text-left transition-all duration-200 border ${
                          formData.personalityType === type.value
                            ? 'bg-gem-600 border-gem-500 text-white shadow-glow'
                            : 'bg-white/70 hover:bg-gem-50 border-gem-200 hover:border-gem-300'
                        }`}
                      >
                        <span className="text-2xl">{type.icon}</span>
                        <div>
                          <p className={`text-sm font-semibold ${
                            formData.personalityType === type.value
                              ? 'text-white'
                              : 'text-gray-800'
                          }`}>
                            {type.value}
                          </p>
                          <p className={`text-[10px] leading-relaxed ${
                            formData.personalityType === type.value
                              ? 'text-white/80'
                              : 'text-gray-500'
                          }`}>
                            {type.desc}
                          </p>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>

                {/* Goal */}
                <div>
                  <label className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wider mb-3.5 ${
                    darkMode ? 'text-gray-300' : 'text-gray-700'
                  }`}>
                    <FaBullseye className="text-gold-400 text-xs" />
                    Primary Intention / Goal <span className="text-red-400 font-bold">*</span>
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {goals.map((g) => (
                      <motion.button
                        key={g.value}
                        type="button"
                        whileTap={{ scale: 0.95 }}
                        onClick={() => handleChange('goal', g.value)}
                        className={`relative overflow-hidden p-4 rounded-xl text-center transition-all duration-200 border ${
                          formData.goal === g.value
                            ? 'bg-gem-600 border-gem-500 text-white shadow-glow'
                            : 'bg-white/70 hover:bg-gem-50 border-gem-200 hover:border-gem-300'
                        }`}
                      >
                        <div className="text-2xl mb-1">{g.icon}</div>
                        <p className={`text-xs font-bold uppercase tracking-wider ${
                          formData.goal === g.value
                            ? 'text-white'
                            : 'text-gray-800'
                        }`}>
                          {g.value}
                        </p>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="flex items-center justify-between pt-6 border-t border-gray-100">
            {step > 1 ? (
              <motion.button
                type="button"
                onClick={prevStep}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-6 py-3 border border-gray-300 text-gray-700 font-bold text-xs uppercase tracking-wider rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md hover:bg-gray-50 transition-all duration-200"
              >
                <FaArrowLeft />
                Back
              </motion.button>
            ) : (
              <div />
            )}

            {step < 3 ? (
              <motion.button
                type="button"
                onClick={nextStep}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex items-center gap-2 px-6 py-3 bg-gem-600 hover:bg-gem-700 text-white font-bold text-xs uppercase tracking-wider rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md shadow-md hover:shadow-lg transition-all duration-200"
              >
                Next Step
                <FaArrowRight />
              </motion.button>
            ) : (
              <motion.button
                type="submit"
                disabled={loading}
                whileHover={{ scale: loading ? 1 : 1.02 }}
                whileTap={{ scale: loading ? 1 : 0.98 }}
                className={`flex items-center gap-2 px-8 py-3 bg-gem-600 hover:bg-gem-700 text-white font-bold text-xs uppercase tracking-wider rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md shadow-md hover:shadow-lg transition-all duration-200 ${
                  loading ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4.5 w-4.5 border-t-2 border-b-2 border-white"></div>
                    Formulating...
                  </>
                ) : (
                  <>
                    <FaGem className="animate-pulse" />
                    Get Recommendation
                    <FaArrowRight />
                  </>
                )}
              </motion.button>
            )}
          </div>
        </motion.form>
      </div>
    </div>
  );
};

export default RecommendForm;
