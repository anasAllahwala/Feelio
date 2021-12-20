import React, { useEffect, useState } from "react";
import { Post } from "../components";
import { PostsApi } from "../api";
import { useApi } from "../hooks";
import { CreatePost } from ".";

const Home = ({ title }) => {
  const [posts, setPosts] = useState([]);
  const { refresh, result } = useApi(PostsApi.fetch, null, null);

  useEffect(() => {
    title("Home");
    if (result) setPosts(Object.values(result));
  }, [result, title]);

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
    </div>
  );
};

export default Home;
