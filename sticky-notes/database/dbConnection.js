import mongoose from "mongoose"; // or: import {connect} from "mongoose";

// 01. Connect to MongoDB
export const dbConnection = mongoose
  .connect(process.env.MONGODB_URI_CONNECTION_STRING) // or: mongodb://localhost:27017/sticky-notes
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
