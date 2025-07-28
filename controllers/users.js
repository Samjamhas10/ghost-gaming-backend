const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/users");
const {okStatusCode, createdStatusCode} = require("../utils/statusCodes")

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
    return res.status(createdStatusCode).send({ message: "User created successfully" });
  } catch (err) {
    next(err);
  }
};

const getCurrentUser = async (req,res,next) => {
const {email, password} =  req.user._id
}

const login = async (req, res, next) => {
try {
  const {email, password} = req.body;
  // find user by email and password field
  const userExists =  await User.findOne({ email }).select("+password");
  if(!userExists) {
    // if no user us found return Unauthorized
    return res.status(401).send({"Invalid credentials"})
  }
  const passwordMatches = await bcrypt.compare(password, userExists)
  // const token = jwt.sign({ _id: userExists._id }, JWT_SECRET, {
  //   expiresIn: "7d",
  // });
  if(!passwordMatches) {
    return res.status(401).send({"Invalid credentials"})
  }
  return res.status(okStatusCode).send({ token });
} catch (err) {
  next(err);
}
};

