const express = require('express');
const router = express.Router();
const { 
    register, 
    login, 
    updatePassword,
    updateProfilePic,
    updateProfileDetails
} = require('../controllers/authController');

// Token verify karne ke liye middleware aur Multer (image upload) import karein
const { protect } = require('../middleware/authMiddleware');
const upload = require('../middleware/multer'); // Check karein ye file aapke middleware folder mein ho

// --- PUBLIC ROUTES ---
router.post('/register', register);
router.post('/login', login);

// --- PRIVATE ROUTES (Token required) ---

// Password change karne ke liye
router.put('/updatepassword', protect, updatePassword);

// Profile details (Name, College, Branch, Year, Bio, Socials) update karne ke liye
router.put('/update-details', protect, updateProfileDetails);

// Profile picture update karne ke liye (Cloudinary use karta hai)
router.put('/update-pic', protect, upload.single('image'), updateProfilePic);

module.exports = router;