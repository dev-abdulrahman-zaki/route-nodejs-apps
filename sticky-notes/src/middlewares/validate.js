import { SystemError } from "../utils/systemError.js";

export const validate = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body, {
      abortEarly: false,
    });
    if (error) {
      const errorMessages = error?.details.map((err) => err.message);
      //   res.status(400).json({ message: errorMessages });
      next(new SystemError(errorMessages, 400));
    }
    next();
  };
};
