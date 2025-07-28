const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../utils/unauthorized-err");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    const error = new UnauthorizedError("Authorization required");
    return next(error);
  }
  const token = authorization.replace("Bearer ", "");
  const payload = jwt.verify(token, "super_secret");

};

module.exports = auth;
