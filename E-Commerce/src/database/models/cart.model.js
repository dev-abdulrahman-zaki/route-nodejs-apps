import mongoose from "mongoose";

// 01. Define the schema
const cartSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        quantity: {
          type: Number,
          default: 1,
          min: 1,
          required: true,
        },
        // internal field
        price: {
          type: Number,
          required: true,
        },
      },
    ],
    // internal field
    totalPrice: {
      type: Number,
      required: true,
    },
    // internal field
    discount: {
      type: Number,
      required: true,
      min: 0,
      max: 100,
      default: 0,
    },
    // internal field
    totalPriceAfterDiscount: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

// 02. Define the model
export const Cart = mongoose.model("Cart", cartSchema); // Note is the name of the collection in the "localhost:27017/e-commerce" database, which is "carts" by default.
