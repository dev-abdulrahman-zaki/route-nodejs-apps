import { Product } from "../../../database/models/product.model.js";
import { Category } from "../../../database/models/category.model.js";
import { SubCategory } from "../../../database/models/subCategory.model.js";
import { Brand } from "../../../database/models/brand.model.js";
import { catchError } from "../../middlewares/catchError.js";
import { SystemError } from "../../utils/systemError.js";
import slugify from "slugify";

const addProduct = catchError(async (req, res, next) => {
  const isCategoryExist = await Category.findById(req.body.category);
  if (!isCategoryExist) {
    return next(new SystemError("Category not found", 404));
  }
  const isSubCategoryExist = await SubCategory.findById(req.body.subcategory);
  if (!isSubCategoryExist) {
    return next(new SystemError("SubCategory not found", 404));
  }
  const isBrandExist = await Brand.findById(req.body.brand);
  if (!isBrandExist) {
    return next(new SystemError("Brand not found", 404));
  }
  req.body.slug = slugify(req.body.name, { lower: true });
  req.body.createdBy = req.user?.id || "669161111111111111111111";
  req.body.imageCover = req.files.imageCover[0].filename;
  req.body.images = req.files.images.map((file) => file.filename);
  // req.body.priceAfterDiscount = req.body.price - (req.body.price * req.body.discount / 100);
  req.body.ratingsAverage = 0;
  req.body.ratingsQuantity = 0;
  req.body.sold = 0;
  req.body.stock = req.body.stock || 0;
  const product = new Product(req.body);
  await product.save();
  res.status(201).json({ message: "success", product });
});

const getAllProducts = catchError(async (req, res, next) => {
  const products = await Product.find().populate(
    "createdBy",
    "-password -email -confirmEmail -createdAt"
  ); // or : const notes = await Note.find().populate("user", { password: 0 });
  if (!products) {
    return next(new SystemError("Products not found", 404));
  }
  res.status(200).json({ message: "success", products });
});

const getSingleProduct = catchError(async (req, res, next) => {
  const product = await Product.findOne({ slug: req.params.slug }).populate(
    "createdBy",
    "-password -email -confirmEmail -createdAt"
  );
  if (!product) {
    return next(new SystemError("Product not found", 404));
  }
  res.status(200).json({ message: "success", product });
});

const updateProduct = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name, { lower: true });
  if (req.files.imageCover) req.body.imageCover = req.files.imageCover[0].filename;
  if (req.files.images) req.body.images = req.files.images.map((file) => file.filename);
  const product = await Product.findOneAndUpdate({ slug: req.params.slug }, req.body, {
    new: true,
  });
  if (!product) {
    return next(new SystemError("Product not found", 404));
  }
  res.status(200).json({ message: "success", product });
});

const deleteProduct = catchError(async (req, res, next) => {
  const product = await Product.findOneAndDelete({ slug: req.params.slug });
  if (!product) {
    return next(new SystemError("Product not found", 404));
  }
  res.status(200).json({ message: "success", product });
});

export { addProduct, getAllProducts, getSingleProduct, updateProduct, deleteProduct };
