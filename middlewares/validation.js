const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

// URL validator helper
const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

// Email validator helper
const validateEmail = (value, helpers) => {
  if (validator.isEmail(value)) {
    return value;
  }
  return helpers.error("string.email");
};

module.exports.validateId = celebrate({
  params: Joi.celebrate().keys({}),
});
