import mongoose from "mongoose";

// 02. Define the schema
const commentSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    trim: true
  },
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
    required: true,
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
    required: true,
  },
}, {
  timestamps: {
    updatedAt: false, // Adds createdAt
  },
  versionKey: false,
});

// 03. Define the model
export const Comment = mongoose.model("Comment", commentSchema); // Comment is the name of the collection in the "localhost:27017/mongoose" database, which is "comments" by default.
