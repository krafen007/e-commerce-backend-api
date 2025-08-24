/**
 * title
 * description
 * price
 * category enum [electric, food, clothes]
 */

import mongoose from 'mongoose';

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Title of product is required'],
      minlength: [5, 'Title must be at least 5 characters'],
    },

    description: {
      type: String,
      required: [true, 'Description of product is required'],
      minlength: [5, 'Description must be at least 5 characters'],
    },

    price: {
      type: Number,
      required: [true, 'Price of product is required'],
      min: 0,
    },

    category: {
      type: String,
      enum: ['electric', 'food', 'clothes'],
      required: [true, 'Category is required'],
    },

    image: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);

const productModel = mongoose.model('Product', productSchema);

export default productModel;
