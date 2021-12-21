var express = require("express");
const auth = require("../middlewares/AuthMiddleware");
const { PostController } = require("../controllers/PostController");
var postRouter = express.Router();

/* Get Posts */
postRouter.get("/", auth, PostController.getPostByFriends);

/* Get Posts */
postRouter.get("/post", auth, PostController.getPost);

/* Get User Posts */
postRouter.get("/user/:user_id", auth, PostController.getPostsByUser);

/* Create Post */
postRouter.post("/", auth, PostController.create);

/* Edit Post */
postRouter.patch("/", auth, PostController.edit);

/* Delete Post */
postRouter.delete("/", auth, PostController.delete);

module.exports = postRouter;
