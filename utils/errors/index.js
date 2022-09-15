const { StatusCodes, getReasonPhrase } = require("http-status-codes");
const errorConfig = require("../../configs/errorConfig.json");

class GeneralError extends Error {
  constructor(message, notifiable = true) {
    super();

    this.privateMessage = message;

    if (!notifiable) {
      this.message = errorConfig.DEFAULT_SERVER_ERROR_MESSAGE;
    } else {
      this.message =
        message ||
        (this instanceof ServerError
          ? errorConfig.DEFAULT_SERVER_ERROR_MESSAGE
          : this instanceof BadRequestError
          ? errorConfig.DEFAULT_BAD_REQUEST_ERROR_MESSAGE
          : this instanceof NotFoundError
          ? errorConfig.DEFAULT_NOT_FOUND_ERROR_MESSAGE
          : this instanceof ConflictError
          ? errorConfig.DEFAULT_CONFLICT_ERROR_MESSAGE
          : this instanceof UnauthorizedError
          ? errorConfig.DEFAULT_UNAUTHORIZED_ERROR_MESSAGE
          : this instanceof ForbiddenError
          ? errorConfig.DEFAULT_FORBIDDEN_ERROR_MESSAGE
          : errorConfig.DEFAULT_UNKNOWN_ERROR_MESSAGE);
    }

    this.notifiable = notifiable;

    this.statusText =
      this instanceof ServerError
        ? getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR)
        : this instanceof BadRequestError
        ? getReasonPhrase(StatusCodes.BAD_REQUEST)
        : this instanceof NotFoundError
        ? getReasonPhrase(StatusCodes.NOT_FOUND)
        : this instanceof ConflictError
        ? getReasonPhrase(StatusCodes.CONFLICT)
        : this instanceof UnauthorizedError
        ? getReasonPhrase(StatusCodes.UNAUTHORIZED)
        : this instanceof ForbiddenError
        ? getReasonPhrase(StatusCodes.FORBIDDEN)
        : getReasonPhrase(StatusCodes.INTERNAL_SERVER_ERROR);

    this.statusCode =
      this instanceof ServerError
        ? StatusCodes.INTERNAL_SERVER_ERROR
        : this instanceof BadRequestError
        ? StatusCodes.BAD_REQUEST
        : this instanceof NotFoundError
        ? StatusCodes.NOT_FOUND
        : this instanceof ConflictError
        ? StatusCodes.CONFLICT
        : this instanceof UnauthorizedError
        ? StatusCodes.UNAUTHORIZED
        : this instanceof ForbiddenError
        ? StatusCodes.FORBIDDEN
        : StatusCodes.INTERNAL_SERVER_ERROR;

    this.code =
      this instanceof ServerError
        ? "E1"
        : this instanceof BadRequestError
        ? "E2"
        : this instanceof NotFoundError
        ? "E3"
        : this instanceof ConflictError
        ? "E4"
        : this instanceof UnauthorizedError
        ? "E5"
        : this instanceof ForbiddenError
        ? "E6"
        : "E0";
  }

  isNotifiable() {
    return this.notifiable;
  }

  getStatusCode() {
    return this.statusCode;
  }

  getStatusText() {
    return this.statusText;
  }

  getCode() {
    return this.code;
  }

  getMessage() {
    return this.message;
  }

  getPrivateMessage() {
    return this.privateMessage;
  }
}

class ServerError extends GeneralError {}
class BadRequestError extends GeneralError {}
class NotFoundError extends GeneralError {}
class UnauthorizedError extends GeneralError {}
class ForbiddenError extends GeneralError {}
class ConflictError extends GeneralError {}
class UnknownError extends GeneralError {}

module.exports = {
  GeneralError,
  UnknownError,
  ServerError,
  BadRequestError,
  NotFoundError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError,
};
