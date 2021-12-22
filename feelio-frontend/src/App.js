import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import {
  FriendRequests,
  Home,
  Login,
  Profile,
  Register,
  AdminUsers,
  AdminPosts,
  Chat as ChatView,
} from "./views";
import { Navbar, RequireAuth, RequireAdmin, Chat } from "./components";
import { useAuth } from "./hooks";

function App() {
  const [title, setTitle] = useState("Feelio");
  const { user, isLoading, friends } = useAuth();
  const [chats, setChats] = useState([]);
  const [chatVisible, setChatVisibility] = useState(false);
  const [active, setActive] = useState("home");

  function closeChat(chatId) {
    let currentChats = [...chats];
    let chatIndex;
    chats.forEach((chat, index) => {
      if (chat.chatId === chatId) {
        chatIndex = index;
      }
    });

    currentChats.splice(chatIndex, 1);
    setChats(currentChats);
  }

  function chatContainer(chat, key) {
    return (
      <Chat key={key} close={closeChat} chatId={chat.chatId} title={chat.name}>
        <ChatView friend_request_id={chat.chatId} />
      </Chat>
    );
  }

  function addChat({ friend_request_id, friend_name }) {
    let check = chats.some((chat) => {
      return chat.chatId === friend_request_id;
    });

    if (check) return;

    setChats((chat) => [
      ...chat,
      {
        chatId: friend_request_id,
        name: friend_name,
      },
    ]);
  }

  function friendsContainer() {
    return (
      <div className="fixed bottom-0 right-0 bg-white">
        <div className="flex justify-evenly items-end">
          {chats.map((chat, key) => chatContainer(chat, key))}
          <div className="relative w-80">
            {chatVisible ? (
              <div className="border w-full">
                {friends.map((friend, key) => (
                  <button
                    onClick={() => addChat(friend)}
                    key={key}
                    className="py-2 px-5 border-b block w-full text-left"
                  >
                    {friend.friend_name}
                  </button>
                ))}
              </div>
            ) : null}
            <button
              onClick={() => setChatVisibility(!chatVisible)}
              className="border px-5 w-full  h-10 flex items-center"
            >
              <h1 className="font-semibold">Chats</h1>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navbar title={title} active={active} />
      <div className="max-w-md lg:max-w-6xl m-auto py-5">
        <Routes>
          <Route
            path="/"
            element={
              <RequireAuth>
                <Home title={setTitle} active={setActive} />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/profile"
            element={
              <RequireAuth>
                <Profile title={setTitle} active={setActive} />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/profile/:diff_user"
            element={
              <RequireAuth>
                <Profile title={setTitle} active={setActive} />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/friends"
            element={
              <RequireAuth>
                <FriendRequests title={setTitle} active={setActive} />
              </RequireAuth>
            }
          ></Route>
          <Route
            path="/admin-panel"
            element={<RequireAdmin active={setActive} />}
          >
            <Route index element={<AdminUsers title={setTitle} />} />
            <Route path="posts" element={<AdminPosts title={setTitle} />} />
          </Route>

          <Route path="/register" element={<Register title={setTitle} />} />
          <Route path="/login" element={<Login title={setTitle} />} />
        </Routes>

        {user && !isLoading && friendsContainer()}
      </div>
    </div>
  );
}

export default App;
