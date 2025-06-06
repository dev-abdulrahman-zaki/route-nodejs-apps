- Don't forget .js when import files "xxx.js".
<!-- ====================================================================== -->
- Validation Schema Boilerplate: 
body: Joi.object().default({}),
params: Joi.object().default({}),
query: Joi.object().default({}),
file: Joi.object().default({}),
files: Joi.object().default({}),
<!-- ====================================================================== -->
## 3-database implementation
1- Add createdBy in all models.

CreatedBy > userId is took by token, not send in JSON body
from checkAuth Middleware
<!-- ====================================================================== -->
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
    ?price=150 // Simple queries
    ?price[gt]=100
    ?price[gt]=100&stock=200
    ?price[gt]=100&price[lt]=200 // Multiple operators
    ?price[lt]=200
    ?createdAt[lt]=2024-01-15
    ?price[gte]=100
    ?price[lte]=200
    ?price[in]=100,200,300
    ?category[in]=["id1","id2"]
    ?price[nin]=100,200,300
    ?price[exists]=true
    ?price[regex]=^[0-9]+$
    ?brand[regex]=apple
    ?price[eq]=100
    ?price[ne]=100

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
- What should be stored in schema (Database), and what should be stored in validation schema (Joi)?
ref: https://poe.com/s/RItpDrn7a0ADzzEvhXV3
<!-- ====================================================================== -->
## 21-virtual populate
1- Virtual populate is a technique used in MongoDB to populate a field with data from another collection.
2- It allows you to create a virtual field in a document that references another document in a different collection.
3- This virtual field can then be used in queries and updates, even though it doesn't physically exist in the database.
4- Virtual populate is useful when you want to create a relationship between two collections without actually storing the referenced data in the current collection.
5- It can be used to create a one-to-one, one-to-many, or many-to-many relationship between collections.
6- Virtual populate is implemented using the populate method in Mongoose.
7- The populate method takes a path and a reference to the collection to populate from.
8- The path is the name of the virtual field to create, and the reference is the name of the collection to populate from.
9- The populate method returns a promise that resolves to the populated document.
<!-- ====================================================================== -->
## 19-create checkout session
https://dashboard.stripe.com/test/apikeys
https://dashboard.stripe.com/test/workbench/webhooks/create
https://www.npmjs.com/package/stripe
https://docs.stripe.com/checkout/quickstart
<!-- ====================================================================== -->
