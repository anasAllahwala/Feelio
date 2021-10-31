var authRouter = require("../routes/authRoute");

class RouteLoader {
    static init(app){
        app.use("/auth", authRouter);
    }
}

module.exports = {RouteLoader};