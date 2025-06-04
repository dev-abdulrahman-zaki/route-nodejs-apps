import mongoose from "mongoose";

// 01. Define the schema
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: [true, "Product name must be unique"],
      trim: true,
      minlength: 3,
    },
    slug: {
      type: String,
      required: true,
      unique: [true, "Product slug must be unique"],
      trim: true,
      minlength: 3,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
      minlength: 10,
      maxlength: 2000,
    },
    imageCover: {
      type: String,
      required: true,
    },
    images: {
      type: [String],
      required: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    priceAfterDiscount: {
      type: Number,
      required: true,
      min: 0,
    },
    sold: Number, //internal operation
    stock: {
      type: Number,
      required: true,
      min: 0,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    subcategory: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
      required: true,
    },
    brand: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Brand",
      required: true,
    },
    ratingsAverage: {
      type: Number,
      min: 0,
      max: 5,
    }, //internal operation
    ratingsQuantity: Number, //internal operation
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

// 02. Post middleware - runs after the query is executed
productSchema.post("init", function (doc) {
  if (doc.imageCover) doc.imageCover = `${process.env.BASE_URL}/uploads/products/${doc.imageCover}`;
  if (doc.images) doc.images = doc.images?.map((image) => `${process.env.BASE_URL}/uploads/products/${image}`);
});

// 03. Define the model
export const Product = mongoose.model("Product", productSchema); // Note is the name of the collection in the "localhost:27017/e-commerce" database, which is "products" by default.
