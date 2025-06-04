import mongoose from "mongoose";

// 01. Define the schema
const brandSchema = new mongoose.Schema(
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

// 02. Post middleware - runs after the query is executed
brandSchema.post("init", function (doc) {
  doc.logo = `${process.env.BASE_URL}/uploads/brands/${doc.logo}`;
});

// 03. Define the model
export const Brand = mongoose.model("Brand", brandSchema); // Note is the name of the collection in the "localhost:27017/e-commerce" database, which is "brands" by default.
