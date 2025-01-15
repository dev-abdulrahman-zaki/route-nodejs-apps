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

export default handleValidValue;
