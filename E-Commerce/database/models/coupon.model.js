import mongoose from "mongoose";

// 01. Define the schema
const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: [true, "Coupon code must be unique"],
      trim: true,
      minlength: 3,
      required: true,
    },
    expiresAt: {
      type: Date,
      required: true,
    },
    discountPercentage: {
      type: Number, // percentage
      required: true,
      min: 0,
      max: 100,
      default: 0,
    },
  },
  {
    timestamps: {
      updatedAt: false, // Adds createdAt
    },
    versionKey: false,
  }
);

// 02. Define the model
export const Coupon = mongoose.model("Coupon", couponSchema); // Note is the name of the collection in the "localhost:27017/e-commerce" database, which is "coupons" by default.
