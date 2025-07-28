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
  try {
    const payload = jwt.verify(token, JWT_SECRET);
    req.user = payload;
    next();
  } catch (err) {
    const error = new UnauthorizedError("Authorization required");
    return next(error);
  }
};

module.exports = auth;
