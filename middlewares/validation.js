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

const validateUserBody = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail).messages({
      "string.empty": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "password" field is 2',
      "string.max": 'The maximum length of the "password" field is 30',
      "string.empty": 'The "password" field must be filled in',
    }),
    username: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "username" field is 2',
      "string.max": 'The maximum length of the "username" field is 30',
      "string.empty": 'The "username" field must be filled in',
    }),
    avatarUrl: Joi.string().required().custom(validateUrl).messages({
      "string.empty": 'The "avatarUrl" field must be a valid URL',
    }),
  }),
});

const validateAuthentication = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().custom(validateEmail).messages({
      "string.empty": 'The "email" field must be a valid email',
    }),
    password: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "password" field is 2',
      "string.max": 'The maximum length of the "password" field is 30',
      "string.empty": 'The "password" field must be filled in',
    }),
  }),
});

// TODO: implement this in
// const validateGameId = celebrate({
//   params: Joi.object().keys({
//     userId: Joi.string().hex().length(24).required().messages({
//       "string.empty": '"userId" is required',
//       "string.length": '"userId" should be 24 characters long',
//       "string.hex": '"userId" must have a valid hexadecimal string',
//     }),
//   }),
// });

const validateSaveGame = celebrate({
  body: Joi.object().keys({}),
});

const validateUserUpdateProfile = celebrate({
  body: Joi.object().keys({
    username: Joi.string().required().min(2).max(30).messages({
      "string.min": 'The minimum length of the "username" field is 2',
    }),
    bio: Joi.string().required().min(2).max(200).messages({
      "string.min": 'The minimum length of the "bio" field is 2',
      "string.max": 'The maximum length of the "bio" field is 200',
    }),
    avatarUrl: Joi.string().required().custom(validateUrl).messages({
      "string.empty": 'The "avatarUrl" field must be a valid URL',
    }),
  }),
});

module.exports = {
  validateUserBody,
  validateAuthentication,
  // validateGameId, //TODO: implement this
  validateSaveGame,
  validateUserUpdateProfile,
};
