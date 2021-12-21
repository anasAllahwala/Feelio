import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Auth, FriendsApi, PostsApi } from "../../api";
import { Post } from "../../components";
import { useAuth } from "../../hooks";

const Profile = ({ title }) => {
  useEffect(() => {
    title("Profile");
  }, [title]);

  let params = useParams();
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [currUser, setCurrUser] = useState(null);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    let currUserId = null;

    if (params.diff_user) {
      currUserId = params.diff_user;

      Auth.Profile({ user: params.diff_user })
        .then(({ data }) => {
          if (data.headers.error.toString() === "0") {
            setCurrUser(data.body);
          }
        })
        .catch((e) => console.error(e));
    } else if (user) {
      currUserId = user.user_id;
      setCurrUser(user);
    }

    if (currUserId) {
      PostsApi.fetchMyPosts({ user: currUserId })
        .then(({ data }) => {
          if (data.headers.error.toString() === "0") {
            setPosts(Object.values(data.body));
          }
        })
        .catch((e) => console.error(e));

      FriendsApi.fetchFriendsByUser({ user: currUserId })
        .then(({ data }) => {
          if (data.headers.error.toString() === "0") {
            setFriends(Object.values(data.body));
          }
        })
        .catch((e) => console.error(e));
    }
  }, [user, params]);

  return (
    <div>
      {currUser && (
        <div>
          <h1 className="text-2xl text-center my-5">{currUser.name}</h1>
          <div className="flex justify-center my-2">
            <h2 className="text-xl mx-2">
              {friends.length} Friend{friends.length !== 1 ? "s" : ""}
            </h2>
            <h2 className="text-xl mx-2">
              {posts.length} Post{posts.length !== 1 ? "s" : ""}
            </h2>
          </div>
          {posts.map((post, key) => (
            <Post post={post} key={key} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Profile;
