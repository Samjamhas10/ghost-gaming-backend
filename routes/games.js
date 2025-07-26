const router = require("express").Router();

router.use(auth);
router.post("/games"); // PROTECTED
router.delete("/games/:gameId"); //PROTECTED

module.exports = router;
