import mongoose from "mongoose"; // or: import {connect} from "mongoose";

// 01. Connect to MongoDB
export const dbConnection = mongoose
  .connect(process.env.MONGODB_URI_CONNECTION_STRING)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.error('Database connection error:', err);
  });
