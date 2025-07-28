const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getGames, getGamesId } = require("../controllers/games");

// auth middleware
// router.use(auth);
console.log(getGames);
router.get("/", getGames);
// router.post("/games"); // PROTECTED
// router.delete("/games/:gameId"); //PROTECTED

module.exports = router;
