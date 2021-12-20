import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { Chat, Chats, FriendRequests, Home, Login, Register } from "./views";
import { Navbar, RequireAuth } from "./components";

function App() {
  const [title, setTitle] = useState("Feelio");
  return (
    <div className="max-w-md lg:max-w-6xl m-auto py-5">
      <Navbar title={title} />
      <Routes>
        <Route
          path="/"
          element={
            <RequireAuth>
              <Home title={setTitle} />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/friends"
          element={
            <RequireAuth>
              <FriendRequests title={setTitle} />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/chats"
          element={
            <RequireAuth>
              <Chats title={setTitle} />
            </RequireAuth>
          }
        ></Route>
        <Route
          path="/chats/:chatId"
          element={
            <RequireAuth>
              <Chat title={setTitle} />
            </RequireAuth>
          }
        ></Route>
        <Route path="/register" element={<Register title={setTitle} />} />
        <Route path="/login" element={<Login title={setTitle} />} />
      </Routes>
    </div>
  );
}

export default App;
