// import dependencies
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You have to enter a valid email",
    },
  },

  password: {
    type: String,
    required: true,
    minlength: "8",
    maxlength: "100",
    select: false, // password security
  },

  username: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },

  avatarUrl: {
    type: String,
    requuired: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  bio: {
    type: String,
    required: false,
    minlength: 2,
    maxlength: 100,
    default: "Enter your bio",
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
