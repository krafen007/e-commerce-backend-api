import cartModel from '../models/cartModel.js';
import ApiErrorHandler from '../utils/ApiErrorHandler.js';
import productModel from './../models/productModel.js';

// Add Item To Cart Handler
export const addToCartHandler = async ({ userId, productId, quantity }) => {
    const product = await productModel.findById(productId);

    if (!product) {
        throw new ApiErrorHandler(
            `The product you are trying to add to the cart does not exist`,
            404,
        );
    }

    let cart = await cartModel.findOne({ userId, status: 'active' });

    if (!cart) {
        cart = new cartModel({
            userId,
            items: [{ product: productId, quantity, unitPrice: product.price }],
        });
    } else {
        const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

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

    cart.totalPrice = cart.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);

    await cart.save();
    return cart;
};

// Get Cart Handler
export const getCartHandler = async ({ userId }) => {
    const cart = await cartModel
        .findOne({ userId, status: 'active' })
        .populate('items.product', 'title price image');

    if (!cart) {
        throw new ApiErrorHandler(
            `The cart you are trying to retrieve does not exist. Please add products first.`,
            404,
        );
    }

    return cart;
};

// Delete Item From Cart Handler
export const deleteItemFromCartHandler = async ({ userId, productId }) => {
    const cart = await cartModel.findOne({ userId, status: 'active' });

    if (!cart) {
        throw new ApiErrorHandler(`The cart you are trying to modify does not exist`, 404);
    }

    const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);

    if (itemIndex === -1) {
        throw new ApiErrorHandler(
            `The product you are trying to remove does not exist in the cart`,
            404,
        );
    }

    cart.items.splice(itemIndex, 1);

    cart.totalPrice = cart.items.reduce((total, item) => total + item.unitPrice * item.quantity, 0);

    await cart.save();
    return cart;
};
