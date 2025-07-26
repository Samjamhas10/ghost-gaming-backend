const router = require("express").Router();
const auth = require("./middleware/auth");
const {
  signup,
  signin,
  getCurrentUser,
  getGames,
} = require("../controllers/users");

// Routes
router.post("/signup"); // NOT PROTECTED
router.post("/signin"); // NOT PROTECTED

// auth middleware
router.use(auth);

router.get("/users/me"); // PROTECTED
router.get("/games"); //PROTECTED

module.exports = router;
