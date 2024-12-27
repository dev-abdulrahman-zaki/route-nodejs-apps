import mongoose from "mongoose";

// 02. Define the schema
const postSchema = mongoose.Schema({
  title: String,
  description: String,
  createdBy: {
    type: mongoose.Types.ObjectId,
    ref: "User",
  },
});

// 03. Define the model
export const Post = mongoose.model("Post", postSchema); // Post is the name of the collection in the "localhost:27017/mongoose" database, which is "posts" by default.
