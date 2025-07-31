const router = require("express").Router();
const userRouter = require("./users");
const gameRouter = require("./games");

router.use("/users", userRouter);
router.use("/games", gameRouter);

module.exports = router;
