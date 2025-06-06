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
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    ratingsAverage: {
      type: Number,
      min: 0,
      max: 5,
    }, //internal operation
    ratingsQuantity: Number, //internal operation
  },
  {
    timestamps: {
      updatedAt: false, // Adds createdAt
    },
    versionKey: false,
    toJSON: { virtuals: true }, // Allows virtuals to be included in the JSON output
    id: false, // Prevents the creation of an additional virtual id field
  }
);

// 02. Post middleware - runs after the query is executed
productSchema.post("init", function (doc) {
  if (doc.imageCover)
    doc.imageCover = `${process.env.BASE_URL}/uploads/products/${doc.imageCover}`;
  if (doc.images)
    doc.images = doc.images?.map(
      (image) => `${process.env.BASE_URL}/uploads/products/${image}`
    );
});

// 03. Virtual populate - allows us to create a virtual field that is not stored in the database
productSchema.virtual("reviews", {
  // 01 local field
  localField: "_id",
  // 02 foreign field
  ref: "Review",
  foreignField: "product",
});

// 04. Pre middleware - runs before the query is executed
productSchema.pre("findOne", function () {
  this.populate("reviews"); // Populate the reviews virtual field that was created from the virtual populate in 03
});

// 05. Define the model
export const Product = mongoose.model("Product", productSchema); // Note is the name of the collection in the "localhost:27017/e-commerce" database, which is "products" by default.
