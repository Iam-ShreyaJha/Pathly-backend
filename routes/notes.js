const express = require('express');
const router = express.Router();
const { getNotes } = require('../controllers/noteController');
const { protect } = require('../middleware/authMiddleware');
const Note = require('../models/Note'); // Ensure the case matches your filename
const upload = require('../config/cloudinary'); // Multer-Cloudinary config import karein

// 1. GET route: Saare notes fetch karne ke liye (Sabke liye open)
router.get('/', getNotes);

// 2. POST route: Naya note with PDF/Image upload (Sirf logged-in users ke liye)
// 'file' wahi naam hona chahiye jo aap frontend ke FormData mein append karengi
router.post('/', protect, upload.single('file'), async (req, res) => {
  try {
    const { title, description, subject, semester } = req.body;

    // Check karein ki file upload hui hai ya nahi
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Please upload a file' });
    }

    // Naya note create karein jisme 'link' ki jagah Cloudinary URL store ho
    const newNote = await Note.create({
      title,
      description,
      subject,
      semester,
      link: req.file.path, // Ye Cloudinary ka permanent URL hai
      user: req.user.id     // Note ko upload karne wale user se link karein
    });

    res.status(201).json({ 
      success: true, 
      message: 'File uploaded to Cloudinary successfully!',
      data: newNote 
    });

  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;