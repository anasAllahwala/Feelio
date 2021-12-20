import React, { useState } from "react";

const Chat = (props) => {
  const [chatVisible, setChatVisibility] = useState(false);

  return (
    <div className="relative w-80">
      {chatVisible ? props.children : null}
      <button
        onClick={() => setChatVisibility(!chatVisible)}
        className="border px-5 w-full  h-10 flex items-center"
      >
        <div className="flex justify-between w-full">
          <h1 className="font-semibold">{props.title}</h1>
          <div onClick={() => props.close(props.chatId)}>&times;</div>
        </div>
      </button>
    </div>
  );
};

export default Chat;
