const mongoose = require('mongoose');

const NoteSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  description: {
    type: String,
    required: [false]
  },
  subject: {
    type: String,
    required: [true, 'Please add a subject']
  },
  semester: {
    type: String,
    required: [true, 'Please add a semester']
  },
  // Is field ka naam 'link' rakhein taaki routes se match ho
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