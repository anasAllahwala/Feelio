var jwt = require("jsonwebtoken");
const { hash } = require("../helpers/hash");
const { UserModel } = require("../models/UserModel");

const {
  InvalidCredentialsException,
  RegistrationFailedException,
} = require("../utils/exceptions/AuthException");

const { successResponse, failureResponse } = require("../utils/responses");

class AuthController {
  login(req, res, next) {
    const { email, password: pass } = req.body;
    if (!email || !pass) {
      const err = new InvalidCredentialsException(
        "Email and password is required!"
      );
      next(err);
    }

    function callback(error, results) {
      if (!error && typeof results[0] !== "undefined") {
        if (hash.verify(pass, results[0]?.password)) {
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

          res.json(
            successResponse(
              {
                ...response,
                token,
              },
              "Logged in successfully!"
            )
          );
        } else {
          // Response if authentication fails
          const err = new InvalidCredentialsException(
            "Email or password is incorrect!"
          );
          next(err);
        }
      } else {
        // Response if authentication fails
        const err = new InvalidCredentialsException(
          "Email or password is incorrect!"
        );
        next(err);
      }
    }

    UserModel.login({ ...req.body, cb: callback });
  }

  register(req, res, next) {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      const err = new RegistrationFailedException(
        "Name, Email and Password is required!"
      );
      next(err);
    }

    function callback(error, user_id) {
      if (!error) {
        if (!user_id) {
          res.json({
            headers: { error: 1, message: "Email is already registered!" },
            body: {},
          });

          return;
        }

        // Create token
        const token = jwt.sign({ user_id }, process.env.JWT_SECRET_KEY, {
          expiresIn: "2h",
        });

        res.json(
          successResponse(
            {
              name,
              email,
              token,
            },
            "Registered successfully!"
          )
        );
      } else {
        const err = new RegistrationFailedException("Registration Failed!");
        next(err);
      }
    }

    UserModel.create({ ...req.body, cb: callback });
  }

  profile(req, res, next) {
    const { user_id } = req;
    const { req_user_id } = req.params;

    function callback(err, results) {
      if (!err && results) {
        res.json(
          successResponse(
            {
              ...results,
            },
            "Profile data sent successfully!"
          )
        );
      } else {
        res.json({
          headers: {
            error: "1",
            message: "Request Failed!",
          },
        });
      }
    }
    let user = null;
    if (req_user_id) user = req_user_id;
    else user = user_id;

    UserModel.findById({ user_id: user, cb: callback });
  }
}

module.exports.AuthController = new AuthController();
