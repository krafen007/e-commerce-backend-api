import productModel from '../models/productModel.js';
import ApiErrorHandler from '../utils/ApiErrorHandler.js';

// Get Products Handler
export const getProductsHandler = async ({ search, page, limit }) => {
    const limitPages = parseInt(limit) || 10;
    const pageNumber = parseInt(page) || 1;
    const skip = (pageNumber - 1) * limitPages;

    const products = await productModel
        .find({
            title: { $regex: search || '', $options: 'i' },
        })
        .skip(skip)
        .limit(limitPages);

    return { products };
};

// Get Product By Id Handler
export const getProductByIdHandler = async ({ id }) => {
    const findProduct = await productModel.findById(id);
    if (!findProduct) {
        throw new ApiErrorHandler(`The product you are trying to retrieve does not exist`, 404);
    }

    return findProduct;
};

// Create Products Handler
export const createProductHandler = async ({ title, description, price, category }) => {
    const product = await productModel.create({
        title,
        description,
        price,
        category,
    });

    return product;
};
// Update Products Handler
export const updateProductHandler = async ({ id, title, description, price, category }) => {
    const findProduct = await productModel.findById(id);
    if (!findProduct) {
        throw new ApiErrorHandler(`The product you are trying to update does not exist`, 404);
    }

    const updateProduct = await productModel.findByIdAndUpdate(
        id,
        {
            title,
            description,
            price,
            category,
        },
        { new: true },
    );

    return updateProduct;
};

// Delete Products Handler
export const deleteProductHandler = async ({ id }) => {
    const findProduct = await productModel.findById(id);
    if (!findProduct) {
        throw new ApiErrorHandler(`The product you are trying to delete does not exist`, 404);
    }

    const deletedProduct = await productModel.findByIdAndDelete(id);
    return deletedProduct;
};
