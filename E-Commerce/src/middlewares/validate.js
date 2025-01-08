import { SystemError } from "../utils/systemError.js";

export const validate = (schema, field) => {
  return (req, res, next) => {
    // Handle multiple file uploads from req.files
    let dataToValidate = {
      ...req.body,
      ...req.params,
      ...req.query,
      ...(field && { [field]: req.file }),
    };

    // Handle files from multer's fields
    if (req.files) {
      // For single files in fields, get the first file
      if (req.files.imageCover) {
        dataToValidate.imageCover = req.files.imageCover[0];
      }
      // For multiple files in fields
      if (req.files.images) {
        dataToValidate.images = req.files.images;
      }
    }

    const { value, error } = schema.validate(dataToValidate, {
      abortEarly: false,
    });
    if (error) {
      const errorMessages = error?.details.map((err) => err.message);
      //   res.status(400).json({ message: errorMessages });
      next(new SystemError(errorMessages, 400));
    }
    req.body = value; // to use the validated data in the next middleware - modifies/transforms the request object
    next();
  };
};
