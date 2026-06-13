import { motion } from 'framer-motion';
import { FaStar, FaCalendarAlt, FaHandSparkles, FaCompass, FaMoneyBillWave } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

const RecommendationCard = ({ gemstone, type = 'zodiac', index = 0 }) => {
  const { darkMode } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay: index * 0.2 }}
      className="relative overflow-hidden p-6 md:p-8 border rounded-tl-[40px] rounded-br-[40px] rounded-tr-md rounded-bl-md border-gem-200/35 shadow-xl bg-white/80"
    >
      {/* Gradient border effect */}
      <div className="absolute inset-0 rounded-tl-[40px] rounded-br-[40px] bg-gradient-to-br from-gem-500/10 via-transparent to-gold-500/15 pointer-events-none" />

      {/* Badge */}
      <div className="flex items-center justify-between mb-6">
        <span
          className={`px-3 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-widest ${
            type === 'zodiac'
              ? 'bg-gem-100 text-gem-700 border border-gem-200'
              : 'bg-gold-100 text-gold-700 border border-gold-200'
          }`}
        >
          {type === 'zodiac' ? '♈ Celestial Zodiac Remedy' : '🎯 Life Alignment Remedy'}
        </span>
      </div>

      {/* Gemstone Name */}
      <div className="flex items-center gap-4 mb-6">
        {gemstone.image ? (
          <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-gem-500/50 flex-shrink-0 shadow-md bg-white">
            <img src={gemstone.image} alt={gemstone.name} className="w-full h-full object-contain p-1.5" />
          </div>
        ) : (
          <div className="w-16 h-16 rounded-full border border-dashed border-gem-500/40 flex items-center justify-center relative animate-spin-slow flex-shrink-0">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gem-500 to-gold-500 flex items-center justify-center shadow-md">
              <FaCompass className="text-white text-lg" />
            </div>
          </div>
        )}
        <div>
          <h2
            className="text-2xl md:text-3xl font-display font-extrabold text-gray-900"
          >
            {(() => {
              const marketNames = {
                'Ruby': 'Ruby (Manikya)',
                'Emerald': 'Emerald (Panna)',
                'Agate': 'Sulemani Aqeeq (Agate)',
                'Pearl': 'Pearl (Moti)',
                'Peridot': 'Peridot (Zabarjad)',
                'Sapphire': 'Blue Sapphire (Neelam)',
                'Opal': 'Opal (Dhudhiya)',
                'Topaz': 'Yellow Topaz (Pukhraj)',
                'Turquoise': 'Turquoise (Firoza)',
                'Garnet': 'Garnet (Raktamani)',
                'Amethyst': 'Amethyst (Jamuniya)',
                'Aquamarine': 'Aquamarine (Beruj)',
                'Citrine': 'Citrine (Sunela)',
                'Rose Quartz': 'Rose Quartz (Sphatik)',
                'Jade': 'Jade (Margaj)',
                'Tiger Eye': 'Tiger Eye (Cheeta Pathar)',
                'Fluorite': 'Fluorite (Genius Stone)'
              };
              return marketNames[gemstone.name] || gemstone.name;
            })()}
          </h2>
          <p
            className="text-xs font-semibold uppercase tracking-wider text-gem-600"
          >
            {gemstone.color} • {gemstone.zodiac || gemstone.goalAssociation}
          </p>
        </div>
      </div>

      {/* Description */}
      <p
        className="text-sm leading-relaxed mb-6 text-gray-600"
      >
        {gemstone.description}
      </p>

      {/* Benefits */}
      <div className="mb-6">
        <h3
          className="text-xs font-bold uppercase tracking-widest mb-3 text-gem-600"
        >
          Remedy Core Benefits
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {gemstone.benefits?.map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.1 }}
              className="flex items-start gap-2.5 text-sm text-gray-600"
            >
              <FaStar
                className="mt-1 flex-shrink-0 text-xs text-gold-500"
              />
              <span className="leading-normal">{benefit}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Details Grid */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-xl border bg-gem-50/50 border-gem-200/20"
      >
        <div className="text-center">
          <FaStar
            className="mx-auto mb-1 text-sm text-gem-500"
          />
          <p
            className="text-[10px] font-bold uppercase tracking-wider text-gray-500"
          >
            Ruling Planet
          </p>
          <p
            className="text-sm font-semibold mt-0.5 text-gray-900"
          >
            {gemstone.planet}
          </p>
        </div>
        <div className="text-center">
          <FaCalendarAlt
            className="mx-auto mb-1 text-sm text-gem-500"
          />
          <p
            className="text-[10px] font-bold uppercase tracking-wider text-gray-500"
          >
            Ritual Day
          </p>
          <p
            className="text-sm font-semibold mt-0.5 text-gray-900"
          >
            {gemstone.bestDay}
          </p>
        </div>
        <div className="text-center">
          <FaCompass
            className="mx-auto mb-1 text-sm text-gem-500"
          />
          <p
            className="text-[10px] font-bold uppercase tracking-wider text-gray-500"
          >
            Activation Protocol
          </p>
          <p
            className="text-xs font-semibold mt-0.5 truncate px-1 text-gray-900"
            title={gemstone.wearMethod}
          >
            {gemstone.wearMethod?.split(' ').slice(0, 3).join(' ')}...
          </p>
        </div>
        <div className="text-center">
          <FaMoneyBillWave
            className="mx-auto mb-1 text-sm text-gold-500"
          />
          <p
            className="text-[10px] font-bold uppercase tracking-wider text-gray-500"
          >
            Valuation Est.
          </p>
          <p
            className="text-sm font-semibold mt-0.5 text-gray-900"
          >
            {gemstone.priceRange}
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default RecommendationCard;
