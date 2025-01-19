import { SystemError } from "../utils/systemError.js";

export const validateSchema = (schema, field) => {
  return (req, res, next) => {
    // Handle multiple file uploads from req.files
    let dataToValidate = {
      body: req.body,
      params: req.params,
      query: req.query,
      ...(field && { [field]: req.file }),
    };

    // Handle multiple files from multer's fields
    if (req.files) {
      // For single files in fields, get the first file
      if (req.files.imageCover) {
        dataToValidate.body.imageCover = req.files.imageCover[0];
      }
      // For multiple files in fields
      if (req.files.images) {
        dataToValidate.body.images = req.files.images;
      }
    }

    const { value, error } = schema.validate(dataToValidate, {
      abortEarly: false,
    });
    if (error) {
      const errorMessages = error?.details.map((err) => err.message);
      //   res.status(400).json({ message: errorMessages });
      return next(new SystemError(errorMessages, 400));
    }

    // Assign validated values back to their respective properties
    req.body = value.body; // to use the validated data in the next middleware - modifies/transforms the request object
    req.params = value.params;
    req.query = value.query;
    next();
  };
};
