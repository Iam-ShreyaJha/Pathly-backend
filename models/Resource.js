const mongoose = require('mongoose');

const ResourceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true
  },
  description: {
    type: String,
    required: [false]
  },
  category: {
    type: String,
    required: [true, 'Please add a category (e.g., Web Dev, AI, Core)']
  },
  link: {
    type: String,
    required: [true, 'Please add a resource link']
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Resource', ResourceSchema);