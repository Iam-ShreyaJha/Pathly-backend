const Event = require('../models/Event');

// @desc    Get all events or news
// @route   GET /api/events
exports.getEvents = async (req, res) => {
  try {
    const { category } = req.query;
    let queryObj = {};

    if (category) {
      queryObj.category = category;
    }

    const events = await Event.find(queryObj).sort('-date');

    res.status(200).json({
      success: true,
      count: events.length,
      data: events
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};