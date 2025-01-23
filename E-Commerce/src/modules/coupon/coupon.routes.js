import express from "express";
import { validateSchema } from "../../middlewares/validateSchema.js";
import {
  addCouponValidationSchema,
  updateCouponValidationSchema,
  getAllCouponsValidationSchema,
  getSingleCouponValidationSchema,
  deleteCouponValidationSchema,
} from "./coupon.validation.js";
import { checkAuth } from "../../middlewares/checkAuth.js";
import { allowedTo } from "../../middlewares/allowedTo.js";
import {
  addCoupon,
  getAllCoupons,
  getSingleCoupon,
  updateCoupon,
  deleteCoupon,
} from "./coupon.controller.js";

const couponRoutes = express.Router();
couponRoutes.use(checkAuth, allowedTo("admin"));
couponRoutes.post(`/`, validateSchema(addCouponValidationSchema), addCoupon);
couponRoutes.get(
  `/`,
  validateSchema(getAllCouponsValidationSchema),
  getAllCoupons
);
couponRoutes.get(
  `/:code`,
  validateSchema(getSingleCouponValidationSchema),
  getSingleCoupon
);
couponRoutes.put(
  `/:code`,
  validateSchema(updateCouponValidationSchema),
  updateCoupon
);
couponRoutes.delete(
  `/:code`,
  validateSchema(deleteCouponValidationSchema),
  deleteCoupon
);

export default couponRoutes;
