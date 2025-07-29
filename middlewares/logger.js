// import modules
const winston = require("winston");
const expressWinston = require("express-winston");

const messageFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.simple()
);

// create a request logger
const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.Console({
      format: messageFormat,
    }),
    new winston.transports.File({
      filename: "requestLogger",
      format: winston.format.simple(),
    }),
  ],
});

// create an error logger
const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({
      filename: "errorLogger",
      format: winston.format.simple(),
    }),
  ],
});

module.exports = { requestLogger, errorLogger };
