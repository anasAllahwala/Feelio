var express = require("express");
const auth = require("../middlewares/AuthMiddleware");
const { FriendController } = require("../controllers/FriendController");
var router = express.Router();

/* Get Friends */
router.get("/friends", auth, FriendController.login);

/* Add Friend */
router.post("/friends", auth, FriendController.register);

/* Remove Friend */
router.delete("/friends", auth, FriendController.profile);

module.exports = router;
