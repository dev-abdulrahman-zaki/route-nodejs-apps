export class SystemError extends Error {
  constructor(message, statusCode) {
    super(message || "Internal Server Error"); //string
    this.statusCode = statusCode || 500;
  }
}
