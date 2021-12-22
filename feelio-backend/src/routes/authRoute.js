var express = require("express");
const auth = require("../middlewares/AuthMiddleware");
const { AuthController } = require("../controllers/AuthController");
var authRouter = express.Router();

const multer = require("multer");

var path = require("path");

var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); //Appending extension
  },
});

const upload = multer({ storage });

/* Login User */
authRouter.post("/login", AuthController.login);

/* Register User */
authRouter.post("/register", upload.single("avatar"), AuthController.register);

/* User Profile */
authRouter.get("/profile", auth, AuthController.profile);

/* User Profile */
authRouter.get("/profile/:req_user_id", auth, AuthController.profile);

module.exports = authRouter;
