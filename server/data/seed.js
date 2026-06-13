const mongoose = require('mongoose');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const Gemstone = require('../models/Gemstone');

const gemstones = [
  // Zodiac-based gemstones
  {
    name: 'Ruby',
    zodiac: 'Aries',
    color: 'Red',
    description:
      'Ruby is the king of gemstones, symbolizing passion, power, and vitality. Known as the stone of nobility, it has been treasured throughout history for its deep crimson hue and extraordinary brilliance. Ruby stimulates the heart chakra and promotes courage, strength, and leadership.',
    benefits: [
      'Boosts confidence and courage',
      'Enhances vitality and energy',
      'Promotes passion and motivation',
      'Protects against negative energy',
      'Strengthens the heart and circulatory system',
    ],
    planet: 'Sun',
    wearMethod: 'Wear as a ring on the ring finger in gold setting',
    bestDay: 'Sunday',
    image: 'https://images.unsplash.com/photo-1599707367812-042af3ef8855?w=400',
    priceRange: '₹5,000 - ₹50,000 per carat',
    goalAssociation: '',
  },
  {
    name: 'Emerald',
    zodiac: 'Taurus',
    color: 'Green',
    description:
      'Emerald, the stone of successful love and wisdom, radiates a brilliant green energy that nurtures the heart. Revered by ancient civilizations, it represents rebirth and eternal youth. Emerald enhances intellectual capacity and promotes career success.',
    benefits: [
      'Enhances intelligence and memory',
      'Promotes career growth and success',
      'Brings harmony in relationships',
      'Improves communication skills',
      'Strengthens the immune system',
    ],
    planet: 'Mercury',
    wearMethod: 'Wear as a ring on the little finger in gold or silver setting',
    bestDay: 'Wednesday',
    image: 'https://images.unsplash.com/photo-1583937443566-6b5e8a0acdca?w=400',
    priceRange: '₹3,000 - ₹80,000 per carat',
    goalAssociation: 'Career Growth',
  },
  {
    name: 'Agate',
    zodiac: 'Gemini',
    color: 'Multicolor',
    description:
      'Agate is a grounding stone known for its stabilizing and strengthening influence. With beautiful banded patterns, it brings emotional, physical, and intellectual balance. It harmonizes yin and yang energies and soothes an overactive mind.',
    benefits: [
      'Promotes emotional stability',
      'Enhances mental clarity',
      'Provides grounding and balance',
      'Boosts self-confidence',
      'Improves concentration and analytical thinking',
    ],
    planet: 'Mercury',
    wearMethod: 'Wear as a pendant or bracelet',
    bestDay: 'Wednesday',
    image: 'https://m.media-amazon.com/images/I/51rqo36vONL._AC_UY1100_.jpg',
    priceRange: '₹200 - ₹5,000 per piece',
    goalAssociation: '',
  },
  {
    name: 'Pearl',
    zodiac: 'Cancer',
    color: 'White',
    description:
      'Pearl, born from the depths of the ocean, symbolizes purity, wisdom, and serenity. It is the only gemstone created by a living organism. Pearl calms the mind, controls anger, and brings peace and tranquility to its wearer.',
    benefits: [
      'Calms the mind and emotions',
      'Enhances personal integrity',
      'Promotes purity and honesty',
      'Improves mental health',
      'Strengthens relationships and love',
    ],
    planet: 'Moon',
    wearMethod: 'Wear as a ring on the little finger in silver setting',
    bestDay: 'Monday',
    image: 'https://images.unsplash.com/photo-1615655114865-4cc83f8fa524?w=400',
    priceRange: '₹1,000 - ₹25,000 per carat',
    goalAssociation: '',
  },
  {
    name: 'Peridot',
    zodiac: 'Leo',
    color: 'Yellow-Green',
    description:
      'Peridot, the gem of the sun, glows with a warm yellow-green light that brings joy and positivity. Ancient Egyptians called it the "gem of the sun" and believed it protected against nightmares. It opens the heart to new possibilities and abundance.',
    benefits: [
      'Attracts abundance and prosperity',
      'Reduces stress and anger',
      'Enhances creativity and inspiration',
      'Promotes good health and restful sleep',
      'Strengthens leadership qualities',
    ],
    planet: 'Sun',
    wearMethod: 'Wear as a ring or pendant in gold setting',
    bestDay: 'Sunday',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400',
    priceRange: '₹2,000 - ₹15,000 per carat',
    goalAssociation: '',
  },
  {
    name: 'Sapphire',
    zodiac: 'Virgo',
    color: 'Blue',
    description:
      'Blue Sapphire is one of the most powerful and fast-acting gemstones. Known as the stone of wisdom and royalty, it brings mental clarity, discipline, and spiritual insight. It has been worn by kings and queens throughout history for protection and good fortune.',
    benefits: [
      'Brings mental clarity and focus',
      'Attracts wealth and prosperity',
      'Provides protection from evil eye',
      'Enhances discipline and determination',
      'Promotes spiritual enlightenment',
    ],
    planet: 'Saturn',
    wearMethod: 'Wear as a ring on the middle finger in silver or platinum setting',
    bestDay: 'Saturday',
    image: 'https://images.unsplash.com/photo-1599707367812-042af3ef8855?w=400',
    priceRange: '₹5,000 - ₹1,00,000 per carat',
    goalAssociation: '',
  },
  {
    name: 'Opal',
    zodiac: 'Libra',
    color: 'Iridescent',
    description:
      'Opal is a mesmerizing stone that displays a spectacular play of colors. Known as the "Queen of Gems," it amplifies emotions and creativity. Opal enhances imagination, artistic expression, and brings harmony to relationships.',
    benefits: [
      'Enhances creativity and imagination',
      'Strengthens emotional bonds',
      'Promotes spontaneity and self-expression',
      'Brings harmony and balance',
      'Boosts self-esteem and confidence',
    ],
    planet: 'Venus',
    wearMethod: 'Wear as a ring on the ring finger in silver setting',
    bestDay: 'Friday',
    image: 'https://images.unsplash.com/photo-1583937443566-6b5e8a0acdca?w=400',
    priceRange: '₹1,500 - ₹30,000 per carat',
    goalAssociation: '',
  },
  {
    name: 'Topaz',
    zodiac: 'Scorpio',
    color: 'Golden',
    description:
      'Topaz is a stone of love and good fortune. Its warm golden hue radiates confidence and inner strength. Associated with the sun, it dispels enchantments, strengthens faith, and brings success in all endeavors.',
    benefits: [
      'Attracts success and good fortune',
      'Enhances confidence and charisma',
      'Promotes truth and forgiveness',
      'Strengthens physical health',
      'Protects against negative energies',
    ],
    planet: 'Jupiter',
    wearMethod: 'Wear as a ring on the index finger in gold setting',
    bestDay: 'Thursday',
    image: 'https://rashiratanjaipur.net/pub/media/catalog/product/cache/5dbed5ae978c5240a4bf1f0c3ce615e1/y/a/ya_40-2_7.01_cts.jpg',
    priceRange: '₹500 - ₹20,000 per carat',
    goalAssociation: '',
  },
  {
    name: 'Turquoise',
    zodiac: 'Sagittarius',
    color: 'Blue-Green',
    description:
      'Turquoise is one of the oldest protection stones, valued by cultures worldwide for millennia. Its soothing blue-green color promotes tranquility, healing, and spiritual grounding. It is a stone of wholeness and truth.',
    benefits: [
      'Provides powerful protection',
      'Promotes healing and wellness',
      'Enhances communication and truth',
      'Brings good fortune during travel',
      'Strengthens spiritual connection',
    ],
    planet: 'Jupiter',
    wearMethod: 'Wear as a pendant or bracelet in silver setting',
    bestDay: 'Thursday',
    image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt-0wkrUlwGdxd9ads920tzLMSxSqgUN75qp1KtGYWyQ&s=10',
    priceRange: '₹500 - ₹10,000 per piece',
    goalAssociation: '',
  },
  {
    name: 'Garnet',
    zodiac: 'Capricorn',
    color: 'Dark Red',
    description:
      'Garnet is a stone of passion and energy, known for its deep red brilliance. It revitalizes, purifies, and balances energy. Garnet inspires love and devotion, and has been a symbol of truth and faith since ancient times.',
    benefits: [
      'Boosts energy and vitality',
      'Enhances devotion and commitment',
      'Promotes self-confidence',
      'Supports blood circulation',
      'Inspires creativity and passion',
    ],
    planet: 'Mars',
    wearMethod: 'Wear as a ring on the ring finger in gold setting',
    bestDay: 'Tuesday',
    image: 'https://images.unsplash.com/photo-1599707367812-042af3ef8855?w=400',
    priceRange: '₹1,000 - ₹15,000 per carat',
    goalAssociation: '',
  },
  {
    name: 'Amethyst',
    zodiac: 'Aquarius',
    color: 'Purple',
    description:
      'Amethyst is the stone of spiritual wisdom and tranquility. Its beautiful purple hue has been prized by royalty for centuries. It calms the mind, enhances intuition, and promotes spiritual growth and inner peace.',
    benefits: [
      'Calms the mind and reduces anxiety',
      'Enhances intuition and spiritual awareness',
      'Promotes restful sleep',
      'Aids in meditation and mindfulness',
      'Protects against psychic attacks',
    ],
    planet: 'Saturn',
    wearMethod: 'Wear as a ring or pendant in silver setting',
    bestDay: 'Saturday',
    image: 'https://images.unsplash.com/photo-1615655114865-4cc83f8fa524?w=400',
    priceRange: '₹500 - ₹12,000 per carat',
    goalAssociation: '',
  },
  {
    name: 'Aquamarine',
    zodiac: 'Pisces',
    color: 'Light Blue',
    description:
      'Aquamarine, the treasure of mermaids, embodies the calming energy of the sea. Its serene blue color promotes courage, reduces stress, and sharpens intellect. It is a stone of eternal youth and happiness.',
    benefits: [
      'Reduces stress and calms emotions',
      'Enhances clarity of thought',
      'Promotes courage and self-expression',
      'Supports throat chakra healing',
      'Brings harmony and peace',
    ],
    planet: 'Neptune',
    wearMethod: 'Wear as a pendant or ring in silver setting',
    bestDay: 'Monday',
    image: 'https://5.imimg.com/data5/SELLER/Default/2024/12/474447661/EO/XY/VE/145910201/aquamarine-gem-stone.jpg',
    priceRange: '₹2,000 - ₹25,000 per carat',
    goalAssociation: '',
  },
  // Goal-based gemstones
  {
    name: 'Citrine',
    zodiac: '',
    color: 'Yellow',
    description:
      'Citrine is the premier stone of manifestation, imagination, and personal will. Known as the "Merchant\'s Stone," it carries the power of the sun and is excellent for overcoming depression, fears, and phobias. It attracts wealth, prosperity, and success.',
    benefits: [
      'Attracts wealth and abundance',
      'Promotes optimism and positivity',
      'Enhances creativity and self-expression',
      'Boosts physical stamina and energy',
      'Supports digestive system health',
    ],
    planet: 'Jupiter',
    wearMethod: 'Wear as a ring on the index finger in gold setting',
    bestDay: 'Thursday',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400',
    priceRange: '₹500 - ₹8,000 per carat',
    goalAssociation: 'Wealth',
  },
  {
    name: 'Rose Quartz',
    zodiac: '',
    color: 'Pink',
    description:
      'Rose Quartz is the stone of universal love. It restores trust and harmony in relationships, encouraging unconditional love. Its gentle pink essence carries a soft feminine energy of compassion, tenderness, and healing.',
    benefits: [
      'Attracts love and strengthens relationships',
      'Promotes self-love and emotional healing',
      'Reduces stress and brings inner peace',
      'Enhances empathy and forgiveness',
      'Supports heart health and circulation',
    ],
    planet: 'Venus',
    wearMethod: 'Wear as a pendant close to the heart or bracelet',
    bestDay: 'Friday',
    image: 'https://images.unsplash.com/photo-1615655114865-4cc83f8fa524?w=400',
    priceRange: '₹300 - ₹5,000 per piece',
    goalAssociation: 'Love',
  },
  {
    name: 'Jade',
    zodiac: '',
    color: 'Green',
    description:
      'Jade is a symbol of purity and serenity. Revered in East Asian cultures for thousands of years, it is known as the "Stone of Heaven." Jade promotes physical healing, longevity, and overall wellness.',
    benefits: [
      'Promotes physical healing and recovery',
      'Strengthens the immune system',
      'Brings good luck and prosperity',
      'Enhances longevity and vitality',
      'Calms the nervous system',
    ],
    planet: 'Venus',
    wearMethod: 'Wear as a bracelet or pendant',
    bestDay: 'Friday',
    image: 'https://images.unsplash.com/photo-1615655406736-b37c4fabf923?w=400',
    priceRange: '₹1,000 - ₹50,000 per piece',
    goalAssociation: 'Health',
  },
  {
    name: 'Tiger Eye',
    zodiac: '',
    color: 'Brown-Gold',
    description:
      'Tiger Eye is a stone of protection and power. Its shimmering golden-brown bands resemble the eye of a tiger, providing fierce courage and unwavering confidence. It sharpens the senses and helps one make clear, informed decisions.',
    benefits: [
      'Boosts self-confidence and willpower',
      'Provides protection and grounding',
      'Enhances focus and determination',
      'Promotes courage in challenging situations',
      'Balances emotional energy',
    ],
    planet: 'Sun',
    wearMethod: 'Wear as a bracelet or ring in gold setting',
    bestDay: 'Sunday',
    image: 'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?w=400',
    priceRange: '₹300 - ₹3,000 per piece',
    goalAssociation: 'Confidence',
  },
  {
    name: 'Fluorite',
    zodiac: '',
    color: 'Purple-Green',
    description:
      'Fluorite is known as the "Genius Stone" and is the most effective stone for learning and concentration. Its rainbow of colors stimulates the mind and enhances mental clarity. Perfect for students and scholars seeking academic excellence.',
    benefits: [
      'Enhances concentration and learning ability',
      'Promotes mental clarity and focus',
      'Improves memory retention',
      'Reduces mental fog and confusion',
      'Supports academic and intellectual pursuits',
    ],
    planet: 'Mercury',
    wearMethod: 'Wear as a pendant or keep on study desk',
    bestDay: 'Wednesday',
    image: 'https://images.unsplash.com/photo-1583937443566-6b5e8a0acdca?w=400',
    priceRange: '₹200 - ₹5,000 per piece',
    goalAssociation: 'Education',
  },
];

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    // Clear existing gemstones
    await Gemstone.deleteMany({});
    console.log('Cleared existing gemstones');

    const userImages = [
      'https://rashiratanjaipur.net/pub/media/catalog/product/cache/5dbed5ae978c5240a4bf1f0c3ce615e1/y/a/ya_40-2_7.01_cts.jpg',
      'https://m.media-amazon.com/images/I/51rqo36vONL._AC_UY1100_.jpg',
      'https://5.imimg.com/data5/SELLER/Default/2024/12/474447661/EO/XY/VE/145910201/aquamarine-gem-stone.jpg',
      'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSt-0wkrUlwGdxd9ads920tzLMSxSqgUN75qp1KtGYWyQ&s=10'
    ];
    const updatedGemstones = gemstones.map((gem, index) => ({
      ...gem,
      image: userImages[index % userImages.length]
    }));

    // Insert new gemstones
    const created = await Gemstone.insertMany(updatedGemstones);
    console.log(`Seeded ${created.length} gemstones successfully!`);

    process.exit(0);
  } catch (error) {
    console.error(`Error seeding database: ${error.message}`);
    process.exit(1);
  }
};

seedDB();
