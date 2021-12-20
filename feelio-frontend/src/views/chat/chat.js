import React, { useEffect } from "react";
import socketClient from "socket.io-client";
import { API } from "../../constants";

const Chat = ({ title }) => {
  useEffect(() => {
    let socket = socketClient(API.BASE_URL);
    socket.on("connect", () => {
      console.log(socket);
    });
  }, []);

  return (
    <div>
      <p></p>
    </div>
  );
};

export default Chat;
