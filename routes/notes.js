const express = require('express');
const router = express.Router();
const { getNotes } = require('../controllers/noteController');
const { protect, admin } = require('../middleware/authMiddleware'); // admin middleware zaroori hai delete ke liye
const Note = require('../models/Note'); 
const upload = require('../config/cloudinary'); 

// 1. GET route: Saare notes fetch karne ke liye
router.get('/', getNotes);

// 2. POST route: Naya note with PDF upload (Protect + Role checks)
router.post('/', protect, upload.single('file'), async (req, res) => {
  try {
    const { title, description, subject, semester, year, isSyllabus } = req.body;

    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Please upload a file' });
    }

    const newNote = await Note.create({
      title,
      description,
      subject,
      semester,
      year, // Naya field: 1st Year, 2nd Year, etc.
      isSyllabus: isSyllabus === 'true' || isSyllabus === true, // Checkbox se string 'true' aa sakti hai
      link: req.file.path, 
      user: req.user.id 
    });

    res.status(201).json({ 
      success: true, 
      message: 'Note uploaded successfully!',
      data: newNote 
    });

  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// 3. DELETE route: Note remove karne ke liye (Sirf Admin kar sakta hai)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({ success: false, error: 'Note not found' });
    }

    // Delete the note from database
    await note.deleteOne();

    res.status(200).json({ 
      success: true, 
      message: 'Note removed successfully' 
    });

  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;