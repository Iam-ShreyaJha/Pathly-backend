const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  description: {
    type: String,
    required: false
  },
  subject: {
    type: String,
    required: [true, 'Please add a subject']
  },
  // Naya Structure: Semester ko Number rakha hai filtering ke liye
  semester: {
    type: Number, 
    required: [true, 'Please add a semester']
  },
  // NAYE FIELDS ADDED BELOW
  year: {
    type: String,
    required: [true, 'Please specify the year'],
    enum: ['1st Year', '2nd Year', '3rd Year', '4th Year']
  },
  isSyllabus: {
    type: Boolean,
    default: false
  },
  // Link stays the same for Cloudinary URL
  link: {
    type: String,
    required: [true, 'File upload failed, no link generated']
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Note', NoteSchema);