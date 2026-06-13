import { motion } from 'framer-motion';
import { FaHeart, FaRegHeart, FaStar, FaCompass, FaGem } from 'react-icons/fa';
import { useTheme } from '../context/ThemeContext';

// Color map for gemstone color indicators
const colorMap = {
  Red: 'bg-red-500',
  Green: 'bg-emerald-500',
  Blue: 'bg-blue-500',
  Purple: 'bg-purple-500',
  White: 'bg-gray-100 border border-gray-300',
  Yellow: 'bg-yellow-400',
  Golden: 'bg-yellow-500',
  'Yellow-Green': 'bg-lime-400',
  'Blue-Green': 'bg-teal-400',
  'Dark Red': 'bg-red-800',
  Pink: 'bg-pink-400',
  'Brown-Gold': 'bg-amber-600',
  'Purple-Green': 'bg-violet-400',
  Multicolor: 'bg-gradient-to-r from-red-400 via-green-400 to-blue-400',
  Iridescent: 'bg-gradient-to-r from-pink-400 via-purple-400 to-blue-400',
  'Light Blue': 'bg-sky-300',
};

const GemstoneCard = ({
  gemstone,
  index = 0,
  isFavorite = false,
  onToggleFavorite,
  showFavorite = false,
  onClick,
}) => {
  const { darkMode } = useTheme();

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.08,
        ease: 'easeOut',
      },
    },
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover={{ y: -6, transition: { duration: 0.25 } }}
      className={`relative group cursor-pointer overflow-hidden transition-all duration-300 border bg-white/75 rounded-tr-[36px] rounded-bl-[36px] rounded-tl-md rounded-br-md hover:shadow-xl border-gem-200/40 hover:border-gem-400/40`}
      onClick={onClick}
    >
      {/* Image / Cosmic Orb */}
      <div className="relative h-44 overflow-hidden border-b border-gem-200/20 bg-gradient-to-br from-amber-50 to-orange-100/30">
        {gemstone.image ? (
          <img
            src={gemstone.image}
            alt={gemstone.name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        ) : null}

        {/* Glow backdrop behind icon / Fallback */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="absolute w-24 h-24 rounded-full bg-gradient-to-br from-gem-500/10 to-gold-500/5 blur-xl group-hover:scale-125 transition-transform duration-500" />
          
          {!gemstone.image && (
            <div className="w-16 h-16 rounded-full border border-dashed border-gem-500/40 flex items-center justify-center relative animate-spin-slow">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-gem-500 to-gold-500 flex items-center justify-center shadow-md">
                <FaCompass className="text-white text-lg" />
              </div>
            </div>
          )}
        </div>

        {/* Color indicator */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 z-20">
          <div
            className={`w-2.5 h-2.5 rounded-full ring-2 ring-white/20 ${
              colorMap[gemstone.color] || 'bg-gray-400'
            }`}
          />
          <span
            className={`text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full backdrop-blur-md bg-white/85 text-gem-700 border border-gem-200/35`}
          >
            {gemstone.color}
          </span>
        </div>

        {/* Favorite button */}
        {showFavorite && (
          <motion.button
            whileTap={{ scale: 0.8 }}
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.(gemstone._id);
            }}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all z-20 backdrop-blur-md bg-white/80 hover:bg-white border border-gem-200/30`}
          >
            {isFavorite ? (
              <FaHeart className="text-red-405 text-red-500" />
            ) : (
              <FaRegHeart
                className="text-gray-400"
              />
            )}
          </motion.button>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <h3
            className="text-sm font-display font-extrabold tracking-tight text-gray-900"
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
          </h3>
          {gemstone.zodiac && (
            <span
              className="text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-gem-50 text-gem-600 border border-gem-200/60"
            >
              {gemstone.zodiac}
            </span>
          )}
        </div>

        <p
          className="text-xs mb-3 line-clamp-2 leading-relaxed text-gray-500"
        >
          {gemstone.description}
        </p>

        {/* Benefits preview */}
        <div className="flex flex-wrap gap-1.5 my-3">
          {gemstone.benefits?.slice(0, 2).map((benefit, i) => (
            <span
              key={i}
              className="text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md border bg-gem-50/50 text-gem-700 border-gem-100/50"
            >
              {benefit.length > 25 ? benefit.slice(0, 25) + '...' : benefit}
            </span>
          ))}
          {gemstone.benefits?.length > 2 && (
            <span
              className="text-[10px] px-2 py-0.5 rounded-lg font-semibold text-gem-600 bg-gem-100/30"
            >
              +{gemstone.benefits.length - 2}
            </span>
          )}
        </div>

        {/* Planet and Price */}
        <div
          className="flex flex-col gap-3 mt-4 pt-3 border-t border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5">
              <FaStar
                className="text-xs text-amber-500 animate-spin-slow"
              />
              <span
                className="text-xs font-semibold text-gray-500 uppercase tracking-wider"
              >
                Planet: {gemstone.planet}
              </span>
            </div>
            {gemstone.priceRange && (
              <span
                className="text-xs font-extrabold text-amber-700 bg-amber-50/70 border border-amber-200/30 px-2.5 py-0.5 rounded-full"
              >
                {gemstone.priceRange}
              </span>
            )}
          </div>

          <button
            onClick={(e) => {
              e.stopPropagation();
              if (showFavorite) {
                onToggleFavorite(gemstone._id);
              } else {
                alert('Please sign in as a Consultant to select remedy specimens.');
              }
            }}
            className={`w-full py-2.5 px-4 text-xs font-bold uppercase tracking-wider transition-all duration-300 rounded-tr-xl rounded-bl-xl rounded-tl-md rounded-br-md shadow-sm flex items-center justify-center gap-2 border ${
              isFavorite
                ? 'bg-green-500/10 text-green-600 border-green-500/20 hover:bg-green-500/20'
                : 'bg-gem-600 hover:bg-gem-700 text-white border-transparent shadow-md hover:shadow-lg'
            }`}
          >
            <FaGem className="text-xs" />
            <span>{isFavorite ? 'Specimen Selected' : 'Select Specimen'}</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default GemstoneCard;
