// 00. Uncaught Exception - catches synchronous errors
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception =>", err);
  console.error(err?.stack);
});

// 01. Importing the required modules
import express from "express";
import multer from "multer";
import dotenv from "dotenv";
dotenv.config();
import { dbConnection } from "./database/dbConnection.js"; // Import the dbConnection to connect to MongoDB even if the dbConnection import is not used in the code.
import userRoutes from "./src/modules/user/user.routes.js";
import noteRoutes from "./src/modules/note/note.routes.js";
import photoRoutes from "./src/modules/photo/photo.routes.js";
import { checkAuth } from "./src/middlewares/checkAuth.js";
import { SystemError } from "./src/utils/systemError.js";
import { globalError } from "./src/middlewares/globalError.js";

// 02. Creating the express app
const app = express();
const port = 4000;

// 03. Middleware
app.use(express.json());
app.use("/uploads", express.static("uploads")); // this means that when we go to http://localhost:4000/uploads/photo.jpg, it will serve the photo.jpg file from the uploads folder.
/*
app.use(
"/uploads",                          => route name
express.static("uploads")            => folder name
);

So, it connects/anchors the route name to the folder name.
*/

// 04. Define the base path
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/auth", userRoutes);
app.use("/notes", checkAuth, noteRoutes);
app.use("/photos", photoRoutes);

// 05. Catch all routes
app.use("*", (req, res, next) => {
  next(new SystemError(`Route not found: ${req.originalUrl}`, 404));
});

// 06. Error handling middleware
app.use(globalError);

// 07. Unhandled Rejection - catches async errors
process.on("unhandledRejection", (err, promise) => {
  // console.error("Unhandled Rejection at:", promise, "error:", err);
  console.error("Unhandled Rejection =>", err?.stack);
});

// 08. Start the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
