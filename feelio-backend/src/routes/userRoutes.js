var express = require("express");
const auth = require("../middlewares/AuthMiddleware");
const { UserController } = require("../controllers/UserController");
var userRouter = express.Router();

/* Fetch Users */
userRouter.get("/", auth, UserController.fetchAll);

module.exports = userRouter;
