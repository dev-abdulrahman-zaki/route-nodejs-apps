import { SystemError } from "../utils/systemError.js";

export const validate = (schema, field) => {
  return (req, res, next) => {
    const { value, error } = schema.validate(
      {
        ...req.body,
        ...req.params,
        ...req.query,
        ...(field && { [field]: req.file }),
      },
      {
        abortEarly: false,
      }
    );
    if (error) {
      const errorMessages = error?.details.map((err) => err.message);
      //   res.status(400).json({ message: errorMessages });
      next(new SystemError(errorMessages, 400));
    }
    req.body = value; // to use the validated data in the next middleware - modifies/transforms the request object
    next();
  };
};
