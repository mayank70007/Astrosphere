const express = require('express');
const User = require('../models/User');
const Gemstone = require('../models/Gemstone');
const { protect } = require('../middleware/auth');

const router = express.Router();

// @route   GET /api/favorites
// @desc    Get user's favorite gemstones
// @access  Private
router.get('/', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('favorites');
    res.json(user.favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   POST /api/favorites
// @desc    Add a gemstone to favorites
// @access  Private
router.post('/', protect, async (req, res) => {
  try {
    const { gemstoneId } = req.body;

    // Check if gemstone exists
    const gemstone = await Gemstone.findById(gemstoneId);
    if (!gemstone) {
      return res.status(404).json({ message: 'Gemstone not found' });
    }

    const user = await User.findById(req.user._id);

    // Check if already in favorites
    if (user.favorites.includes(gemstoneId)) {
      return res.status(400).json({ message: 'Gemstone already in favorites' });
    }

    user.favorites.push(gemstoneId);
    await user.save();

    // Return the populated favorites
    const updatedUser = await User.findById(req.user._id).populate('favorites');
    res.json(updatedUser.favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

// @route   DELETE /api/favorites/:id
// @desc    Remove a gemstone from favorites
// @access  Private
router.delete('/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    user.favorites = user.favorites.filter(
      (fav) => fav.toString() !== req.params.id
    );
    await user.save();

    const updatedUser = await User.findById(req.user._id).populate('favorites');
    res.json(updatedUser.favorites);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
