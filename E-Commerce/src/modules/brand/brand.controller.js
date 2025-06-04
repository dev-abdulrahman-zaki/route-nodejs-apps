import { Brand } from "../../database/models/brand.model.js";
import { catchError } from "../../middlewares/catchError.js";
import { SystemError } from "../../utils/systemError.js";
import slugify from "slugify";
import { deleteOne, getAll } from "../../utils/factoryHandlers.js";

const addBrand = catchError(async (req, res) => {
  req.body.slug = slugify(req.body.name, { lower: true });
  req.body.createdBy = req.user?.id;
  req.body.logo = req.file.filename;
  const brand = new Brand(req.body);
  await brand.save();
  res.status(201).json({ message: "success", brand });
});

const getAllBrands = getAll(Brand, ["name"]);

const getSingleBrand = catchError(async (req, res, next) => {
  const brand = await Brand.findOne({ slug: req.params.slug }).populate(
    "createdBy",
    "-password -email -confirmEmail -createdAt"
  );
  if (!brand) {
    return next(new SystemError("Brand not found", 404));
  }
  res.status(200).json({ message: "success", brand });
});

const updateBrand = catchError(async (req, res, next) => {
  if (req.body.name) req.body.slug = slugify(req.body.name, { lower: true });
  if (req.file) req.body.logo = req.file.filename;
  const brand = await Brand.findOneAndUpdate({ slug: req.params.slug }, req.body, {
    new: true,
  });
  if (!brand) {
    return next(new SystemError("Brand not found", 404));
  }
  res.status(200).json({ message: "success", brand });
});

const deleteBrand = deleteOne(Brand);

export { addBrand, getAllBrands, getSingleBrand, updateBrand, deleteBrand };
