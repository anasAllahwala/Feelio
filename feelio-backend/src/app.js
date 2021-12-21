const { setup } = require("./loaders");
const express = require("express");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { UserModel } = require("./models/UserModel");

const app = express();

setup({ expressApp: app });

/*
app.listen(process.env.PORT, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(
    `Your server is ready and running at http://localhost:${process.env.PORT}!`
  );
})
*/

//var io = require('socket.io');

const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: { origin: "http://localhost:3000", methods: ["*"] },
});

io.on("connection", (socket) => {
  let room = "";

  socket.on("Start_Chat", function (data) {
    socket_rooms = socket.rooms;
    //Allow user to join only 1 chat room at a time
    if (socket_rooms.size <= 1) {
      room = data.friend_request_id;
      socket.join(room);

      socket.to(room).emit("user_join");
      //As chat is only between 2 users, if any other socket is already is in room than it will know another person has joined.
    }
  });

  socket.on("message", function (data) {
    //data = [sender_id, message];
    socket.to(room).emit("message", data);
  });

  socket.on("disconnect", function (reason) {
    socket.to(room).emit("user_leave");
    socket.leave(room);
  });

  socket.on("connect_error", (err) => {
    console.log(`connect_error due to ${err.message}`);
  });
});

UserModel.resetPassword({user_id: 3});

httpServer.listen(process.env.PORT, (err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(
    `Your server is ready and running at http://localhost:${process.env.PORT}!`
  );
});
