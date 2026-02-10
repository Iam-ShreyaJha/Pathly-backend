const jwt = require('jsonwebtoken');
const User = require('../models/User');

exports.protect = async (req, res, next) => {
  let token;

  // 1. Check karein ki headers mein Authorization header hai ya nahi
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    // Header format: "Bearer <token>"
    token = req.headers.authorization.split(' ')[1];
  }

  // 2. Agar token nahi hai toh error bhejien
  if (!token) {
    return res.status(401).json({ 
      success: false, 
      error: 'Not authorized to access this route. No token provided.' 
    });
  }

  try {
    // 3. Token verify karein
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. User ko database se dhundein aur request object (req.user) mein save karein
    req.user = await User.findById(decoded.id);

    // 5. Check karein ki user abhi bhi database mein exist karta hai ya nahi
    if (!req.user) {
      return res.status(401).json({ 
        success: false, 
        error: 'The user belonging to this token no longer exists.' 
      });
    }

    next();
  } catch (err) {
    return res.status(401).json({ 
      success: false, 
      error: 'Not authorized to access this route' 
    });
  }
};