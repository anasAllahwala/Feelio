var express = require("express");
const auth = require("../middlewares/AuthMiddleware");
const { AuthController } = require("../controllers/AuthController");
var router = express.Router();

/* Login User */
router.post("/login", AuthController.login);

/* Register User */
router.post("/register", AuthController.register);

/* User Profile */
router.get("/profile", auth, AuthController.profile);

module.exports = router;
