import { useEffect, useState } from "react";
import { Post } from "../components";
import { PostsApi } from "../api";
import { useApi } from "../hooks";
import { CreatePost } from ".";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const { result } = useApi(PostsApi.fetch, null, null);

  useEffect(() => {
    if (result) setPosts(Object.values(result));
  }, [result]);

  return (
    <div>
      <div className="flex justify-between">
        <h1 className="font-semibold text-xl">Home Page</h1>
      </div>
      <div className="mt-2">
        <CreatePost />
      </div>
      <div className="mt-2">
        {posts.length ? (
          posts.map((post, key) => (
            <div>
              <Post key={key} post={post} />
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
