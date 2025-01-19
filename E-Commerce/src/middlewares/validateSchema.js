import { SystemError } from "../utils/systemError.js";

export const validateSchema = (schema) => {
  return (req, res, next) => {
    let dataToValidate = {
      body: req.body,
      params: req.params,
      query: req.query,
      file: req.file, // Handle single file upload (.single)
      files: req.files, // Handle multiple file upload (.fields or .array)
    };

    const { value, error } = schema.validate(dataToValidate, {
      abortEarly: false,
      stripUnknown: true // removes unknown fields
    });
    if (error) {
      const errorMessages = error?.details.map((err) => err.message);
      return next(new SystemError(errorMessages, 400));
    }

    // Assign validated values back to their respective properties
    // to use the validated data in the next middleware - modifies/transforms the request object
    Object.assign(req, value);
    next();
  };
};
