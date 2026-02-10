const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const cloudinary = require('cloudinary').v2;

// Helper function to generate token
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d',
    });
};

// @desc    Register user & Auto-login
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const user = await User.create({
      name,
      email,
      password,
      role: 'student' // Default role always student
    });

    const token = generateToken(user._id);
    res.status(201).json({
      success: true,
      token,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        role: user.role
      }
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ 
        success: false, 
        error: "This account already exists. Please login instead." 
      });
    }
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Auth user & get token (Login)
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Explicitly fetching password and role
    const user = await User.findOne({ email }).select('+password +role');

    if (!user) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Invalid credentials" });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      success: true,
      token,
      user: { 
        id: user._id, 
        name: user.name, 
        email: user.email,
        role: user.role, // Force return role
        profilePic: user.profilePic,
        college: user.college,
        branch: user.branch,
        graduationYear: user.graduationYear,
        bio: user.bio,
        github: user.github,
        linkedin: user.linkedin
      }
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// @desc    Update Profile Details
exports.updateProfileDetails = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.user.id,
      req.body, // Catching all fields from frontend
      { new: true, runValidators: true }
    ).select('+role');

    res.status(200).json({ 
      success: true, 
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role, 
        college: user.college,
        branch: user.branch,
        graduationYear: user.graduationYear,
        bio: user.bio,
        github: user.github,
        linkedin: user.linkedin,
        profilePic: user.profilePic
      }
    });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update Password
exports.updatePassword = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('+password');
    const isMatch = await user.matchPassword(req.body.currentPassword);
    
    if (!isMatch) {
      return res.status(401).json({ success: false, error: "Old password is incorrect" });
    }

    user.password = req.body.newPassword;
    await user.save();

    res.status(200).json({ success: true, message: "Password updated successfully!" });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
};

// @desc    Update Profile Picture
exports.updateProfilePic = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, error: 'Please upload an image' });
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      { profilePic: req.file.path },
      { new: true }
    ).select('+role');

    res.status(200).json({ success: true, user });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};