import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import User from '../models/userModel.js';

/**
 * @desc Protect routes - verify JWT token
 * @access Private
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check for "Bearer" token in headers
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    try {
      // Extract token
      token = req.headers.authorization.split(' ')[1];

      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user (without password) to request object
      req.user = await User.findById(decoded.id).select('-password');

      next();
    } catch (error) {
      console.error('❌ Token verification failed:', error.message);
      res.status(401);
      throw new Error('Not authorized, invalid token');
    }
  }

  if (!token) {
    res.status(401);
    throw new Error('Not authorized, no token provided');
  }
});

/**
 * @desc Check if user is admin
 * @access Private/Admin
 */
export const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(403);
    throw new Error('Access denied: Admins only');
  }
};
