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
    console.log(friend_request_id);

    function callback(error, results) {
      if (error) {
        res.json({
          headers: {
            error: "1",
            message: "Failed to create Post!",
          },
        });
      } else {
        res.json(
          successResponse({ ...results }, "Message inserted successfully!")
        );
      }
    }

    ChatModel.newMessage({ friend_request_id, user_id, message, cb: callback });
  }
}

module.exports.ChatController = new ChatController();
