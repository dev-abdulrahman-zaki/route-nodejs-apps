export class SystemError extends Error {
  constructor(message, statusCode) {
    super(Array.isArray(message) ? message.join(', ') : message || "Internal Server Error"); //string
    this.statusCode = statusCode || 500;
  }
}
