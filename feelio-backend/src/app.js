const { setup } = require("./loaders");
const express = require("express");
const { FriendsModel } = require("./models/FriendsModel");

const app = express();

setup({ expressApp: app });

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(
    `Your server is ready and running at http://localhost:${process.env.PORT}!`
  );
});
