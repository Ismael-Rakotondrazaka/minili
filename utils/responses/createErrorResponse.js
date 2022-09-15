function createErrorResponse(error) {
  return {
    error: {
      isNotifiable: error.isNotifiable(),
      message: error.getMessage(),
      status: error.getStatusCode(),
      statusText: error.getStatusText(),
      code: error.getCode(),
      createdAt: new Date(),
    },
  };
}

module.exports = createErrorResponse;
