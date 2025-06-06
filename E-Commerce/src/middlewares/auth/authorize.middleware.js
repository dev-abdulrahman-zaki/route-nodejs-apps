import { SystemError } from "../../utils/systemError.js";

export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new SystemError("You are not allowed to do this action", 403)
      );
    }
    return next();
  };
};
