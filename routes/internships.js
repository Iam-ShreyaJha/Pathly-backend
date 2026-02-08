const express = require('express');
const router = express.Router();
const { getInternships, createInternship, deleteInternship } = require('../controllers/internshipController');
const { protect } = require('../middleware/authMiddleware');

// Routes define karein
router.route('/')
  .get(getInternships)
  .post(protect, createInternship);

router.route('/:id')
  .delete(protect, deleteInternship);

module.exports = router;