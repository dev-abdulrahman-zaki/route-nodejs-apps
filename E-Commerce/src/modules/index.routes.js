import authRoutes from "./auth/auth.routes.js";
import userRoutes from "./user/user.routes.js";
import categoryRoutes from "./category/category.routes.js";
import subCategoryRoutes from "./subCategory/subCategory.routes.js";
import brandRoutes from "./brand/brand.routes.js";
import productRoutes from "./product/product.routes.js";
import reviewRoutes from "./review/review.routes.js";
import wishlistRoutes from "./wishlist/wishlist.routes.js";
import addressRoutes from "./address/address.routes.js";
import couponRoutes from "./coupon/coupon.routes.js";
import cartRoutes from "./cart/cart.routes.js";
import orderRoutes from "./order/order.routes.js";
import * as Sentry from "@sentry/node";
import { SystemError } from "../utils/systemError.js";
import { globalError } from "../middlewares/error/globalError.middleware.js";

export const indexRoutes = (app) => {
  app.get("/", (req, res) => res.send("Hello World!"));
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/categories", categoryRoutes);
  app.use("/api/v1/subcategories", subCategoryRoutes);
  app.use("/api/v1/brands", brandRoutes);
  app.use("/api/v1/products", productRoutes);
  app.use("/api/v1/users", userRoutes);
  app.use("/api/v1/reviews", reviewRoutes);
  app.use("/api/v1/wishlists", wishlistRoutes);
  app.use("/api/v1/addresses", addressRoutes);
  app.use("/api/v1/coupons", couponRoutes);
  app.use("/api/v1/cart", cartRoutes);
  app.use("/api/v1/orders", orderRoutes);
  // Catch all routes
  app.use("*", (req, res, next) => {
    next(new SystemError(`Route not found: ${req.originalUrl}`, 404));
  });
  // The Sentry error handler must be before any other error middleware and after all controllers
  if (process.env.NODE_ENV === "production") {
    Sentry.setupExpressErrorHandler(app);
  }
  // Error handling middleware
  app.use(globalError);
};
