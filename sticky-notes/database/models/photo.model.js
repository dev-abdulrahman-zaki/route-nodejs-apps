import mongoose from "mongoose";

// 02. Define the schema
const photoSchema = mongoose.Schema(
  {
    title: String,
    imgUrl: String,
  },
);

// 03. Define the model
export const Photo = mongoose.model("Photo", photoSchema); // Photo is the name of the collection in the "localhost:27017/sticky-notes" database, which is "photos" by default.
