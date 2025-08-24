import express from 'express';
import {
  addToCart,
  deleteItemFromCart,
  getCart,
} from '../controllers/cartController.js';
import authMiddleware from './../middlewares/authMiddleware.js';

const router = express.Router();

router.get('/', authMiddleware, getCart);
router.post('/:id', authMiddleware, addToCart);
router.delete('/:id', authMiddleware, deleteItemFromCart);

export default router;
