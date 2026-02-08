const express = require('express');
const router = express.Router();
const { addReminder, getReminders } = require('../controllers/reminderController');
const { protect } = require('../middleware/authMiddleware');

router.use(protect); // Saare reminder routes protected honge
router.route('/').post(addReminder).get(getReminders);

module.exports = router;