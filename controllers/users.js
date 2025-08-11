const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const { JWT_SECRET } = require("../utils/config");
const { okStatusCode, createdStatusCode } = require("../utils/statusCodes");

// async function to create new user
const createUser = async (req, res, next) => {
  try {
    // destructure user input from req.body
    const { email, password, username, avatarUrl } = req.body;
    // check if user with email already exists
    const userExists = await User.findOne({ email }).select("+password");
    if (userExists) {
      return res.status(409).send({ message: "User already exists" });
    }
    // hash password
    const hashPassword = await bcrypt.hash(password, 10);
    // create new user with hashed password
    const user = await User.create({
      email,
      password: hashPassword,
      username,
      avatarUrl,
    });
    return res.status(createdStatusCode).send(user);
  } catch (err) {
    if (err.name === "ValidationError") {
      return res.status(400).send({ message: err.message });
    }
    return next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password"); // exclude password
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    return res.status(okStatusCode).send(user);
  } catch (err) {
    return next(err);
  }
};

// validates credentials and returns a JWT token
const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // find user by email and password field
    const userExists = await User.findOne({ email }).select("+password");
    if (!userExists) {
      // if no user us found return Unauthorized
      return res.status(401).send({ message: "Invalid credentials" });
    }
    const passwordMatches = await bcrypt.compare(password, userExists.password);

    if (!passwordMatches) {
      return res.status(401).send({ message: "Invalid credentials" });
    }
    const token = jwt.sign({ _id: userExists._id }, JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(okStatusCode).send({ token });
  } catch (err) {
    return next(err);
  }
};

const updateProfile = async (req, res, next) => {
  console.log("🚀 UPDATE PROFILE ENDPOINT HIT!");
  console.log("📦 REQ.BODY:", req.body);
  console.log("👤 USER ID:", req.user._id);
  try {
    console.log("Incoming update data:", req.body);
    const userId = req.user._id;
    const { username, bio, avatarUrl } = req.body;
    const userData = await User.findByIdAndUpdate(
      userId,
      {
        username,
        bio,
        avatarUrl,
      },
      { new: true, runValidators: true }
    ).select("-password");
    return res.status(okStatusCode).send(userData);
  } catch (err) {
    console.error("Update failed", err);
    return next(err);
  }
};

module.exports = { createUser, getCurrentUser, login, updateProfile };
