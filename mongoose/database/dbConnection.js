import mongoose from "mongoose";

// 01. Connect to MongoDB
export const dbConnection = mongoose
  .connect("mongodb://127.0.0.1:27017/mongoose") // or: mongodb://localhost:27017/mongoose
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });
