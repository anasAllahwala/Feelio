const authRouter = require("../routes/authRoute");
const friendsRouter = require("../routes/friendRequestRoutes");
const postRouter = require("../routes/postRoutes");

class RouteLoader {
  static init(app) {

    app.use("/auth", authRouter);
    app.use("/friends", friendsRouter);
    app.use("/posts", postRouter);
    
  }
}

module.exports = { RouteLoader };
