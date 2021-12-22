const { AdminModel } = require("../models/AdminModel");
const { successResponse } = require("../utils/responses");

class AdminController {
  getTotalUsers(req, res, next) {
    function callback(error, results) {
      if (error) {
        res.json({
          header: {
            error: "1",
            message: "Request Failed!",
          },
        });
      } else {
        res.json(
          successResponse({ ...results }, "Total users fetched successfully!")
        );
      }
    }

    AdminModel.get_total_users({ cb: callback });
  }

  getTotalNewUsersToday(req, res, next) {
    function callback(error, results) {
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
            "Total new users today fetched successfully!"
          )
        );
      }
    }

    AdminModel.get_total_new_users_today({ cb: callback });
  }

  getTotalMessagesSendToday(req, res, next) {
    function callback(error, results) {
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
            "Total messages send today fetched successfully!"
          )
        );
      }
    }

    AdminModel.get_total_messages_send_today({ cb: callback });
  }

  getTotalPostToday(req, res, next) {
    function callback(error, results) {
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
            "Total post today fetched successfully!"
          )
        );
      }
    }

    AdminModel.get_total_post_today({ cb: callback });
  }

  getAllPost(req, res, next) {
    const { page_num } = req.query;

    function callback(error, results) {
      if (error) {
        res.json({
          header: {
            error: "1",
            message: "Request Failed!",
          },
        });
      } else {
        res.json(
          successResponse({ ...results }, "Posts fetched successfully!")
        );
      }
    }

    AdminModel.get_all_posts({ page_num, cb: callback });
  }

  getAllPostPages(req, res, next) {
    function callback(error, results) {
      if (error) {
        res.json({
          header: {
            error: "1",
            message: "Request Failed!",
          },
        });
      } else {
        res.json(
          successResponse({ ...results }, "Posts pages fetched successfully!")
        );
      }
    }

    AdminModel.get_all_post_pages({ cb: callback });
  }

  getAllUsers(req, res, next) {
    const { page_num } = req.query;

    function callback(error, results) {
      if (error) {
        res.json({
          header: {
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

    AdminModel.get_all_users({ page_num, cb: callback });
  }

  getAllUsersPages(req, res, next) {
    function callback(error, results) {
      if (error) {
        res.json({
          header: {
            error: "1",
            message: "Request Failed!",
          },
        });
      } else {
        res.json(
          successResponse({ ...results }, "Users pages fetched successfully!")
        );
      }
    }

    AdminModel.get_all_users_pages({ cb: callback });
  }

  deletePost(req, res, next) {
    const { postId } = req.params;

    function callback(error, results) {
      if (error) {
        res.json({
          headers: {
            error: "1",
            message: "Request Failed!",
          },
        });
      } else {
        res.json(successResponse({ ...results }, "Post deleted successfully!"));
      }
    }

    AdminModel.deletePost({ post_id: postId, cb: callback });
  }

  deleteUser(req, res, next) {
    const { userId } = req.params;

    function callback(error, results) {
      if (error) {
        res.json({
          headers: {
            error: "1",
            message: "Request Failed!",
          },
        });
      } else {
        res.json(successResponse(null, "User deleted successfully!"));
      }
    }

    AdminModel.deleteUser({ user_id: userId, cb: callback });
  }
}

module.exports.AdminController = new AdminController();
