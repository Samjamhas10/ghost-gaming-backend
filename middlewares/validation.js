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


module.exports.validateId = celebrate({
  params: Joi.celebrate().keys({}),
});
