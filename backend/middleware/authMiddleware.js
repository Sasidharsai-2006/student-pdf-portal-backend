const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      token = req.headers.authorization.split(' ')[1];

      console.log('Verifying token...');
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log('Token decoded:', decoded);

      req.user = await User.findById(decoded.userId).select('-password');

      if (!req.user) {
        console.error('User not found in DB with ID:', decoded.userId);
        return res.status(401).json({ message: 'Not authorized, user not found' });
      }

      console.log('User authenticated:', req.user.email);
      next();
    } catch (error) {
      console.error('Auth Verification Failed:', error.message);
      res.status(401).json({ message: 'Not authorized, token failed: ' + error.message });
    }
  }

  if (!token) {
    res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };
