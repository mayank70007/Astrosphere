const express = require('express');
const Gemstone = require('../models/Gemstone');

const router = express.Router();

// @route   GET /api/gemstones
// @desc    Get all gemstones with optional search/filter
// @access  Public
router.get('/', async (req, res) => {
  try {
    const { search, zodiac, color } = req.query;
    let query = {};

    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }

    if (zodiac) {
      query.zodiac = { $regex: zodiac, $options: 'i' };
    }

    if (color) {
      query.color = { $regex: color, $options: 'i' };
    }

    const gemstones = await Gemstone.find(query).sort({ name: 1 });
    res.json(gemstones);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   GET /api/gemstones/:id
// @desc    Get single gemstone by ID
// @access  Public
router.get('/:id', async (req, res) => {
  try {
    const gemstone = await Gemstone.findById(req.params.id);

    if (!gemstone) {
      return res.status(404).json({ message: 'Gemstone not found' });
    }

    res.json(gemstone);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
