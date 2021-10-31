var express = require("express");
const auth = require("../middlewares/AuthMiddleware");
const { PostController } = require("../controllers/PostController");
var router = express.Router();

/* Get Posts */
router.get("/posts", auth, PostController.get);

/* Create Post */
router.post("/posts", auth, PostController.create);

/* Edit Post */
router.patch("/posts", auth, PostController.profile);

/* Delete Post */
router.delete("/posts", auth, PostController.profile);

module.exports = router;
