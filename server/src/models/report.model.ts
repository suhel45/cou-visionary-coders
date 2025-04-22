// models/Report.js
const mongoose = require('mongoose');

const reportSchema = new mongoose.Schema({
  biodataNo: {
    type: Number,
    required: true
  },
  reason: {
    type: String,
    required: true,
    enum: ['fake_profile', 'inappropriate_content', 'harassment', 'scam', 'other']
  },
  reasonDetails: {
    type: String,
    required: true
  },
  reporter: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Report', reportSchema);