import React, { useEffect, useRef, useState } from "react";
import { ChatsApi } from "../../api";
import { API } from "../../constants";
import { io } from "socket.io-client";
import { Button } from "../../components";

const Chat = ({ friend_request_id }) => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");

  const socket = useRef(null);

  useEffect(() => {
    if (!socket.current) {
      socket.current = io(API.BASE_URL);
      socket.current.connect();

      socket.current.on("connect", () => {
        socket.current.emit("Start_Chat", { friend_request_id });

        socket.current.on("user_join", () => {
          console.log("User has joined!");
        });
        socket.current.on("message", (data) => {
          // console.log(data);
          setMessages((m) => [...m, data]);
        });
      });
    }

    ChatsApi.fetchMessages(friend_request_id)
      .then(({ data }) => {
        if (data.headers.error.toString() === "0") {
          setMessages(Object.values(data.body));
        }
      })
      .catch((e) => console.error(e));

    return () => {
      socket.current.disconnect();
    };
  }, [friend_request_id]);

  function sendMessage() {
    ChatsApi.sendMessage(friend_request_id, message)
      .then(({ data }) => {
        if (data.headers.error.toString() === "0") {
          socket.current.emit("message", data.body);
          setMessages((m) => [...m, data.body]);
        }
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setMessage("");
      });
  }

  return (
    <div className="border">
      <div className=" max-h-96 overflow-y-auto">
        {messages.map((message, key) => (
          <div className="py-2 px-5 border-b" key={key}>
            <p className="font-semibold">{message.name}</p>
            <p>{message.message}</p>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          id="send-message"
          type="text"
          className="flex-1"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <Button
          className="bg-blue-600 text-white"
          onClick={() => sendMessage()}
        >
          Send
        </Button>
      </div>
    </div>
  );
};

export default Chat;
