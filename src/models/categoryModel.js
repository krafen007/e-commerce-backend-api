import mongoose from 'mongoose';

const categorySchema = new mongoose.Schema(
    {
        name: {
            type: String,
            minlength: [3, 'Category name must be at least 3 characters'],
            maxlength: [32, 'Category name must be at most 32 characters'],
            required: [true, 'Category name is required'],
            unique: true,
        },

        slug: {
            type: String,
            lowercase: true,
            unique: true,
        },

        image: {
            type: String,
        },
    },
    { timestamps: true },
);

const categoryModel = mongoose.model('Category', categorySchema);

export default categoryModel;
