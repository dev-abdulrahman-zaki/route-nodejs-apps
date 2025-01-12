const handleValidValue = (queryValue, helpers, validValues) => {
  if (!queryValue) return "";
  const values = queryValue.split(",");
  const isValid = values.every((value) => {
    const valueWithoutMinus = value.startsWith("-")
      ? value.substring(1)
      : value;
    return validValues.includes(valueWithoutMinus);
  });

  if (!isValid) {
    return helpers.error("any.invalid");
  }

  return queryValue;
};

export default handleValidValue;
