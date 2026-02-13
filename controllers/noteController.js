const Note = require('../models/Note');

// @desc    Get all notes (with search and filters)
// @route   GET /api/notes
exports.getNotes = async (req, res) => {
  try {
    const { semester, subject } = req.query;
    let queryObj = {};
    
    if (semester) queryObj.semester = semester;
    if (subject) queryObj.subject = { $regex: subject, $options: 'i' }; 

    // Notes ko latest first (newest to oldest) sort karke laana
    const notes = await Note.find(queryObj).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notes.length,
      data: notes
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Create new note
// @route   POST /api/notes
exports.createNote = async (req, res) => {
  try {
    // Note: User ID hum protect middleware se nikaalte hain
    const note = await Note.create({
      ...req.body,
      user: req.user.id
    });

    res.status(201).json({
      success: true,
      data: note
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Delete a note
// @route   DELETE /api/notes/:id
exports.deleteNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        error: 'Note not found'
      });
    }

    // Note ko database se remove karna
    await note.deleteOne();

    res.status(200).json({
      success: true,
      message: 'Note removed successfully'
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};