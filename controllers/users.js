const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const { JWT_SECRET } = require("../utils/config");
const { okStatusCode, createdStatusCode } = require("../utils/statusCodes");

// async function to create new user
const createUser = async (req, res, next) => {
  try {
    // destructure user input from req.body
    const { email, password, name, avatarUrl } = req.body;
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
      name,
      avatarUrl,
    });
    return res
      .status(createdStatusCode)
      .send({ message: "User created successfully" });
  } catch (err) {
    return next(err);
  }
};

const getCurrentUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id).select("-password"); // exclude password
    if (!user) {
      return res.status(404).send({ message: "User not found" });
    }
    res.status(okStatusCode).send(user);
  } catch (err) {
    next(err);
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
    next(err);
  }
};

module.exports = { createUser, getCurrentUser, login };
