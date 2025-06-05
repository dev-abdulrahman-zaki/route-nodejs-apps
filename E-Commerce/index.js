// 00. Uncaught Exception - catches synchronous errors
process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception =>", err);
  console.error(err?.stack);
  if (process.env.NODE_ENV === "production") {
    Sentry.captureException(err);
  }
});

// 01. Import Sentry first for proper instrumentation
import "./instrument.js";
import "dotenv/config";

// 02. Import other modules
import express from "express";
import * as Sentry from "@sentry/node";
import cors from "cors";
import { dbConnection } from "./src/database/dbConnection.js"; // Import the dbConnection to connect to MongoDB even if the dbConnection import is not used in the code.
import { indexRoutes } from "./src/modules/index.routes.js";
import { SystemError } from "./src/utils/systemError.js";
import { globalError } from "./src/middlewares/globalError.js";

// 03. Creating the express app
const app = express();
const port = 4000;

// 04. Middleware
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // this means that when we go to http://localhost:4000/uploads/photo.jpg, it will serve the photo.jpg file from the uploads folder.
/*
app.use(
"/uploads",                          => route name
express.static("uploads")            => folder name
);

So, it connects/anchors the route name to the folder name.
*/

// 05. Define the base path
indexRoutes(app);

// 06. Catch all routes
app.use("*", (req, res, next) => {
  next(new SystemError(`Route not found: ${req.originalUrl}`, 404));
});

// 07. The Sentry error handler must be before any other error middleware and after all controllers
if (process.env.NODE_ENV === "production") {
  Sentry.setupExpressErrorHandler(app);
}

// 08. Error handling middleware
app.use(globalError);

// 09. Unhandled Rejection - catches async errors
process.on("unhandledRejection", (err, promise) => {
  // console.error("Unhandled Rejection at:", promise, "error:", err);
  console.error("Unhandled Rejection =>", err?.stack);
  if (process.env.NODE_ENV === "production") {
    Sentry.captureException(err);
  }
});

// 10. Start the server
app.listen(port, () => console.log(`Example app listening on port ${port}!`));
