const router = require("express").Router();
const auth = require("../middlewares/auth");
const { JWT_SECRET } = require("../utils/config");
const {
  createUser,
  getCurrentUser,
  login,
  updateProfile,
} = require("../controllers/users");

// Routes
router.post("/signup", createUser); // NOT PROTECTED
router.post("/signin", login); // NOT PROTECTED

// auth middleware
router.use(auth);

router.get("/me", getCurrentUser); // PROTECTED getting current user info
router.patch("/me", updateProfile); // PROTECTED

module.exports = router;
