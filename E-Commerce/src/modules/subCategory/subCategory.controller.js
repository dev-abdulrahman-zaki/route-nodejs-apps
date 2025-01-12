import { SubCategory } from "../../../database/models/subCategory.model.js";
import { Category } from "../../../database/models/category.model.js";
import { catchError } from "../../middlewares/catchError.js";
import { SystemError } from "../../utils/systemError.js";
import slugify from "slugify";
import { deleteOne, getAll } from "../../utils/handlers.js";

const addSubCategory = catchError(async (req, res, next) => {
  const isCategoryExist = await Category.findById(req.body.category);
  if (!isCategoryExist) {
    return next(new SystemError("Category not found", 404));
  }
  req.body.slug = slugify(req.body.name, { lower: true });
  req.body.createdBy = req.user?.id || "677eb89034823e94b28151bf";
  const subCategory = new SubCategory(req.body);
  await subCategory.save();
  res.status(201).json({ message: "success", subCategory });
});

const getAllSubCategories = catchError(async (req, res, next) => {
  const filterObj = {};
  if (req.params.categorySlug) filterObj.category = req.params.categorySlug;
  return getAll(SubCategory, ["name", "description"], filterObj)(req, res, next); //getAll returns a middleware function that needs to be called with (req, res, next)
});

const getSingleSubCategory = catchError(async (req, res, next) => {
  const subCategory = await SubCategory.findOne({
    slug: req.params.slug,
  }).populate("createdBy", "-password -email -confirmEmail -createdAt");
  if (!subCategory) {
    return next(new SystemError("SubCategory not found", 404));
  }
  res.status(200).json({ message: "success", subCategory });
});

const updateSubCategory = catchError(async (req, res, next) => {
  req.body.slug = slugify(req.body.name, { lower: true });
  const subCategory = await SubCategory.findOneAndUpdate(
    { slug: req.params.slug },
    req.body,
    {
      new: true,
    }
  );
  if (!subCategory) {
    return next(new SystemError("SubCategory not found", 404));
  }
  res.status(200).json({ message: "success", subCategory });
});

const deleteSubCategory = deleteOne(SubCategory);

export {
  addSubCategory,
  getAllSubCategories,
  getSingleSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
