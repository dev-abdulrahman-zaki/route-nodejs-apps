import Joi from "joi";

const addProductValidationSchema = Joi.object({
  name: Joi.string().required().trim().min(3),
  description: Joi.string().required().trim().min(10).max(2000),
  imageCover: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png", "image/jpg")
      .required(),
    encoding: Joi.string().required(),
    size: Joi.number().max(1000000).required(),
    path: Joi.string().required(),
  }).required(),
  images: Joi.array()
    .items(
      Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        mimetype: Joi.string()
          .valid("image/jpeg", "image/png", "image/jpg")
          .required(),
        encoding: Joi.string().required(),
        size: Joi.number().max(1000000).required(),
        path: Joi.string().required(),
      })
    ).min(1).required(),
  price: Joi.number().required().min(0),
  priceAfterDiscount: Joi.number().required().min(0),
  stock: Joi.number().required().min(0),
  category: Joi.string().hex().length(24).required(),
  brand: Joi.string().hex().length(24).required(),
  subcategory: Joi.string().hex().length(24).required(),
  ratingsAverage: Joi.number().min(0).max(5),
  ratingsQuantity: Joi.number().min(0),
});

const updateProductValidationSchema = Joi.object({
  name: Joi.string().trim().min(3),
  description: Joi.string().trim().min(10).max(2000),
  imageCover: Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    destination: Joi.string().required(),
    filename: Joi.string().required(),
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png", "image/jpg")
      .required(),
    encoding: Joi.string().required(),
    size: Joi.number().max(1000000).required(),
    path: Joi.string().required(),
  }),
  images: Joi.array().items(
    Joi.object({
      fieldname: Joi.string().required(),
      originalname: Joi.string().required(),
      destination: Joi.string().required(),
      filename: Joi.string().required(),
      mimetype: Joi.string()
        .valid("image/jpeg", "image/png", "image/jpg")
        .required(),
      encoding: Joi.string().required(),
      size: Joi.number().max(1000000).required(),
      path: Joi.string().required(),
    })
  ).min(1),
  price: Joi.number().min(0),
  priceAfterDiscount: Joi.number().min(0),
  stock: Joi.number().min(0),
  category: Joi.string().hex().length(24),
  brand: Joi.string().hex().length(24),
  subcategory: Joi.string().hex().length(24),
  ratingsAverage: Joi.number().min(0).max(5),
  ratingsQuantity: Joi.number().min(0),
});

export { addProductValidationSchema, updateProductValidationSchema };
