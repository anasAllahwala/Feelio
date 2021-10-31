var authRouter = require("./routes/AuthRoute");

class RouteLoader {
    static init(app){
        app.use("/auth", authRouter);
    }
}

module.exports = {RouteLoader};