const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
};

module.exports.validateId = celebrate({
  params: Joi.celebrate().keys({}),
});
