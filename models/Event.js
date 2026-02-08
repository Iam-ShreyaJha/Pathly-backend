const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add an event title'],
  },
  description: {
    type: String,
    required: [false],
  },
 category: {
    type: String,
    required: true,
    // Yahan 'Tech Event' ko exactly waise hi likhein jaisa dropdown mein hai
    enum: ["Hackathon", "Tech Event", "Workshop", "Webinar", "Exhibition", "Conference", "Cultural Fest"]
  },
  date: {
    type: Date,
    required: [true, 'Please add event date'],
  },
  link: {
    type: String, // Event register link or news source link
    required: [true, 'Please add a link'],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
});

module.exports = mongoose.model('Event', EventSchema);