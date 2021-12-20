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
        <h1 className="font-semibold">{props.title}</h1>
      </button>
    </div>
  );
};

export default Chat;
