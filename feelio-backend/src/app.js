const { setup } = require("./loaders");
const express = require("express");

function startServer() {
  const app = express();

  setup({ expressApp: app });

  app.listen(process.env.PORT, (err) => {
    if (err) {
      console.log(err);
      return;
    }
    console.log(
      `Your server is ready and running at http://localhost:${process.env.PORT}!`
    );
  });
}

startServer();
