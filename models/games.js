const mongoose = require("mongoose");
const validator = require("validator");

const gameSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 80,
  },

  gameId: {
    type: String,
    required: [true, "The gameId is required"],
    unique: true,
  },

  summary: {
    type: String,
    required: true,
  },

  releaseDate: {
    type: Date,
  },

  genres: {
    type: [String],
    required: true,
  },

  platforms: {
    type: [String],
    required: true,
  },

  coverImage: {
    type: String,
    required: [true, "The coverImage is required"],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You have to enter a valid coverImage url",
    },
  },

  rating: {
    type: Number,
    min: 0,
    max: 100,
    default: null,
  },

  owner: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    select: false,
  },

  savedAt: {
    type: Date,
  },
});

module.exports = mongoose.model("game", gameSchema);
