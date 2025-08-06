const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  createUser,
  getCurrentUser,
  login,
  updateProfile,
} = require("../controllers/users");

const {
  validateUserBody,
  validateAuthentication,
  validateUserUpdateProfile,
} = require("../middlewares/validation");

// Routes
router.post("/signup", validateUserBody, createUser); // NOT PROTECTED
router.post("/signin", validateAuthentication, login); // NOT PROTECTED

// auth middleware
router.use(auth);

router.get("/me", getCurrentUser); // PROTECTED getting current user info
router.patch("/me", validateUserUpdateProfile, updateProfile); // PROTECTED

module.exports = router;
