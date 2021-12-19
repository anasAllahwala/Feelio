const { AdminModel } = require("../models/AdminModel");
const { successResponse } = require("../utils/responses");

class AdminController{

  getTotalUsers(req, res, next){

    function callback(error, results){
      if (error) {
        res.json({
          header: {
            error: "1",
            message: "Request Failed!",
          },
        });
      } 
      else {
        res.json(
          successResponse(
            { ...results },
            "Total users fetched successfully!"
          )
        );
      }
    }

    AdminModel.get_total_users({ cb: callback });
  }

  getTotalNewUsersToday(req, res, next){

    function callback(error, results){
      if (error) {
        res.json({
          header: {
            error: "1",
            message: "Request Failed!",
          },
        });
      } 
      else {
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

  getTotalMessagesSendToday(req, res, next){

    function callback(error, results){
      if (error) {
        res.json({
          header: {
            error: "1",
            message: "Request Failed!",
          },
        });
      } 
      else {
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

  getTotalPostToday(req, res, next){

    function callback(error, results){
      if (error) {
        res.json({
          header: {
            error: "1",
            message: "Request Failed!",
          },
        });
      } 
      else {
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

  getAllPost(req, res, next){
    const { last_post_id } = req.body;

    function callback(error, results){
      if (error) {
        res.json({
          header: {
            error: "1",
            message: "Request Failed!",
          },
        });
      } 
      else {
        res.json(
          successResponse(
            { ...results },
            "Posts fetched successfully!"
          )
        );
      }
    }

    AdminModel.get_all_post({last_post_id, cb: callback });
  }

  deletePost(req, res, next){
    const { post_id } = req.body;

    function callback(error, results){
      if (error) {
        res.json({
          header: {
            error: "1",
            message: "Request Failed!",
          },
        });
      } 
      else {
        res.json(
          successResponse(
            { ...results },
            "Post deleted successfully!"
          )
        );
      }
    }

    AdminModel.deletePost({ post_id, cb: callback });
  }
}

module.exports.AdminController = new AdminController();