/**
 * get all
 * get spacific
 * update
 * delete
 */

import asyncHandler from 'express-async-handler';
import {
    createCategoryHandler,
    deleteCategoryHandler,
    getCategoriesHandler,
    getSpacificCategoryHandler,
    updateCategoryHandler,
} from '../services/categoryService.js';
import ApiResponseHandler from '../utils/ApiResponseHandler.js';

/**
 * @des Get all categories
 * @route GET /api/categories/
 * @access Public
 */
export const getCategories = asyncHandler(async (req, res) => {
    const categories = await getCategoriesHandler();
    res.status(200).json(
        new ApiResponseHandler(200, 'Categories fetched successfully', categories),
    );
});

/**
 * @des Get specific category
 * @route GET /api/categories/
 * @access Public
 */
export const getSpacificCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const category = await getSpacificCategoryHandler({ id });

    res.status(200).json(new ApiResponseHandler(200, 'Category fetched successfully', category));
});

/**
 * @des Create new category
 * @route POST /api/categories/
 * @access Private
 */
export const createCategory = asyncHandler(async (req, res) => {
    const { name, image } = req.body;

    const category = await createCategoryHandler({ name, image });

    res.status(201).json(new ApiResponseHandler(201, 'Category created successfully', category));
});

export const updateCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, image } = req.body;

    const category = await updateCategoryHandler({ id, name, image });

    res.status(200).json(new ApiResponseHandler(200, 'Category updated successfully', category));
});

/**
 * @des Update category
 * @route PUT /api/categories/:id
 * @access Private
 */
export const deleteCategory = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const category = await deleteCategoryHandler({ id });

    res.status(200).json(new ApiResponseHandler(200, ' Category deleted successfully', category));
});
