import mongoose from "mongoose"; // or: import {connect} from "mongoose";

// 01. Connect to MongoDB
export const dbConnection = mongoose
  .connect(process.env.MONGODB_URI_CONNECTION_STRING || 'mongodb://127.0.0.1:27017/e-commerce') // or: mongodb://localhost:27017/e-commerce
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
