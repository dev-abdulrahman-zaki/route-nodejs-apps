import mongoose from "mongoose";

// 02. Define the schema
const commentSchema = mongoose.Schema({
  content: String,
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
  post: {
    type: mongoose.Types.ObjectId,
    ref: "Post",
  },
});

// 03. Define the model
export const Comment = mongoose.model("Comment", commentSchema); // Comment is the name of the collection in the "localhost:27017/mongoose" database, which is "comments" by default.
