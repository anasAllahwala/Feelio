var express = require("express");
const auth = require("../middlewares/AuthMiddleware");
const { FriendController } = require("../controllers/FriendController");
var friendsRouter = express.Router();

/* Get Friends */
friendsRouter.get("/", auth, FriendController.get);

/* Add Friend */
friendsRouter.post("/", auth, FriendController.create);

/* Remove Friend */
friendsRouter.delete("/", auth, FriendController.delete);

module.exports = friendsRouter;
