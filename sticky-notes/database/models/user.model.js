import mongoose from "mongoose"; // or: import {Schema, model} from "mongoose";

// 02. Define the schema
const userSchema = mongoose.Schema(
  {
    name: String,
    email: String,
    password: String,
    confirmEmail: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: {
      createdAt: true,
    },
    versionKey: false,
  }
);

// 03. Define the model
export const User = mongoose.model("User", userSchema); // User is the name of the collection in the "localhost:27017/mongoose" database, which is "users" by default.
