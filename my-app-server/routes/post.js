let express = require("express");
let router = express.Router();
let { getallpost, getonepost, postaddpost, deleteonepost, patcheditpost } = require("../controller/post");
const authenticateToken = require("../middleware/authenticateToken");

router.use(authenticateToken);
router
    .get("/", getallpost)
    .post("/", postaddpost);
router.get("/:postId", getonepost);
router.delete("/:postId", deleteonepost);
router.patch("/:postId", patcheditpost);

module.exports = router