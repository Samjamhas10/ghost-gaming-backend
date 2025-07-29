const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getGames } = require("../controllers/games");

// auth middleware
// router.use(auth);
console.log(getGames);
router.get("/", getGames);
// router.delete("/:gameId", deleteGames); //PROTECTED

module.exports = router;
