import Joi from "joi";

const handleValidValue = (queryValue, helpers, validValues) => {
  if (!queryValue) return undefined; // Return undefined if queryValue is empty to trigger default value
  // Split queryValue into an array of values
  const values = queryValue.split(",");
  // Check that every value of queryValue is valid
  const isValid = values.every((value) => {
    const valueWithoutMinus = value.startsWith("-")
      ? value.substring(1)
      : value;
    return validValues.includes(valueWithoutMinus);
  });

  if (!isValid) {
    return helpers.error("any.invalid"); // Validation fails
  }

  return queryValue; // Validation passes, original value is used
};

const createNumberFilterSchema = () =>
  Joi.alternatives()
    .try(
      Joi.number(), // ✓ price=100
      Joi.object({
        gt: Joi.number(), // ✓ price[gt]=100 - // { price: { gt: '100' } }
        gte: Joi.number(), // ✓ price[gte]=100
        lt: Joi.number(), // ✓ price[lt]=200
        lte: Joi.number(), // ✓ price[lte]=200
        eq: Joi.number(), // ✓ price[eq]=100
        ne: Joi.number(), // ✓ price[ne]=100
        in: Joi.array().items(Joi.number()).single(), // ✓ price[in]=100,200,300
        nin: Joi.array().items(Joi.number()).single(), // ✓ price[nin]=100,200,300
        exists: Joi.boolean(), // ✓ price[exists]=true
        regex: Joi.string(), // ✓ price[regex]=^[0-9]+$
      }).min(1) //  object must have at least 1 property defined. It prevents empty objects from being valid.
    )
    .options({ convert: true });

const createStringFilterSchema = () =>
  Joi.alternatives().try(
    Joi.string(), // ✓ brand=apple
    Joi.object({
      eq: Joi.string(), // ✓ brand[eq]=apple
      ne: Joi.string(), // ✓ brand[ne]=apple
      in: Joi.alternatives().try(
        Joi.array().items(Joi.string()), // ✓ category[in]=["id1","id2"] (array format)
        Joi.string() // ✓ category[in]=id1,id2 (comma-separated string format)
      ),
      nin: Joi.alternatives().try(
        Joi.array().items(Joi.string()),
        Joi.string()
      ),
      regex: Joi.string(), // ✓ brand[regex]=apple
      exists: Joi.boolean(), // ✓ brand[exists]=true
    }).min(1)
  );

const createDateFilterSchema = () =>
  Joi.alternatives().try(
    Joi.date(),
    Joi.object({
      gt: Joi.date(), // ✓ createdAt[gt]=2024-01-15
      gte: Joi.date(), // ✓ createdAt[gte]=2024-01-15
      lt: Joi.date(), // ✓ createdAt[lt]=2024-01-15
      lte: Joi.date(), // ✓ createdAt[lte]=2024-01-15
      eq: Joi.date(), // ✓ createdAt[eq]=2024-01-15
      ne: Joi.date(), // ✓ createdAt[ne]=2024-01-15
      exists: Joi.boolean(), // ✓ createdAt[exists]=true
    }).min(1)
  );

export {
  handleValidValue,
  createNumberFilterSchema,
  createStringFilterSchema,
  createDateFilterSchema,
};
