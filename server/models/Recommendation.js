const mongoose = require('mongoose');

const recommendationSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    zodiac: {
      type: String,
      required: true,
    },
    goal: {
      type: String,
      required: true,
    },
    personalityType: {
      type: String,
      default: '',
    },
    gemstones: {
      type: [String],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Recommendation', recommendationSchema);
