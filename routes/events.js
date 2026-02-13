const express = require('express');
const router = express.Router();
const Event = require('../models/Event');
const { protect, admin } = require('../middleware/authMiddleware'); // admin middleware add kiya

// 1. Saare events dekhne ke liye (GET) - Sabke liye open
router.get('/', async (req, res) => {
  try {
    // Upcoming events ko pehle dikhane ke liye sort
    const events = await Event.find().sort({ date: 1 });
    res.status(200).json({ success: true, data: events });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// 2. Naya event daalne ke liye (POST) - Sirf Admin
router.post('/', protect, admin, async (req, res) => {
  try {
    const { title, description, date, category, link } = req.body;

    const newEvent = await Event.create({
      title,
      description,
      date,
      category,
      link,
      user: req.user.id 
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

// 3. Event delete karne ke liye (DELETE) - Sirf Admin
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);

    if (!event) {
      return res.status(404).json({ success: false, error: "Event not found" });
    }

    await event.deleteOne();

    res.status(200).json({ 
      success: true, 
      message: "Event removed successfully" 
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;