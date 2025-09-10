import ApiResponseHandler from './../utils/ApiResponseHandler.js';
import asyncHandler from 'express-async-handler';
import {
    addToCartHandler,
    deleteItemFromCartHandler,
    getCartHandler,
} from '../services/cartService.js';

/**
 * @desc Add product to cart
 * @route POST /api/cart/add
 * @access Private (user only)
 */
export const addToCart = asyncHandler(async (req, res) => {
    const { quantity } = req.body;
    const productId = req.params;
    const userId = req.user._id;

    const cart = await addToCartHandler({ userId, productId, quantity });

    res.status(201).json(new ApiResponseHandler(201, 'Product added to cart successfully', cart));
});

/**
 * @desc Get user cart
 * @route GET /api/cart
 * @access Private (user only)
 */
export const getCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const cart = await getCartHandler({ userId });

    res.status(200).json(new ApiResponseHandler(200, 'Fetched cart successfully', cart));
});

/**
 * @desc Remove product from cart
 * @route DELETE /api/cart/:productId
 * @access Private (user only)
 */
export const deleteItemFromCart = asyncHandler(async (req, res) => {
    const userId = req.user._id;
    const productId = req.params;

    const cart = await deleteItemFromCartHandler({ userId, productId });

    res.status(200).json(
        new ApiResponseHandler(200, 'Product removed from cart successfully', cart),
    );
});
