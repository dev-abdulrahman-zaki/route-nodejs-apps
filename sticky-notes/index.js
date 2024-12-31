import express from "express";
import dotenv from "dotenv";
dotenv.config();
import { dbConnection } from "./database/dbConnection.js"; // Import the dbConnection to connect to MongoDB even if the dbConnection import is not used in the code.
import userRoutes from "./src/modules/user/user.routes.js";
import noteRoutes from "./src/modules/note/note.routes.js";
import { checkAuth } from "./src/middlewares/checkAuth.js";
const app = express();
const port = 4000;

// 00. Middleware
app.use(express.json());

// 01. Define the base path
app.use("/auth", userRoutes);
app.use("/notes", checkAuth, noteRoutes);

// 02. Catch all routes
app.use("*", (req, res, next) => {
  // res.status(404).json({ message: `Route not found: ${req.originalUrl}` });
  next(
    new Error(
      `Route not found: ${req.originalUrl}`
      // ,{cause}
    )
  );
});

// 03. Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: "Internal server error" });
});

// Start the server
app.get("/", (req, res) => res.send("Hello World!"));
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
