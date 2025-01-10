## 18-mergParams
1- Parent Route: category.routes.js
categoryRoutes.use("/:categorySlug/subcategories", subCategoryRoutes);
2- Child Route: subCategory.routes.js
const subCategoryRoutes = express.Router({ mergeParams: true });
3- Child Controller: subCategory.controller.js
getAllSubCategories
<!-- ====================================================================== -->
## 20-intro to api feature
1- Pagination.
    ?page=1
    ?page=1&limit=10

- Equation: Page 1 = Skip 0, Limit 10. "3 Variables - 2 Known, So, Calculate the 3rd."
- Known Variables: Page (from query params), Limit (from query params or default value).
- Calculate: Skip = (Page - 1) * Limit.

2- Filter.
    ?price=150
    ?price[gt]=100
    ?price[gt]=100&stock=200
    ?price[gt]=100&price[lt]=200
    ?price[lt]=200
    ?price[gte]=100
    ?price[lte]=200
    ?price[in]=100,200,300
    ?price[nin]=100,200,300
    ?price[exists]=true
    ?price[regex]=^[0-9]+$
    ?price[eq]=100
    ?price[ne]=100
    ?price[size]=10
    ?price[page]=1
    ?price[sort]=asc
    ?price[sort]=desc
    ?price[sort]=asc,desc
    <!-- ?price[sort]=price,name -->
3- Sort.
    ?sort=price
    ?sort=-price
    ?sort=price,name
    ?sort=-price,name
4- Select fields.
    ?fields=title
    ?fields=price,name
    ?fields=-price,name
    ?fields=price,name,-description
5- Search.
    ?search=title
    ?search=title,description
    ?search=title,description,price
    ?search=title,description,price,name
    ?search=title,description,price,name,category
<!-- ====================================================================== -->

