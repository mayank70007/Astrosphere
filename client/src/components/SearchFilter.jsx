import { HiSearch, HiX } from 'react-icons/hi';
import { useTheme } from '../context/ThemeContext';

const zodiacSigns = [
  'All', 'Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo', 'Virgo',
  'Libra', 'Scorpio', 'Sagittarius', 'Capricorn', 'Aquarius', 'Pisces',
];

const colors = [
  'All', 'Red', 'Green', 'Blue', 'Purple', 'White', 'Yellow', 'Golden',
  'Pink', 'Brown-Gold', 'Multicolor',
];

const SearchFilter = ({
  searchTerm,
  onSearchChange,
  selectedZodiac,
  onZodiacChange,
  selectedColor,
  onColorChange,
}) => {
  const { darkMode } = useTheme();

  return (
    <div className="space-y-6">
      {/* Search */}
      <div className="relative">
        <HiSearch
          className="absolute left-4.5 top-1/2 -translate-y-1/2 text-xl text-gem-600 z-10"
        />
        <input
          type="text"
          placeholder="Search celestial remedies by name, zodiac, or planet..."
          value={searchTerm}
          onChange={(e) => onSearchChange(e.target.value)}
          className="w-full py-4 pl-12 pr-12 text-sm transition-all duration-300 bg-white/80 border border-gem-200/40 outline-none focus:border-gem-400 focus:ring-1 focus:ring-gem-400/20 rounded-tr-[24px] rounded-bl-[24px] rounded-tl-md rounded-br-md shadow-sm focus:shadow-md text-gray-900 placeholder-gray-450"
        />
        {searchTerm && (
          <button
            onClick={() => onSearchChange('')}
            className="absolute right-4.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 z-10"
          >
            <HiX />
          </button>
        )}
      </div>

      <div className="flex flex-col sm:flex-row gap-4">
        {/* Zodiac Filter */}
        <div className="flex-1">
          <label
            className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            Filter by Sun Sign
          </label>
          <select
            value={selectedZodiac}
            onChange={(e) => onZodiacChange(e.target.value)}
            className="w-full py-3.5 px-4 text-sm transition-all duration-300 bg-white/80 border border-gem-200/40 outline-none focus:border-gem-400 focus:ring-1 focus:ring-gem-400/20 rounded-tr-[16px] rounded-bl-[16px] rounded-tl-md rounded-br-md cursor-pointer shadow-sm text-gray-900"
          >
            {zodiacSigns.map((sign) => (
              <option key={sign} value={sign === 'All' ? '' : sign} className="bg-white text-gray-800">
                {sign}
              </option>
            ))}
          </select>
        </div>

        {/* Color Filter */}
        <div className="flex-1">
          <label
            className={`block text-[10px] font-bold uppercase tracking-wider mb-2 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`}
          >
            Filter by Remedy Color
          </label>
          <select
            value={selectedColor}
            onChange={(e) => onColorChange(e.target.value)}
            className="w-full py-3.5 px-4 text-sm transition-all duration-300 bg-white/80 border border-gem-200/40 outline-none focus:border-gem-400 focus:ring-1 focus:ring-gem-400/20 rounded-tr-[16px] rounded-bl-[16px] rounded-tl-md rounded-br-md cursor-pointer shadow-sm text-gray-900"
          >
            {colors.map((color) => (
              <option key={color} value={color === 'All' ? '' : color} className="bg-white text-gray-800">
                {color}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;
