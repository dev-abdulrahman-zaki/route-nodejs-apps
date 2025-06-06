import { Coupon } from "../../database/models/coupon.model.js";
import { catchError } from "../../middlewares/error/catchError.middleware.js";
import { SystemError } from "../../utils/systemError.js";
import { deleteOne, getAll } from "../../utils/factoryHandlers.js";
import QRCode from "qrcode";

const addCoupon = catchError(async (req, res, next) => {
  const isCouponExists = await Coupon.findOne({ code: req.body.code });
  if (isCouponExists) {
    return next(new SystemError("Coupon already exists", 400));
  }
  const coupon = new Coupon(req.body);
  await coupon.save();
  res.status(201).json({ message: "success", coupon });
});

const getAllCoupons = getAll(Coupon, ["code", "expiresAt", "discount"]);

const getSingleCoupon = catchError(async (req, res, next) => {
  const coupon = await Coupon.findOne({ code: req.params.code });
  if (!coupon) {
    return next(new SystemError("Coupon not found", 404));
  }
  const qrcode = await QRCode.toDataURL(coupon.code);
  res.status(200).json({ message: "success", coupon, qrcode });
});

const updateCoupon = catchError(async (req, res, next) => {
  const coupon = await Coupon.findOneAndUpdate(
    { code: req.params.code },
    req.body,
    {
      new: true,
    }
  );
  if (!coupon) {
    return next(new SystemError("Coupon not found", 404));
  }
  res.status(200).json({ message: "success", coupon });
});

const deleteCoupon = deleteOne(Coupon);

export {
  addCoupon,
  getAllCoupons,
  getSingleCoupon,
  updateCoupon,
  deleteCoupon,
};
