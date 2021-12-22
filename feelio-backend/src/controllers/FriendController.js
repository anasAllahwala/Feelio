const { FriendsModel } = require("../models/FriendsModel");
const { successResponse } = require("../utils/responses");

class FriendController {
  get(req, res, next) {
    const { user_id } = req;
    function callback(errors, results) {
      if (errors) {
        console.error(error);
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

  findRequestById(req, res, next) {
    const { req_id } = req.params;
    function callback(errors, results) {
      if (errors) {
        console.error(error);
      } else {
        res.json(
          successResponse(
            { ...results[0] },
            "Friend requests fetched successfully!"
          )
        );
      }
    }
    FriendsModel.findPendingByUser({ req_id, cb: callback });
  }

  create(req, res, next) {
    const { user_id } = req;
    const { friend_id } = req.body;

    function callback(errors, results) {
      if (errors) {
        console.error(errors);
      } else {
        res.json(successResponse(null, "Friend requests sent successfully!"));
      }
    }

    FriendsModel.create({ user_id, friend_id, cb: callback });
  }

  accept(req, res, next) {
    const { user_id } = req;
    const { friend_request_id } = req.body;

    function callback(errors, results) {
      if (errors) {
        console.error(error);
      } else {
        res.json(
          successResponse(null, "Friend request accepted successfully!")
        );
      }
    }

    FriendsModel.acceptRequest({ user_id, friend_request_id, cb: callback });
  }

  decline(req, res, next) {
    const { user_id } = req;
    const { friend_request_id } = req.body;

    function callback(errors, results) {
      if (errors) {
        console.error(error);
      } else {
        res.json(
          successResponse(null, "Friend request declined successfully!")
        );
      }
    }

    FriendsModel.declineRequest({ user_id, friend_request_id, cb: callback });
  }

  getFriends(req, res, next) {
    const { user_id } = req;
    const { req_user } = req.params;

    let user = user_id;

    if (req_user) user = req_user;

    function callback(errors, results) {
      if (errors) {
        console.error(error);
      } else {
        res.json(
          successResponse({ ...results }, "Friends fetched successfully!")
        );
      }
    }
    FriendsModel.findAcceptedByUser({ user_id: user, cb: callback });
  }
}

module.exports.FriendController = new FriendController();
