const router = require("express").Router();
const auth = require("./middleware/auth");
const {
  createUser,
  login,
  getCurrentUser,
  getGames,
} = require("../controllers/users");

// Routes
router.post("/signup", createUser); // NOT PROTECTED
router.post("/signin", login); // NOT PROTECTED

// auth middleware
router.use(auth);

router.get("/users/me"); // PROTECTED
router.get("/games"); //PROTECTED

module.exports = router;
