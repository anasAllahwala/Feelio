import React, { useEffect, useState } from "react";
import { Chat, Post } from "../components";
import { FriendsApi, PostsApi } from "../api";
import { useApi } from "../hooks";
import { Chat as ChatView, CreatePost } from ".";

const Home = ({ title }) => {
  const [posts, setPosts] = useState([]);
  const [chats, setChats] = useState([]);
  const [chatVisible, setChatVisibility] = useState(false);
  const { result: friends, loading } = useApi(
    FriendsApi.fetchFriends,
    null,
    []
  );

  const { refresh, result } = useApi(PostsApi.fetch, null, null);

  useEffect(() => {
    title("Home");
    if (result) setPosts(Object.values(result));
  }, [result, title]);

  function chatContainer(chat) {
    console.log(chat);
    return (
      <Chat title={chat.name}>
        <ChatView friend_request_id={chat.chatId} />
      </Chat>
    );
  }

  function friendsContainer() {
    return (
      <div className="absolute bottom-0 right-0 ">
        <div className="flex justify-evenly items-end">
          {chats.map((chat) => chatContainer(chat))}
          <div className="relative w-80">
            {chatVisible ? (
              <div className="border w-full">
                {friends.map((friend, key) => (
                  <button
                    onClick={() =>
                      setChats((chat) => [
                        ...chat,
                        {
                          chatId: friend.friend_request_id,
                          name: friend.friend_name,
                        },
                      ])
                    }
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
      <div className="mt-2">
        <CreatePost refresh={refresh} />
      </div>
      <div className="mt-2">
        {posts.length ? (
          posts.map((post, key) => (
            <div key={key}>
              <Post post={post} refresh={refresh} />
              <hr className="m-5" />
            </div>
          ))
        ) : (
          <p>No Posts found!</p>
        )}
      </div>
      {friendsContainer()}
    </div>
  );
};

export default Home;
