import express from 'express';
import {
    createCategory,
    deleteCategory,
    getCategories,
    getSpacificCategory,
    updateCategory,
} from '../controllers/categoryController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import permissionMiddleware from '../middlewares/permissionMiddleware.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import categorySchema from './../validations/categoryValidation.js';

const router = express.Router();

router
    .get('/', getCategories)
    .get('/:id', getSpacificCategory)
    .post(
        '/',
        authMiddleware,
        permissionMiddleware,
        validationMiddleware(categorySchema),
        createCategory,
    )
    .put(
        '/:id',
        authMiddleware,
        permissionMiddleware,
        validationMiddleware(categorySchema),
        updateCategory,
    )
    .delete('/:id', authMiddleware, permissionMiddleware, deleteCategory);

export default router;
