import { SystemError } from "../utils/systemError.js";

// MongoDB duplicate key error handling
const handleDuplicateKeyError = (err) => {
  const field = Object.keys(err.keyValue)[0];
  return new SystemError(`${field} already exists`, 400);
};

// MongoDB validation error handling
const handleValidationError = (err) => {
  const errors = Object.values(err.errors).map((el) => el.message);
  return new SystemError(`Invalid input: ${errors.join(". ")}`, 400);
};

export const globalError = (err, req, res, next) => {
  if (err.name === "MongoServerError" && err.code === 11000) {
    err = handleDuplicateKeyError(err);
  }
  if (err.name === "ValidationError") {
    err = handleValidationError(err);
  }
  //   console.error(err);
  console.error(err.stack);
  res.status(err.statusCode || 500).json({
    message: err.message || "Internal Server Error",
    statusCode: err.statusCode || 500,
    // Display stack in development mode
    stack: process.env.NODE_ENV === "development" ? err.stack : null,
  });
};
