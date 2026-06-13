const mongoose = require('mongoose');

const gemstoneSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    zodiac: {
      type: String,
      trim: true,
      default: '',
    },
    color: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    benefits: {
      type: [String],
      required: true,
    },
    planet: {
      type: String,
      required: true,
    },
    wearMethod: {
      type: String,
      required: true,
    },
    bestDay: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      default: '',
    },
    priceRange: {
      type: String,
      default: '',
    },
    goalAssociation: {
      type: String,
      default: '',
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Gemstone', gemstoneSchema);
