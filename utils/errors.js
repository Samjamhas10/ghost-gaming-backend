const NotFoundError = require("./not-found-err");
const BadRequestError = require("./bad-request-err");
const ForbiddenError = require("./forbidden-err");
const ConflictError = require("./conflict-err");
const UnauthorizedError = require("./unauthorized-err");

module.exports = {
  NotFoundError,
  BadRequestError,
  ForbiddenError,
  ConflictError,
  UnauthorizedError,
};
