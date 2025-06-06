import mongoose from "mongoose";

// 02. Define the schema
const noteSchema = new mongoose.Schema(
  {
    title: String,
    description: String,
    user: {
      type: mongoose.Types.ObjectId,
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

// 03. Define the model
export const Note = mongoose.model("Note", noteSchema); // Note is the name of the collection in the "localhost:27017/sticky-notes" database, which is "notes" by default.
