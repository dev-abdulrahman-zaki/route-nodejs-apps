import userRoutes from "./user/user.routes.js";
import categoryRoutes from "./category/category.routes.js";
import subCategoryRoutes from "./subCategory/subCategory.routes.js";
import brandRoutes from "./brand/brand.routes.js";
import productRoutes from "./product/product.routes.js";
import { checkAuth } from "../middlewares/checkAuth.js";

export const indexRoutes = (app) => {
  app.get("/", (req, res) => res.send("Hello World!"));
  app.use("/api/v1/auth", userRoutes);
  app.use("/api/v1/categories", checkAuth, categoryRoutes);
  app.use("/api/v1/subcategories", checkAuth, subCategoryRoutes);
  app.use("/api/v1/brands", checkAuth, brandRoutes);
  app.use("/api/v1/products", checkAuth, productRoutes);
  app.use("/api/v1/users", checkAuth, userRoutes);
};
