import { useEffect, useState } from "react";
import { Post } from "../components";
import { PostsApi } from "../api";
import { useApi } from "../hooks";
import { Outlet } from "react-router";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { result } = useApi(PostsApi.fetch, null, null);

  useEffect(() => {
    if (result) setPosts(Object.values(result));
  }, [result]);

  return (
    <div>
      {posts.length ? (
        posts.map((post) => (
          <Post owner={post.user_id} post={post.body} image={post.image} />
        ))
      ) : (
        <p>No Posts found!</p>
      )}
      <Outlet />
    </div>
  );
};

export default Home;
