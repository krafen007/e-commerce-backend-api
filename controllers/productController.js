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
export const getProducts = async (req, res, next) => {
  try {
    const { search, page, limit } = req.query;
    const { products, countProducts } = await getProductsHandler({
      search,
      page,
      limit,
    });
    return res.status(200).json({
      message: 'Fetched products successfully',
      page: page,
      limit: limit,
      totalProducts: countProducts,
      totalPages: Math.ceil(countProducts / parseInt(limit)),
      data: products,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * @disc Fetch Product By Id
 * @route GET api/product:id
 * @access Public
 */
export const getProductById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const product = await getProductByIdHandler(id);
    return res.status(200).json({
      message: 'Fetched product successfully',
      data: product,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * @disc Create New Product
 * @route POST api/product
 * @access Admin
 */
export const createProduct = async (req, res, next) => {
  try {
    const { title, description, price, category } = req.body;

    const product = await createProductHandler({
      title,
      description,
      price,
      category,
    });

    return res.status(201).json({
      message: 'Product create successfully',
      data: product,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * @disc Update Exists Product
 * @route PUT api/product:id
 * @access Admin
 */
export const updateProduct = async (req, res, next) => {
  try {
    const id = req.params.id;
    const { title, description, price, category } = req.body;

    const product = await updateProductHandler(id, {
      title,
      description,
      price,
      category,
    });

    return res.status(200).json({
      message: 'Product updated successfully',
      data: product,
    });
  } catch (error) {
    return next(error);
  }
};

/**
 * @disc Delete
 * @route DELETE api/product:id
 * @access Admin
 */
export const deleteProduct = async (req, res, next) => {
  try {
    const id = req.params.id;

    await deleteProductHandler(id);

    return res.status(202).json({
      message: 'Product deleted successfully',
    });
  } catch (error) {
    return next(error);
  }
};
