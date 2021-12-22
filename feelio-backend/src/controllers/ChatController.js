const { ChatModel } = require("../models/ChatModel");
const { successResponse } = require("../utils/responses");

class ChatController {
  getMessages(req, res, next) {
    const { friend_request_id } = req.params;
    function callback(error, results) {
      if (error) {
        res.json({
          headers: {
            error: "1",
            message: "Request Failed!",
          },
        });
      } else {
        res.json(
          successResponse({ ...results }, "Messages fetched successfully!")
        );
      }
    }

    ChatModel.getMessages({ friend_request_id, cb: callback });
  }

  newMessage(req, res, next) {
    const { user_id } = req;
    const { friend_request_id } = req.params;
    const { message } = req.body;

    function callback(error, results) {
      if (error) {
        res.json({
          headers: {
            error: "1",
            message: "Failed to send message!",
          },
        });
      } else {
        res.json(
          successResponse({ ...results[0] }, "Message inserted successfully!")
        );
      }
    }

    ChatModel.newMessage({ friend_request_id, user_id, message, cb: callback });
  }
}

module.exports.ChatController = new ChatController();
