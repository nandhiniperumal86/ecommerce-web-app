import express from 'express';
import {
  getProducts,
  createProduct,
} from '../controllers/productController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Public route: Get all products
router.route('/').get(getProducts);

// Protected route: Admin can create product
router.route('/').post(protect, admin, createProduct);

export default router;
