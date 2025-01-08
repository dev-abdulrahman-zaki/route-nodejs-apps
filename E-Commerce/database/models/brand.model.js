import mongoose from "mongoose";

// 02. Define the schema
const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, "Brand name must be unique"],
      trim: true,
      minlength: 3,
    },
    slug: {
      type: String,
      required: true,
      unique: [true, "Brand slug must be unique"],
      trim: true,
      minlength: 3,
      lowercase: true,
    },
    logo: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
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
export const Brand = mongoose.model("Brand", brandSchema); // Note is the name of the collection in the "localhost:27017/e-commerce" database, which is "brands" by default.
