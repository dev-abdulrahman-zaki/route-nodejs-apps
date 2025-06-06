import express from "express";
import { validateSchema } from "../../middlewares/validateSchema.middleware.js";
import {
  addCouponValidationSchema,
  updateCouponValidationSchema,
  getAllCouponsValidationSchema,
  getSingleCouponValidationSchema,
  deleteCouponValidationSchema,
} from "./coupon.validation.js";
import { authenticate } from "../../middlewares/auth/authenticate.middleware.js";
import { authorize } from "../../middlewares/auth/authorize.middleware.js";
import {
  addCoupon,
  getAllCoupons,
  getSingleCoupon,
  updateCoupon,
  deleteCoupon,
} from "./coupon.controller.js";

const couponRoutes = express.Router();
couponRoutes.use(authenticate, authorize("admin"));
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
