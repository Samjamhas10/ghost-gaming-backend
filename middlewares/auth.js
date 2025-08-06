const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../utils/unauthorized-err");
const { JWT_SECRET } = require("../utils/config");

const auth = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization || !authorization.startsWith("Bearer ")) {
    const error = new UnauthorizedError("Authorization required");
    return next(error);
  }
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    const error = new UnauthorizedError("Authorization required");
    return next(error);
  }
  req.user = payload;
  return next();
};

module.exports = auth;
