const { FriendsModel } = require("../models/FriendsModel");
const { successResponse } = require("../utils/responses");

class FriendController {
    get(req, res, next){
        let user_id = req.user_id;
        function callback(errors, results){
            if(errors){

            }
            else{
                res.json(successResponse({...results}, "Friend requests fetched successfully!"));
            }
        }
        FriendsModel.findPendingByUser({user_id, cb: callback})
    }

    create(req, res, next){

    }

    edit(req, res, next){
        
    }

    delete(req, res, next){

    }
}

module.exports.FriendController = new FriendController();