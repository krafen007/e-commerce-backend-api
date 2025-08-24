import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'First name is required'],
      minlength: [3, 'First name must be at least 3 characters'],
      trim: true,
    },

    lastName: {
      type: String,
      required: [true, 'Last name is required'],
      minlength: [3, 'Last name must be at least 3 characters'],
      trim: true,
    },

    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: [true, 'Password is required'],
      min: [5, 'Password must be at least 5 alpha numeric'],
      select: false,
    },

    role: {
      type: String,
      enum: ['admin', 'customer'],
      default: 'customer',
    },
  },

  {
    timestamps: true,
  },
);

const userModel = mongoose.model('User', userSchema);

export default userModel;
