import jwt from "jsonwebtoken";
import { SystemError } from "../utils/systemError.js";

// check auth / verify token
export const checkAuth = async (req, res, next) => {
  // 01- get token from headers
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader?.split(" ")[1] || null;
  // 02- check if token exists
  if (!token) {
    return next(new SystemError("No token provided", 401));
  }
  // 03- verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next(new SystemError("Invalid token", 401));
    // 04- add the decoded user to the request object (modify the request object in middleware) - modifies/transforms the request object
    req.user = decoded;
    return next();
  });
  // 04- check if user exists by id
  const user = await User.findById(req.user.id);
  if (!user) return next(new SystemError("User not found", 401));
  // 05- check if token is valid by comparing token iat (issued at) after last password change (updatedAt or passwordChangedAt) or last logout time (lastLoginAt)
  if (
    user.passwordChangedAt > req.user.iat ||
    user.lastLoginAt > req.user.iat
  ) {
    return next(new SystemError("Token expired", 401));
  }
};
