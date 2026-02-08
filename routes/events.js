const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { protect } = require('../middleware/authMiddleware');

// 1. Saare events dekhne ke liye (GET) - Sabke liye open
router.get('/', async (req, res) => {
  try {
    // Upcoming events ko pehle dikhane ke liye date: 1 (Ascending) rakha hai
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. Naya event daalne ke liye (POST) - Sirf Admin/Logged-in user
router.post('/', protect, async (req, res) => {
  try {
    // req.body mein title, description, date aur category honi chahiye
    const { title, description, date, category, link } = req.body;

    const newEvent = await Event.create({
      title,
      description,
      date,
      category,
      link,
      user: req.user.id // Event create karne wale ki ID save karein
    });

    res.status(201).json({ 
      success: true, 
      message: "Event tracked successfully!", 
      data: newEvent 
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;