var express = require("express");
const auth = require("../middlewares/AuthMiddleware");
const admin = require("../middlewares/AdminMiddleware");
const { AdminController } = require("../controllers/AdminController");
var adminRouter = express.Router();

/* Get Posts */
adminRouter.get("/posts", auth, admin, AdminController.getAllPost);

/* Get Users */
adminRouter.get("/users", auth, admin, AdminController.getAllUsers);

/* Delete User */
adminRouter.delete("/users/:userId", auth, admin, AdminController.deleteUser);

/* Delete Post */
adminRouter.delete("/posts/:postId", auth, admin, AdminController.deletePost);

module.exports = adminRouter;
