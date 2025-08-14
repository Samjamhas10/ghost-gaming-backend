const router = require("express").Router();
const auth = require("../middlewares/auth");
const {
  getGames,
  searchGames,
  saveGames,
  savedGames,
  deleteGames,
} = require("../controllers/games");

// const { validateGameId } = require("../middlewares/validation");

router.get("/", getGames);

router.get("/search", searchGames);

// auth middleware
router.use(auth);

router.post("/save", saveGames); // PROTECTED saving games to a user's collection
router.get("/saved", savedGames); // PROTECTED retrieving a user's saved games
router.delete("/:gameId", deleteGames); // PROTECTED deleting a user's saved games

module.exports = router;
