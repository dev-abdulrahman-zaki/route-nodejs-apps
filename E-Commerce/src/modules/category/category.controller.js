import { Category } from "../../../database/models/category.model.js";
import { catchError } from "../../middlewares/catchError.js";
import { SystemError } from "../../utils/systemError.js";
import slugify from "slugify";

const addCategory = catchError(async (req, res) => {
  // const category = await Category.create({ ...req.body, createdBy: req.user.id });
  req.body.slug = slugify(req.body.name, { lower: true });
  req.body.createdBy = req.user.id;
  const category = new Category(req.body);
  // console.log(`category before save:`, category); // without createdAt field
  await category.save();
  // console.log(`category after save:`, category); // createdAt field is added automatically by mongoose
  res.status(201).json({ message: "success", category });
});

const getAllCategories = catchError(async (req, res) => {
  const categories = await Category.find().populate(
    "createdBy",
    "-password -email -confirmEmail -createdAt"
  ); // or : const notes = await Note.find().populate("user", { password: 0 });
  res.status(200).json({ message: "success", categories });
});

const getSingleCategory = catchError(async (req, res) => {
  const category = await Category.findOne({ slug: req.params.slug }).populate(
    "createdBy",
    "-password -email -confirmEmail -createdAt"
  );
  res.status(200).json({ message: "success", category });
});

const updateCategory = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.name, { lower: true });
  const category = await Category.findOneAndUpdate({ slug: req.params.slug }, req.body, {
    new: true,
  });
  res.status(200).json({ message: "success", category });
});

const deleteCategory = catchError(async (req, res, next) => {
  const category = await Category.findOneAndDelete({ slug: req.params.slug });
  if (!category) {
    return next(new SystemError("Category not found", 404));
  }
  res.status(200).json({ message: "success", category });
});

export { addCategory, getAllCategories, getSingleCategory, updateCategory, deleteCategory };
