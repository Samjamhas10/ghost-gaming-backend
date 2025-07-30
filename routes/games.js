const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getGames, deleteGames, searchGames } = require("../controllers/games");

console.log(getGames);
router.get("/", getGames);

// auth middleware
router.use(auth);

router.get("/search", searchGames);
router.delete("/:gameId", deleteGames); //PROTECTED

module.exports = router;
