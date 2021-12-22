import React, { useEffect, useState } from "react";
import { Button, Post } from "../components";
import { PostsApi } from "../api";
import { useApi } from "../hooks";
import { CreatePost } from ".";
import UsersApi from "../api/Users";
import { Link } from "react-router-dom";

const Home = ({ title }) => {
  const [posts, setPosts] = useState([]);
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");

  const { refresh, result } = useApi(PostsApi.fetch, null, null);

  useEffect(() => {
    title("Home");

    if (result) setPosts(Object.values(result));
  }, [result, title]);

  function searchBar() {
    return (
      <div>
        <div className="flex">
          <input
            type="search"
            value={search}
            className="flex-1"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button
            className="bg-green-600 text-white"
            onClick={() => filterUsers()}
          >
            Search Users
          </Button>
        </div>
        <div>
          {users.map((user, key) => (
            <Link key={key} to={"profile/" + user.user_id}>
              <div className="p-5 border w-full">{user.name}</div>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  function filterUsers() {
    UsersApi.fetchUsers({ name: search })
      .then(({ data }) => {
        if (data.headers.error.toString() === "0") {
          setUsers(Object.values(data.body));
        }
      })
      .catch((e) => console.error(e));
  }

  return (
    <div>
      {searchBar()}
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
