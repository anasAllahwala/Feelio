const { UserModel } = require("../models/UserModel");
const { successResponse } = require("../utils/responses");

class UserController {
  fetchAll(req, res, next) {
    const { name } = req.query;

    function callback(error, results) {
      console.log(error, results);
      if (error) {
        res.json({
          headers: {
            error: "1",
            message: "Request Failed!",
          },
        });
      } else {
        res.json(
          successResponse({ ...results }, "Users fetched successfully!")
        );
      }
    }

    UserModel.searchUsers({ name, cb: callback });
  }
}

module.exports.UserController = new UserController();
