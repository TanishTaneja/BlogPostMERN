const { createUser, loginUser, verifyUser } = require("../controller/userController");

const router = require("express").Router()

router.post("/register", createUser);
router.post("/login", loginUser);
router.get("/verify/:token", verifyUser);

module.exports = router;