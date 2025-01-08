import jwt from "jsonwebtoken";
import { SystemError } from "../utils/systemError.js";

// check auth / verify token
export const checkAuth = (req, res, next) => {
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader?.split(" ")[1] || null;
  if (!token) {
    // return res.status(401).json({ message: "No token provided" });
    return next(new SystemError("No token provided", 401));
  }
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next(new SystemError("Invalid token", 401));
    // add the decoded user to the request object (modify the request object in middleware) - modifies/transforms the request object
    req.user = decoded;
    return next();
  });
};
