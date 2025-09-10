import slugify from 'slugify';

import categoryModel from '../models/categoryModel.js';
import ApiErrorHandler from '../utils/ApiErrorHandler.js';

// Get Categories Handler
export const getCategoriesHandler = async (search, limit, page) => {
    const limitPages = parseInt(limit) || 10;
    const pageNumber = parseInt(page) || 1;
    const skip = (pageNumber - 1) * limitPages;
    const categories = await categoryModel
        .find({ name: { $regex: search || '', $options: 'i' } })
        .limit(limitPages)
        .skip(skip);

    return categories;
};

// Get Spacific Category Handler
export const getSpacificCategoryHandler = async ({ id }) => {
    const category = await categoryModel.findById(id);

    if (!category) {
        throw new ApiErrorHandler(`Not category find with this id: ${id}`, 404);
    }

    return category;
};

// Creat Category Handler
export const createCategoryHandler = async ({ name, image }) => {
    const findCategory = await categoryModel.findOne({ name });

    if (findCategory) {
        throw new ApiErrorHandler('Category name already defined', 409);
    }

    const category = await categoryModel.create({ name, image, slug: slugify(name) });

    return category;
};

// Update Category Handler
export const updateCategoryHandler = async ({ id, name, image }) => {
    const findCategory = await categoryModel.findById(id);

    if (!findCategory) {
        throw new ApiErrorHandler('Category you want updated not found', 404);
    }

    const category = await categoryModel.findByIdAndUpdate(
        id,
        {
            name,
            image,
            slug: slugify(name),
        },
        { new: true },
    );

    return category;
};

// Delete Category Handler
export const deleteCategoryHandler = async ({ id }) => {
    const findCategory = await categoryModel.findById(id);

    if (!findCategory) {
        throw new ApiErrorHandler('Category you want delete not found', 404);
    }

    const category = await categoryModel.findByIdAndDelete(id);

    return category;
};
