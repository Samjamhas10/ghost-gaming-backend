const router = require("express").Router();
const auth = require("../middlewares/auth");
const { getGames, deleteGames, searchGames } = require("../controllers/games");

console.log(getGames);
router.get("/", getGames);

router.get("/search", searchGames);
// auth middleware
router.use(auth);
router.delete("/:gameId", deleteGames); //PROTECTED deleting a user's saved games

module.exports = router;
