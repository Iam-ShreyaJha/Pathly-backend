const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add an event title'],
    trim: true
  },
  description: {
    type: String,
    required: false,
  },
  category: {
    type: String,
    required: [true, 'Please select a category'],
    // Ye categories exactly wahi hain jo tumne Admin Dashboard dropdown mein rakhi hain
    enum: ["Hackathon", "Tech Event", "Workshop", "Webinar", "Exhibition", "Conference", "Cultural Fest"]
  },
  date: {
    type: Date,
    required: [true, 'Please add event date'],
  },
  link: {
    type: String, 
    required: [true, 'Please add a registration or source link'],
  },
  // Admin jisne ye post kiya hai
  user: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'User',
    required: true 
  },
  createdAt: {
    type: Date,
    default: Date.now,
  }
});

module.exports = mongoose.model('Event', EventSchema);