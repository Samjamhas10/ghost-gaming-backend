const router = require("express").Router();

router.use(auth);
router.get("/users/me"); // PROTECTED
router.get("/games"); //PROTECTED

module.exports = router;
