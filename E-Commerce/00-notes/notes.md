## 18-mergParams
1- Parent Route: category.routes.js
categoryRoutes.use("/:categorySlug/subcategories", subCategoryRoutes);
2- Child Route: subCategory.routes.js
const subCategoryRoutes = express.Router({ mergeParams: true });
3- Child Controller: subCategory.controller.js
getAllSubCategories
<!-- ====================================================================== -->
