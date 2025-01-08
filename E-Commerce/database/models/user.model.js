import mongoose from "mongoose"; // or: import {Schema, model} from "mongoose";

// 02. Define the schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [3, "Name must be at least 3 characters long"],
    },
    email: {
      type: String,
      unique: true, // This creates a unique index on the email field
      // required: true,
      required: [true, "Email is required - from mongoose"],
      lowercase: true,
      trim: true,
      validate: {
        validator: function (email) {
          return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
        },
        message: (props) => `${props.value} is not a valid email address!`,
      },
    },
    password: {
      type: String,
      minlength: [8, "Password must be at least 8 characters long"], // Not used since the password is hashed
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
    age: {
      type: Number,
      min: [18, "You must be at least 18 years old"],
      max: [100, "You must be less than 100 years old"],
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
