const { internalServerStatusCode } = require("../utils/statusCodes");

const errorHandler = (err, req, res, next) => {
  console.error(err);

  if (err.statusCode) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  return res
    .status(internalServerStatusCode)
    .send({ message: "An error occurred on the server" });
};
module.exports = errorHandler;
