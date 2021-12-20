var express = require("express");
const auth = require("../middlewares/AuthMiddleware");
const { ChatController } = require("../controllers/ChatController");
var chatRouter = express.Router();

/* Get Messages */
chatRouter.get("/:friend_request_id", auth, ChatController.getMessages);

/* Send Messages */
chatRouter.post("/:friend_request_id/new", auth, ChatController.newMessage);

module.exports = chatRouter;
