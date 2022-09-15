function createDataResponse(data) {
  const keys = Object.keys(data);

  const result = {};

  keys.forEach((key) => {
    result[key] = data[key];
  });

  return {
    data: result,
  };
}

module.exports = createDataResponse;
