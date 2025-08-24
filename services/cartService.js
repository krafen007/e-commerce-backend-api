import cartModel from '../models/cartModel.js';
import productMode from './../models/productModel.js';

// Add Item To Cart Handler
export const addToCartHandler = async ({ userId, productId, quantity }) => {
  const product = await productMode.findById(productId);

  if (!product) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }

  let cart = await cartModel.findOne({ userId, status: 'active' });

  if (!cart) {
    cart = new cartModel({
      userId,
      items: [{ product: productId, quantity, unitPrice: product.price }],
      totalPrice: quantity * product.price,
    });
  } else {
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId,
    );

    if (itemIndex > -1) {
      cart.items[itemIndex].quantity += quantity;
    } else {
      cart.items.push({
        product: productId,
        quantity,
        unitPrice: product.price,
      });
    }
  }

  cart.totalPrice = cart.items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
    0,
  );

  await cart.save();
  return cart;
};

// Get Cart Handler
export const getCartHandler = async ({ userId }) => {
  const cart = await cartModel
    .findOne({ userId, status: 'active' })
    .populate('items.product', 'title price image');

  if (!cart) {
    const error = new Error('Cart not found, Please add products first');
    error.statusCode = 400;
    throw error;
  }

  return cart;
};

// Delete Item From Cart Handler
export const deleteItemFromCartHandler = async ({ userId, productId }) => {
  const cart = await cartModel.findOne({ userId, status: 'active' });

  if (!cart) {
    const error = new Error('Cart not found');
    error.statusCode = 404;
    throw error;
  }

  cart.items = cart.items.filter(
    (item) => item.product.toString() !== productId,
  );

  cart.totalPrice = cart.items.reduce(
    (total, item) => total + item.unitPrice * item.quantity,
  );

  await cart.save();
  return cart;
};
