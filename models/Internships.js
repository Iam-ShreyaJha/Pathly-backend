const mongoose = require('mongoose');

const InternshipSchema = new mongoose.Schema({
  role: { type: String, required: true },
  company: { type: String, required: true },
  techStack: { 
    type: String, // String rakhte hain taaki Admin form se comma-separated values bhej sake
    required: true 
  },
  description: { type: String, required: false },
  tips: { type: String },
  link: { type: String, required: true },
  // Link to Admin who posted it
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  postedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Internship', InternshipSchema);