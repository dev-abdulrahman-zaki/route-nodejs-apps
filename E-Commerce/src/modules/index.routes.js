import userRoutes from "./user/user.routes.js";
import categoryRoutes from "./category/category.routes.js";
import { checkAuth } from "../middlewares/checkAuth.js";

export const indexRoutes = (app) => {
  app.get("/", (req, res) => res.send("Hello World!"));
  app.use("/api/v1/auth", userRoutes);
  app.use("/api/v1/categories", checkAuth, categoryRoutes);
};
