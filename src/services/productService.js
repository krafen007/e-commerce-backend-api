import productModel from '../models/productModel.js';

// Get Products Handler
export const getProductsHandler = async ({ search, page, limit }) => {
  const limitPages = parseInt(limit) || 10;
  const pageNumber = parseInt(page) || 1;
  const skip = (pageNumber - 1) * limitPages;

  const countProducts = await productModel.countDocuments({
    title: { $regex: search || '', $options: 'i' },
  });

  const products = await productModel
    .find({
      title: { $regex: search || '', $options: 'i' },
    })
    .skip(skip)
    .limit(limitPages);

  return { products, countProducts };
};

// Get Product By Id Handler
export const getProductByIdHandler = async (id) => {
  const findProduct = await productModel.findById(id);

  if (!findProduct) {
    const error = new Error('Product not found');
    error.statusCode = 404;
    throw error;
  }

  return findProduct;
};

// Create Products Handler
export const createProductHandler = async ({
  title,
  description,
  price,
  category,
}) => {
  if (!title || !description || !price || !category) {
    const error = new Error('All fields are requirer');
    error.statusCode = 400;
    throw error;
  }

  const product = await productModel.create({
    title,
    description,
    price,
    category,
  });

  return product;
};

// Update Products Handler
export const updateProductHandler = async (
  id,
  { title, description, price, category },
) => {
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
export const deleteProductHandler = async (id) => {
  await productModel.findByIdAndDelete(id);
};
