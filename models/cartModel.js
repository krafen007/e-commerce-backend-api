import mongoose, { Schema } from 'mongoose';

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },

    quantity: {
      type: Number,
      default: 1,
      required: true,
    },

    unitPrice: {
      type: Number,
      min: 0,
      required: true,
    },
  },

  { timestamps: true },
);

const cartSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },

    items: {
      type: [cartItemSchema],
      default: [],
    },

    totalPrice: {
      type: Number,
      default: 0,
    },

    status: {
      type: String,
      enum: ['active', 'completed'],
      default: 'active',
    },
  },

  { timestamps: true },
);

// Auto calculate total price
// cartSchema.pre('save', function (next) {
//   this.totalPrice = this.items.reduce(
//     (acc, item) => acc + item.unitPrice * item.quantity,
//     0,
//   );
//   next();
// });

const cartModel = mongoose.model('Cart', cartSchema);

export default cartModel;
