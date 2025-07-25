const mongoose = require("mongoose");
const validator = require("validator");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
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
    select: false, // password security
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {};
