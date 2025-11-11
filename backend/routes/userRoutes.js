import express from 'express';
import {
  registerUser,
  authUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
} from '../controllers/userController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public routes
router.post('/register', registerUser);
router.post('/login', authUser);

// Private routes
router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Admin routes
router.route('/').get(protect, admin, getUsers);

export default router;
