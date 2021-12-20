import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { ChatsApi } from "../../api";
import { API } from "../../constants";
import { io } from "socket.io-client";
import { Button, Input } from "../../components";

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const params = useParams();

  const socket = useRef(null);

  useEffect(() => {
    socket.current = io(API.BASE_URL);
    socket.current.connect();

    socket.current.emit("Start_chat", { friend_request_id: params.chatId });

    ChatsApi.fetchMessages(params.chatId)
      .then(({ data }) => {
        if (data.headers.error.toString() === "0") {
          setMessages(Object.values(data.body));
        }
      })
      .catch((e) => console.error(e));

    return () => {
      socket.current.disconnect();
    };
  }, [params]);

  function sendMessage() {
    ChatsApi.sendMessage(params.chatId, message)
      .then(({ data }) => {
        if (data.headers.error.toString() === "0") {
          alert(data.headers.message);
        }
      })
      .catch((e) => console.error(e));
  }

  return (
    <div>
      {messages.map((message, key) => (
        <div key={key}>
          <p className="font-semibold">{message.name}</p>
          <p>{message.message}</p>
        </div>
      ))}
      <Input
        id="send-message"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <Button onClick={() => sendMessage()}>Send</Button>
    </div>
  );
};

export default Chat;
