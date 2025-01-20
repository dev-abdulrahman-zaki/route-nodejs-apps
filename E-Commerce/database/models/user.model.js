import mongoose from "mongoose"; // or: import {Schema, model} from "mongoose";
import bcrypt from "bcrypt";

// 01. Define the schema
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
      // minlength: [8, "Password must be at least 8 characters long"], // Not used since the password is hashed
      required: true,
      trim: true,
    },
    passwordChangedAt: {
      type: Date,
    },
    lastLoginAt: {
      type: Date,
    },
    isBlocked: {
      type: Boolean,
      default: false,
    },
    // confirmEmail: {
    //   type: Boolean,
    //   default: false,
    // },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
      lowercase: true,
    },
  },
  {
    timestamps: {
      updatedAt: false,
    },
    versionKey: false,
  }
);

// 02-01. Hash the password before add
/*
 - "pre" it is a middleware that runs before the save operation.
 - "save" because await user.save() in addUser controller.
 - "this" is the current user instance (refers to the document being saved).
 - `this.password` accesses the document's password field.
 - "isModified" it is a mongoose method that checks if the password field is modified.
 - "next" is a function that calls the next middleware in the chain.
 - "return next()" because if the password is not modified, we don't need to hash it.
*/
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// 02-02. Hash the password before update
/*
 - "pre" it is a middleware that runs before the save operation.
 - "findOneAndUpdate" because await User.findByIdAndUpdate() in updateUser controller.
 - "this" refers to the query object, not the document.
 - "this._update" is the update object.
 - The update data is in the query's update object
 - We need to access the password through the update object
 - ref: https://poe.com/s/6zkoh7VpRjMTox6ShGSH
*/
userSchema.pre("findOneAndUpdate", async function (next) {
  if (this._update.password) {
    this._update.password = await bcrypt.hash(this._update.password, 10);
  }
  next();
});

// 03. Define the model
export const User = mongoose.model("User", userSchema); // User is the name of the collection in the "localhost:27017/mongoose" database, which is "users" by default.
