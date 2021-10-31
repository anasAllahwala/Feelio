var jwt = require("jsonwebtoken");
const { hash } = require("../helpers/hash");
const { UserModel } = require("../models/UserModel");

class AuthController {
  login(req, res, next) {
    const { email, password: pass } = req.body;

    if (!email || !pass) {
      res.json({
        header: {
          error: "1",
          message: "Login Failed!",
        },
      });
      next();
    }

    function callback(error, results) {
      if (!error && hash.verify(pass, results[0]?.password)) {
        // Response if authentication is successful
        // Removing password property from results
        const { password, ...response } = results[0];

        // Create token
        const token = jwt.sign(
          { user_id: response.user_id },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: "2h",
          }
        );

        res.json({
          header: {
            error: "0",
            message: "Logged in successfully!",
          },
          body: {
            ...response,
            token,
          },
        });
      } else {
        // Response if authentication fails
        res.json({
          header: {
            error: "1",
            message: "Login Failed!",
          },
        });
      }
    }

    UserModel.login({ ...req.body, cb: callback });
  }

  register(req, res, next) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.json({
        header: {
          error: "1",
          message: "Registration Failed!",
        },
      });
      next();
    }

    function callback(error, user_id) {
      if (!error) {
        // Create token
        const token = jwt.sign({ user_id }, process.env.JWT_SECRET_KEY, {
          expiresIn: "2h",
        });

        res.json({
          header: {
            error: "0",
            message: "Registered successfully!",
          },
          body: {
            name,
            email,
            token,
          },
        });
      } else {
        res.json({
          header: {
            error: "1",
            message: "Registration Failed!",
          },
        });
      }
    }

    UserModel.create({ ...req.body, cb: callback });
  }

  profile(req, res, next) {
    const { user_id } = req;

    function callback(err, results) {
      if (!err) {
        res.json({
          header: {
            error: "0",
            message: "Profile data sent successfully!",
          },
          body: {
            ...results,
          },
        });
      } else {
        res.json({
          header: {
            error: "1",
            message: "Request Failed!",
          },
        });
      }
    }

    UserModel.findById({ user_id, cb: callback });
  }
}

module.exports.AuthController = new AuthController();
