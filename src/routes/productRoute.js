import express from 'express';
import {
    createProduct,
    deleteProduct,
    getProductById,
    getProducts,
    updateProduct,
} from '../controllers/productController.js';
import authMiddleware from '../middlewares/authMiddleware.js';
import permissionMiddleware from '../middlewares/permissionMiddleware.js';
import validationMiddleware from '../middlewares/validationMiddleware.js';
import { productSchema } from '../validations/productValidation.js';

const router = express.Router();

router
    .get('/', getProducts)
    .get('/:id', getProductById)
    .post(
        '/',
        authMiddleware,
        permissionMiddleware,
        validationMiddleware(productSchema),
        createProduct,
    )
    .put(
        '/:id',
        authMiddleware,
        permissionMiddleware,
        validationMiddleware(productSchema),
        updateProduct,
    )
    .delete('/:id', authMiddleware, permissionMiddleware, deleteProduct);

export default router;
