const router = require("express").Router();
const userRouter = require("../routes/users");
const gameRouter = require("../routes/games");

router.use("/users", userRouter);
router.use("/games", gameRouter);

module.exports = router;
