const { FriendsModel } = require("../models/FriendsModel");
const { successResponse } = require("../utils/responses");

class FriendController {
  get(req, res, next) {
    const { user_id } = req;
    function callback(errors, results) {
      if (errors) {
      } else {
        res.json(
          successResponse(
            { ...results },
            "Friend requests fetched successfully!"
          )
        );
      }
    }
    FriendsModel.findPendingByUser({ user_id, cb: callback });
  }

  create(req, res, next) {
    const { user_id } = req;
    const { friend_id } = req.body;

    function callback(errors, results) {
      if (errors) {
      } else {
        res.json(successResponse(null, "Friend requests sent successfully!"));
      }
    }

    FriendsModel.create({ user_id, friend_id, cb: callback });
  }

  accept(req, res, next) {
    const { friend_request_id } = req.body;

    function callback(errors, results) {
      if (errors) {
      } else {
        res.json(
          successResponse(null, "Friend request accepted successfully!")
        );
      }
    }

    FriendsModel.acceptRequest({ friend_request_id, cb: callback });
  }

  decline(req, res, next) {
    const { friend_request_id } = req.body;

    function callback(errors, results) {
      if (errors) {
      } else {
        res.json(
          successResponse(null, "Friend request declined successfully!")
        );
      }
    }

    FriendsModel.declineRequest({ friend_request_id, cb: callback });
  }

  getFriends(req, res, next) {
    const { user_id } = req;
    function callback(errors, results) {
      if (errors) {
      } else {
        res.json(
          successResponse(
            { ...results },
            "Friends fetched successfully!"
          )
        );
      }
    }
    FriendsModel.findAcceptedByUser({ user_id, cb: callback });
  }
}

module.exports.FriendController = new FriendController();
