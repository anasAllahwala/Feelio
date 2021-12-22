const authRouter = require("../routes/authRoute");
const friendsRouter = require("../routes/friendRequestRoutes");
const postRouter = require("../routes/postRoutes");
const chatRouter = require("../routes/chatRoutes");
const adminRouter = require("../routes/adminRoutes");
const userRouter = require("../routes/userRoutes");

class RouteLoader {
  static init(app) {
    app.use("/auth", authRouter);
    app.use("/friends", friendsRouter);
    app.use("/posts", postRouter);
    app.use("/chats", chatRouter);
    app.use("/admin", adminRouter);
    app.use("/users", userRouter);
  }
}

module.exports = { RouteLoader };
