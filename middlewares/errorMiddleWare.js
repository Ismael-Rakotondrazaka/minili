const { GeneralError, UnknownError } = require("../utils/errors");
const { createErrorResponse } = require("../utils/responses");

const errorMiddleware = function (err, req, res, next) {
  if (err) {
    console.log(err);
    if (err instanceof GeneralError) {
      return res.status(err.getStatusCode()).json(createErrorResponse(err));
    } else {
      const serverError = new UnknownError();
      return res
        .status(serverError.getStatusCode())
        .json(createErrorResponse(serverError));
    }
  }
  next();
};

module.exports = errorMiddleware;
