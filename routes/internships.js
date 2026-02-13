const express = require('express');
const router = express.Router();
const { 
    getInternships, 
    createInternship, 
    deleteInternship 
} = require('../controllers/internshipController');
const { protect, admin } = require('../middleware/authMiddleware'); // Admin middleware import kiya

// Routes define karein
router.route('/')
  .get(getInternships) // Sab dekh sakte hain
  .post(protect, admin, createInternship); // Sirf Admin upload kar sakta hai

router.route('/:id')
  .delete(protect, admin, deleteInternship); // Sirf Admin delete kar sakta hai

module.exports = router;