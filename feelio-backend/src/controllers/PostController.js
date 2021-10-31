const { PostModel } = require("../models/PostModel");
const { successResponse } = require("../utils/responses");

class PostController{

    getPost(req, res, next){
        const { post_id } = req.body.postId;

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
                  "Post fetched successfully!"
                )
              );
            }
        }

        PostModel.findById({ post_id, cb: callback });
    }

    getPostByFriends(req, res, next){
        const { user_id } = req;

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
                  "Posts fetched successfully!"
                )
              );
            }
        }

        PostModel.findByFriends({ user_id, cb: callback });
    }

    create(req, res, next){
        const { user_id } = req;
        const { body } = req.body.body;
        const { image } = req.body.image;

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
                  "Posts created successfully!"
                )
              );
            }
        }

        PostModel.create({body, image, user_id, cb: callback });
    }

    edit(req, res, next){
        const { user_id } = req;
        const { body } = req.body.body;
        const { image } = req.body.image;
        const { post_id } = req.body.postId;

        function callback(error, results){
            if (error) {
                res.json({
                    header: {
                      error: "1",
                      message: "Failed to edit Post!",
                    },
                  });
            } else {
              res.json(
                successResponse(
                  { ...results },
                  "Posts edited successfully!"
                )
              );
            }
        }

        PostModel.edit({user_id, body, image, post_id, cb: callback });
    }

    delete(req, res, next){
        const { user_id } = req;
        const { post_id } = req.body.postId;

        function callback(error, results){
            if (error) {
                res.json({
                    header: {
                      error: "1",
                      message: "Failed to delete Post!",
                    },
                  });
            } else {
              res.json(
                successResponse(
                  { ...results },
                  "Posts deleted successfully!"
                )
              );
            }
        }

        PostModel.delete({user_id, post_id, cb: callback });
    }
}

module.exports.PostController = new PostController();