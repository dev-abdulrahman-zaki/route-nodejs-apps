import mongoose from "mongoose";

// 02. Define the schema
const couponSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      unique: [true, "Coupon code must be unique"],
      trim: true,
      minlength: 3,
      required: true,
    },
    expire: {
      type: Date,
      required: true,
    },
    discount: {
      type: Number,
      required: true,
      min: 0,
    },
  },
  {
    timestamps: {
      updatedAt: false, // Adds createdAt
    },
    versionKey: false,
  }
);

// 03. Define the model
export const Coupon = mongoose.model("Coupon", couponSchema); // Note is the name of the collection in the "localhost:27017/e-commerce" database, which is "coupons" by default.
