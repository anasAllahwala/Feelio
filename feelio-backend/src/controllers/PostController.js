const { PostModel } = require("../models/PostModel");
const { successResponse } = require("../utils/responses");

class PostController {
  getPost(req, res, next) {
    const { user_id } = req;
    const { post_id } = req.body;

    function callback(error, results) {
      if (error) {
        res.json({
          header: {
            error: "1",
            message: "Request Failed!",
          },
        });
      } else {
        res.json(successResponse({ ...results }, "Post fetched successfully!"));
      }
    }

    PostModel.findById({ user_id, post_id, cb: callback });
  }

  getPostsByUser(req, res, next) {
    const { user_id } = req.params;
    const { last_post_id } = req.body;

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

    PostModel.findByUser({ user_id, last_post_id, cb: callback });
  }

  getPostByFriends(req, res, next) {
    const { user_id } = req;
    const { last_post_id } = req.body;

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

    PostModel.findByFriends({ user_id, last_post_id, cb: callback });
  }

  create(req, res, next) {
    const { user_id } = req;
    const { body, image } = req.body;

    function callback(error, results) {
      if (error) {
        res.json({
          header: {
            error: "1",
            message: "Failed to create Post!",
          },
        });
      } else {
        res.json(
          successResponse({ ...results }, "Posts created successfully!")
        );
      }
    }

    PostModel.create({ body, image, user_id, cb: callback });
  }

  addComment(req, res, next) {
    const { user_id } = req;
    const { post_id, comment } = req.body;

    function callback(error, results) {
      if (error) {
        res.json({
          header: {
            error: "1",
            message: "Failed to create Comment!",
          },
        });
      } else {
        res.json(
          successResponse({ ...results }, "Comment created successfully!")
        );
      }
    }

    PostModel.addComment({ user_id, post_id, comment, cb: callback });
  }

  addReact(req, res, next) {
    const { user_id } = req;
    const { post_id } = req.body;

    function callback(error, results) {
      if (error) {
        res.json({
          header: {
            error: "1",
            message: "Failed to add Like!",
          },
        });
      } else {
        res.json(successResponse({ ...results }, "Like added successfully!"));
      }
    }

    PostModel.addComment({ user_id, post_id, cb: callback });
  }

  getPostComments(req, res, next) {
    const { post_id } = req.body;

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
          successResponse({ ...results }, "Comments fetched successfully!")
        );
      }
    }

    PostModel.getPostComments({ post_id, cb: callback });
  }

  getPostReacts(req, res, next) {
    const { post_id } = req.body;

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
          successResponse({ ...results }, "Likes fetched successfully!")
        );
      }
    }

    PostModel.getPostReacts({ post_id, cb: callback });
  }

  edit(req, res, next) {
    const { user_id } = req;
    const { body, image, post_id } = req.body;

    function callback(error, results) {
      if (error) {
        res.json({
          header: {
            error: "1",
            message: "Failed to edit Post!",
          },
        });
      } else {
        res.json(successResponse({ ...results }, "Posts edited successfully!"));
      }
    }

    PostModel.edit({ user_id, body, image, post_id, cb: callback });
  }

  delete(req, res, next) {
    const { user_id } = req;
    const { post_id } = req.body;

    function callback(error, results) {
      if (error) {
        res.json({
          header: {
            error: "1",
            message: "Failed to delete Post!",
          },
        });
      } else {
        res.json(
          successResponse({ ...results }, "Posts deleted successfully!")
        );
      }
    }

    PostModel.delete({ user_id, post_id, cb: callback });
  }
}

module.exports.PostController = new PostController();
