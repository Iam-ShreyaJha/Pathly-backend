const Reminder = require('../models/Reminder');

// @desc    Add a reminder for an event
// @route   POST /api/reminders
exports.addReminder = async (req, res) => {
  try {
    const { eventId, reminderDate, note } = req.body;

    const reminder = await Reminder.create({
      user: req.user.id,
      event: eventId,
      reminderDate,
      note
    });

    res.status(201).json({ success: true, data: reminder });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Get user's upcoming reminders
// @route   GET /api/reminders
exports.getReminders = async (req, res) => {
  try {
    const reminders = await Reminder.find({ user: req.user.id }).populate('event');
    res.status(200).json({ success: true, count: reminders.length, data: reminders });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};