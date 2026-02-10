const Note = require('../models/Note');

// @desc    Get all notes (with search and filters)
// @route   GET /api/notes
exports.getNotes = async (req, res) => {
  try {
    let query;

    // Filter by Semester or Subject if provided in URL
    const { semester, subject } = req.query;
    
    let queryObj = {};
    if (semester) queryObj.semester = semester;
    if (subject) queryObj.subject = { $regex: subject, $options: 'i' }; // Case-insensitive search

    query = Note.find(queryObj);

    const notes = await query;

    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};