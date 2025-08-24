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
export const addToCart = async (req, res, next) => {
  try {
    const { quantity } = req.body;
    const productId = req.params;
    const userId = req.user._id;

    const cart = await addToCartHandler({ userId, productId, quantity });
    return res.status(201).json({
      message: 'Product added to cart',
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Get user cart
 * @route GET /api/cart
 * @access Private (user only)
 */
export const getCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const cart = await getCartHandler({ userId });

    return res.status(200).json({
      message: 'Fetched cart successfully',
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};

/**
 * @desc Remove product from cart
 * @route DELETE /api/cart/:productId
 * @access Private (user only)
 */
export const deleteItemFromCart = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const productId = req.params;

    const cart = await deleteItemFromCartHandler({ userId, productId });

    return res.status(202).json({
      message: 'Product removed from cart',
      data: cart,
    });
  } catch (error) {
    next(error);
  }
};
