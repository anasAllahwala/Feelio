const { ChatModel } = require("../models/ChatModel");
const { successResponse } = require("../utils/responses");

class ChatController{

  getMessages(req, res, next){
    const { friend_request_id } = req.body;

    function callback(error, results){
      if (error) {
        res.json({
          header: {
            error: "1",
            message: "Request Failed!",
          },
        });
      } else {
        res.json(
          successResponse(
            { ...results },
            "Messages fetched successfully!"
          )
        );
      }
    }

    ChatModel.getMessages({ friend_request_id, cb: callback });
  }

  newMessage(req, res, next){
    const { user_id } = req;
    const { friend_request_id, message } = req.body;

    function callback(error, results){
        if (error) {
            res.json({
                header: {
                  error: "1",
                  message: "Failed to create Post!",
                },
              });
        } else {
          res.json(
            successResponse(
              { ...results },
              "Message inserted successfully!"
            )
          );
        }
    }

    ChatModel.newMessage({friend_request_id, user_id, message, cb: callback });
}
}


module.exports.ChatController = new ChatController();