import { Category } from "../../../database/models/category.model.js";
import { catchError } from "../../middlewares/catchError.js";
import { SystemError } from "../../utils/systemError.js";
import slugify from "slugify";
import { deleteOne, getAll } from "../../utils/handlers.js";

const addCategory = catchError(async (req, res) => {
  // const category = await Category.create({ ...req.body, createdBy: req.user.id });
  req.body.slug = slugify(req.body.name, { lower: true });
  req.body.createdBy = req.user?.id || "669161111111111111111111";
  req.body.image = req.file.filename;
  const category = new Category(req.body);
  // console.log(`category before save:`, category); // without createdAt field
  await category.save();
  // console.log(`category after save:`, category); // createdAt field is added automatically by mongoose
  res.status(201).json({ message: "success", category });
});

const getAllCategories = getAll(Category);

const getSingleCategory = catchError(async (req, res, next) => {
  const category = await Category.findOne({ slug: req.params.slug }).populate(
    "createdBy",
    "-password -email -confirmEmail -createdAt"
  );
  if (!category) {
    return next(new SystemError("Category not found", 404));
  }
  res.status(200).json({ message: "success", category });
});

const updateCategory = catchError(async (req, res, next) => {
  if (req.body.name) req.body.slug = slugify(req.body.name, { lower: true });
  if (req.file) req.body.image = req.file.filename;
  const category = await Category.findOneAndUpdate({ slug: req.params.slug }, req.body, {
    new: true,
  });
  if (!category) {
    return next(new SystemError("Category not found", 404));
  }
  res.status(200).json({ message: "success", category });
});

const deleteCategory = deleteOne(Category);

export { addCategory, getAllCategories, getSingleCategory, updateCategory, deleteCategory };
