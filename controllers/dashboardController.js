const User = require('../models/User');

// @desc    Get user stats for dashboard
// @route   GET /api/dashboard
// @access  Private
exports.getDashboardStats = async (req, res) => {
  try {
    // req.user humein protect middleware se milega
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ success: false, error: "User not found" });
    }

    res.status(200).json({
      success: true,
      data: {
        name: user.name,
        email: user.email,
        stats: user.stats
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};