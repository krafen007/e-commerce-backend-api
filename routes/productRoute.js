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

router.get('/', getProducts);
router.get("/:id", getProductById)
router.post(
  '/',
  authMiddleware,
  permissionMiddleware,
  validationMiddleware(productSchema),
  createProduct,
);
router.put(
  '/:id',
  authMiddleware,
  permissionMiddleware,
  validationMiddleware(productSchema),
  updateProduct,
);
router.delete('/:id', authMiddleware, permissionMiddleware, deleteProduct);

export default router;
