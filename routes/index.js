const router = require("express").Router();
const userRouter = require("./users");
const gameRouter = require("./games");

// add a root route handler
router.get("/", (req, res) => {
  res.json({ message: "Welcome to Ghost Gaming API" });
});

router.use("/users", userRouter);
router.use("/games", gameRouter);

module.exports = router;
