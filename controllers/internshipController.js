const Internship = require('../models/Internships');

// @desc    Get all internships
// @route   GET /api/internships
// @access  Public
exports.getInternships = async (req, res) => {
  try {
    // Latest internships ko sabse upar dikhane ke liye -1 use kiya hai
    const internships = await Internship.find().sort({ postedAt: -1 });
    
    res.status(200).json({
      success: true,
      count: internships.length,
      data: internships
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error: Internships fetch nahi ho paayi'
    });
  }
};

// @desc    Create new internship
// @route   POST /api/internships
// @access  Private (Admin only)
exports.createInternship = async (req, res) => {
  try {
    // Tech stack ko array mein convert karne ka logic (agar frontend se comma-separated string aaye)
    if (req.body.techStack && typeof req.body.techStack === 'string') {
        req.body.techStack = req.body.techStack.split(',').map(item => item.trim());
    }

    const internship = await Internship.create(req.body);

    res.status(201).json({
      success: true,
      message: 'Internship posted successfully! 🚀',
      data: internship
    });
  } catch (err) {
    // Validation errors handle karne ke liye
    if (err.name === 'ValidationError') {
      const messages = Object.values(err.errors).map(val => val.message);
      return res.status(400).json({
        success: false,
        error: messages
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error: Internship save nahi ho paayi'
    });
  }
};

// @desc    Delete internship (Optional but useful for Admin)
// @route   DELETE /api/internships/:id
// @access  Private (Admin only)
exports.deleteInternship = async (req, res) => {
  try {
    const internship = await Internship.findById(req.params.id);

    if (!internship) {
      return res.status(404).json({
        success: false,
        error: 'Internship not found'
      });
    }

    await internship.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Internship removed successfully'
    });
  } catch (err) {
    res.status(500).json({
      success: false,
      error: 'Server Error'
    });
  }
};