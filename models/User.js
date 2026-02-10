const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
  },
  email: {
    type: String,
    required: [true, 'Please add an email'],
    unique: true,
    match: [
      /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
      'Please add a valid email',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: [8, 'Password must be at least 8 characters long'],
    select: false,
    // Note: Validation sirf naye register hone walo ke liye chalega
  },
  
  // --- PROFILE FIELDS ---
  college: {
    type: String,
    default: '',
  },
  branch: {
    type: String,
    default: '',
  },
  graduationYear: {
    type: String,
    default: '2026',
  },
  bio: {
    type: String,
    default: '',
  },

  // --- ROLE (Ensuring it is always selectable) ---
  role: {
    type: String,
    enum: ['student', 'admin'],
    default: 'student',
  },

  // --- STATISTICS ---
  stats: {
    notesDownloaded: { type: Number, default: 0 },
    eventsViewed: { type: Number, default: 0 },
    resourcesVisited: { type: Number, default: 0 }
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Encrypt password before saving
UserSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// matchPassword method - iska naam controller se match hona chahiye
UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', UserSchema);