const express = require('express');
const router = express.Router();
const Note = require('../models/Note'); // Model case check kar lein (Note vs note)
const Event = require('../models/Event'); // Ise import karna zaroori hai
const { protect } = require('../middleware/authMiddleware');

router.get('/stats', protect, async (req, res) => {
  try {
    // 1. Database mein total kitne notes hain
    const notesCount = await Note.countDocuments();

    // 2. Database mein total kitne events hain
    const eventsCount = await Event.countDocuments();

    // 3. Response bhejein jo dashboard ke state se match kare
    res.json({
      notesAccessed: notesCount,
      eventsTracked: eventsCount, // Ab ye 0 nahi, asli count hoga!
      resourcesVisited: 0 // Baad mein Roadmap model ke liye ise update karenge
    });
  } catch (err) {
    res.status(500).json({ success: false, error: err.message });
  }
});

module.exports = router;