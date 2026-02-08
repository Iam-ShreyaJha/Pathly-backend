const mongoose = require('mongoose');

const InternshipSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  techStack: [String], // Array of strings
  description: { type: String, required: false },
  tips: { type: String },
  link: { type: String, required: true },
  postedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Internship', InternshipSchema);