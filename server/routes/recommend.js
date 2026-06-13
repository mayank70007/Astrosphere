const express = require('express');
const Gemstone = require('../models/Gemstone');
const Recommendation = require('../models/Recommendation');
const User = require('../models/User');
const { protect, optionalAuth } = require('../middleware/auth');

const router = express.Router();

// Zodiac to gemstone mapping
const zodiacGemstoneMap = {
  aries: 'Ruby',
  taurus: 'Emerald',
  gemini: 'Agate',
  cancer: 'Pearl',
  leo: 'Peridot',
  virgo: 'Sapphire',
  libra: 'Opal',
  scorpio: 'Topaz',
  sagittarius: 'Turquoise',
  capricorn: 'Garnet',
  aquarius: 'Amethyst',
  pisces: 'Aquamarine',
};

// Goal to gemstone mapping
const goalGemstoneMap = {
  wealth: 'Citrine',
  'career growth': 'Emerald',
  career: 'Emerald',
  love: 'Rose Quartz',
  health: 'Jade',
  confidence: 'Tiger Eye',
  education: 'Fluorite',
};

// @route   POST /api/recommend
// @desc    Get gemstone recommendation based on user input
// @access  Public (but saves history if authenticated)
router.post('/', optionalAuth, async (req, res) => {
  try {
    const { zodiac, goal, personalityType, name, dateOfBirth, birthMonth } = req.body;

    if (!zodiac || !goal) {
      return res.status(400).json({ message: 'Zodiac and goal are required' });
    }

    // Get zodiac-based gemstone
    const zodiacGemName = zodiacGemstoneMap[zodiac.toLowerCase()];
    // Get goal-based gemstone
    const goalGemName = goalGemstoneMap[goal.toLowerCase()];

    const gemstoneNames = [];
    if (zodiacGemName) gemstoneNames.push(zodiacGemName);
    if (goalGemName && goalGemName !== zodiacGemName) gemstoneNames.push(goalGemName);

    // Fetch full gemstone details from DB
    const gemstones = await Gemstone.find({
      name: { $in: gemstoneNames },
    });

    // If authenticated, save recommendation to history
    if (req.user) {
      const recommendation = await Recommendation.create({
        userId: req.user._id,
        zodiac,
        goal,
        personalityType: personalityType || '',
        gemstones: gemstoneNames,
      });

      // Add to user's recommendation history
      await User.findByIdAndUpdate(req.user._id, {
        $push: { recommendationHistory: recommendation._id },
      });
    }

    res.json({
      zodiac,
      goal,
      personalityType,
      recommendations: gemstones,
      zodiacGemstone: zodiacGemName,
      goalGemstone: goalGemName,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// @route   GET /api/recommend/history
// @desc    Get user's recommendation history
// @access  Private
router.get('/history', protect, async (req, res) => {
  try {
    const recommendations = await Recommendation.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.json(recommendations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
