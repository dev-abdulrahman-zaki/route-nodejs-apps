import mongoose from "mongoose";

// 01. Define the schema
const subCategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, "SubCategory name must be unique"],
      trim: true,
      minlength: 3,
    },
    slug: {
      type: String,
      required: true,
      unique: [true, "SubCategory slug must be unique"],
      trim: true,
      minlength: 3,
      lowercase: true,
    },
    image: {
      type: String,
      // required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
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

// 02. Define the model
export const SubCategory = mongoose.model("SubCategory", subCategorySchema); // Note is the name of the collection in the "localhost:27017/e-commerce" database, which is "subcategories" by default.
