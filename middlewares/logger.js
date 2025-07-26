// import modules
const winston = require("winston");
const expressWinston = require("express-winston");

// create a request logger

const requestLogger = expressWinston.logger({});

// create an error logger

const errorLogger = expressWinston.logger({});

module.exports = { requestLogger, errorLogger };
