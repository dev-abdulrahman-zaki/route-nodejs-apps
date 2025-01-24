import jwt from "jsonwebtoken";
import { SystemError } from "../utils/systemError.js";
import { User } from "../../database/models/user.model.js";

// check auth / verify token
export const checkAuth = async (req, res, next) => {
  let decodedToken;
  // 01- get token from headers
  const authHeader = req.headers.authorization || req.headers.Authorization;
  const token = authHeader?.split(" ")[1] || null;
  // 02- check if token exists
  if (!token) {
    return next(new SystemError("No token provided", 401));
  }
  // 03- verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return next(new SystemError("Invalid token: " + err, 401));
    decodedToken = decoded;
  });
  // 04- check if user exists by id
  const user = await User.findById(decodedToken.id);
  if (!user) return next(new SystemError("User not found", 401));
  // 05- check if token is valid by comparing token iat (issued at) after last password change (updatedAt or passwordChangedAt) or last logout time (lastLoginAt)
  if (
    (user?.passwordChangedAt &&
      user?.passwordChangedAt?.getTime() / 1000 > decodedToken.iat) ||
    (user?.lastLoginAt &&
      user?.lastLoginAt?.getTime() / 1000 > decodedToken.iat) ||
    (user?.updatedAt && user?.updatedAt?.getTime() / 1000 > decodedToken.iat)
  ) {
    return next(new SystemError("Token expired", 401));
  }
  // 06- add the decoded user to the request object (modify the request object in middleware) - modifies/transforms the request object
  req.user = decodedToken;
  // console.log(req.user);
  return next();
};
