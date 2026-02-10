const User = require('../models/User');
const Note = require('../models/Note');
const Event = require('../models/Event');

// @desc    Get user stats for dashboard
// @route   GET /api/dashboard/stats
// @access  Private
exports.getDashboardStats = async (req, res) => {
  try {
    // Parallel queries: Sabhi collections se ek saath data uthayenge (fast performance)
    const [user, notesCount, eventsCount] = await Promise.all([
      User.findById(req.user.id),
      Note.countDocuments(),
      Event.countDocuments()
    ]);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    // Latest 3 events nikalna niche "Recent Activity" ke liye
    const recentEvents = await Event.find().sort({ createdAt: -1 }).limit(3);

    // Ye structure seedha aapke Dashboard.jsx ke 'stats' state se match karega
    res.status(200).json({
      success: true,
      notesAccessed: notesCount || 0,
      eventsTracked: eventsCount || 0,
      internshipsAvailable: 0, // Abhi ke liye 0, jab Internship model banega tab update karenge
      recentEvents: recentEvents || []
    });

  } catch (error) {
    console.error("Dashboard Stats Error:", error.message);
    res.status(500).json({ success: false, error: "Internal Server Error" });
  }
};