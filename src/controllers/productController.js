import ApiResponseHandler from './../utils/ApiResponseHandler.js';
import asyncHandler from 'express-async-handler';
import {
    createProductHandler,
    deleteProductHandler,
    getProductByIdHandler,
    getProductsHandler,
    updateProductHandler,
} from '../services/productService.js';

/**
 * @disc Fetch All Products
 * @route GET api/product
 * @access Public
 */
export const getProducts = asyncHandler(async (req, res) => {
    const { search, page, limit } = req.query;
    const products = await getProductsHandler({
        search,
        page,
        limit,
    });

    res.status(200).json({
        message: 'Fetched products successfully',
        page: page,
        limit: limit,
        totalProducts: countProducts,
        totalPages: Math.ceil(countProducts / parseInt(limit)),
        data: products,
    });
});

/**
 * @disc Fetch Product By Id
 * @route GET api/product:id
 * @access Public
 */
export const getProductById = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const product = await getProductByIdHandler({ id });

    res.status(200).json(new ApiResponseHandler(200, 'Fetched product successfully', product));
});

/**
 * @disc Create New Product
 * @route POST api/product
 * @access Admin
 */
export const createProduct = asyncHandler(async (req, res) => {
    const { title, description, price, category, image } = req.body;

    const product = await createProductHandler({
        title,
        description,
        price,
        category,
        image,
    });

    res.status(201).json(new ApiResponseHandler(201, 'Product create successfully', product));
});

/**
 * @disc Update Exists Product
 * @route PUT api/product:id
 * @access Admin
 */
export const updateProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const { title, description, price, category, image } = req.body;

    const product = await updateProductHandler({
        id,
        title,
        description,
        price,
        category,
        image,
    });

    res.status(200).json(new ApiResponseHandler(200, 'Product updated successfully', product));
});

/**
 * @disc Delete
 * @route DELETE api/product:id
 * @access Admin
 */
export const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params.id;

    const deletedProduct = await deleteProductHandler({ id });

    res.status(202).json(
        new ApiResponseHandler(200, 'Product deleted successfully', deletedProduct),
    );
});
