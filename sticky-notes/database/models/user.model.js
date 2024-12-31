import mongoose from "mongoose"; // or: import {Schema, model} from "mongoose";

// 02. Define the schema
const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      unique: true,
      required: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: {
      updatedAt: false,
    },
    versionKey: false,
  }
);

// 03. Define the model
export const User = mongoose.model("User", userSchema); // User is the name of the collection in the "localhost:27017/mongoose" database, which is "users" by default.
