const router = require("express").Router();
const auth = require("../middlewares/auth");
const { JWT_SECRET } = require("../utils/config");
const {
  createUser,
  login,
  getCurrentUser,
  saveGames,
  savedGames,
} = require("../controllers/users");

// Routes
router.post("/signup", createUser); // NOT PROTECTED
router.post("/signin", login); // NOT PROTECTED

// auth middleware
router.use(auth);

router.post("/save"); // PROTECTED saving games to a user's collection
router.get("/saved"); // PROTECTED retrieving a user's saved games
router.get("/me", getCurrentUser); // PROTECTED getting current user info

module.exports = router;
