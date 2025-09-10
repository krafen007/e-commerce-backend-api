import express from 'express';
import {
    addToCart,
    decrementProductFromCart,
    deleteItemFromCart,
    getCart,
} from '../controllers/cartController.js';
import authMiddleware from './../middlewares/authMiddleware.js';

const router = express.Router();

router
    .get('/', authMiddleware, getCart)
    .post('/:productId', authMiddleware, addToCart)
    .patch('/:productId', authMiddleware, decrementProductFromCart)
    .delete('/:productId', authMiddleware, deleteItemFromCart);

export default router;
