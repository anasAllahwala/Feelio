var express = require("express");
const auth = require("../middlewares/AuthMiddleware");
const { AuthController } = require("../controllers/AuthController");
var authRouter = express.Router();

/* Login User */
authRouter.post("/login", AuthController.login);

/* Register User */
authRouter.post("/register", AuthController.register);

/* User Profile */
authRouter.get("/profile", auth, AuthController.profile);

module.exports = authRouter;
