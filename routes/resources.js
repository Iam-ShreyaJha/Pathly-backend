const express = require('express');
const router = express.Router();
const Resource = require('../models/Resource'); 
const { protect } = require('../middleware/authMiddleware');

// Route 1: Get all resources from MongoDB
router.get('/', async (req, res) => {
  try {
    const resources = await Resource.find();
    res.status(200).json({ success: true, data: resources });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

// Route 2: Add a new resource roadmap (Thunder Client ke liye)
router.post('/', protect, async (req, res) => {
  try {
    const newResource = await Resource.create(req.body);
    res.status(201).json({ success: true, data: newResource });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

module.exports = router;