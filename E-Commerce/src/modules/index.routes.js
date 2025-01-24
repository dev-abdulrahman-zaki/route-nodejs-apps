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
// todo: maybe remove checkAuth from here
import { checkAuth } from "../middlewares/checkAuth.js";

export const indexRoutes = (app) => {
  app.get("/", (req, res) => res.send("Hello World!"));
  app.use("/api/v1/auth", authRoutes);
  app.use("/api/v1/categories", checkAuth, categoryRoutes);
  app.use("/api/v1/subcategories", checkAuth, subCategoryRoutes);
  app.use("/api/v1/brands", checkAuth, brandRoutes);
  app.use("/api/v1/products", checkAuth, productRoutes);
  app.use("/api/v1/users", checkAuth, userRoutes);
  app.use("/api/v1/reviews", checkAuth, reviewRoutes);
  app.use("/api/v1/wishlists", checkAuth, wishlistRoutes);
  app.use("/api/v1/addresses", checkAuth, addressRoutes);
  app.use("/api/v1/coupons", checkAuth, couponRoutes);
};
