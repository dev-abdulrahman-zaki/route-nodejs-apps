process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  console.error(err?.stack);
});

import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { dbConnection } from "./database/dbConnection.js"; // Import the dbConnection to connect to MongoDB even if the dbConnection import is not used in the code.
import userRoutes from "./src/modules/user/user.routes.js";
import noteRoutes from "./src/modules/note/note.routes.js";
import { checkAuth } from "./src/middlewares/checkAuth.js";
import { SystemError } from "./src/utils/systemError.js";
import { globalError } from "./src/middlewares/globalError.js";
const app = express();
const port = 4000;

// 00. Middleware
app.use(express.json());

// 01. Define the base path
app.get("/", (req, res) => res.send("Hello World!"));
app.use("/auth", userRoutes);
app.use("/notes", checkAuth, noteRoutes);

// 02. Catch all routes
app.use("*", (req, res, next) => {
  next(new SystemError(`Route not found: ${req.originalUrl}`, 404));
});

// 03. Error handling middleware
app.use(globalError);

// 04. Unhandled Rejection
process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
  console.error(err?.stack);
});

// Start the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
