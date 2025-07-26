const router = require("express").Router();
const auth = require("./middleware/auth");
const { getGames, getGamesId } = require("../controllers/users");

// auth middleware
router.use(auth);
router.post("/games"); // PROTECTED
router.delete("/games/:gameId"); //PROTECTED

module.exports = router;
