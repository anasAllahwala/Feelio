import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Auth, FriendsApi, PostsApi } from "../../api";
import { Avatar, Post } from "../../components";
import { useAuth } from "../../hooks";

const Profile = ({ title, active }) => {
  useEffect(() => {
    title("Profile");
    active("");
  }, [title, active]);

  let params = useParams();
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [isFriend, setIsFriend] = useState(true);
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

  useEffect(() => {
    if (user && currUser) {
      if (currUser.user_id !== user.user_id) {
        let check = friends.some((friend) => {
          return friend.friend_id === user.user_id;
        });
        setIsFriend(check);
        console.log(friends);
      }
    }
  }, [friends, user, currUser]);

  function sendFriendRequest(user_id) {
    FriendsApi.sendFriendRequest({ friend_id: user_id })
      .then(({ data }) => {
        if (data.headers.error.toString() === "0") {
          alert(data.headers.message);
        }
      })
      .catch((e) => console.error(e));
  }

  return (
    <div>
      {currUser && (
        <div>
          <div className="flex justify-center">
            <Avatar name={currUser.name} image_url={currUser.image_url} size="large" />
          </div>
          <div className="flex justify-center items-center  my-5">
            <h1 className="text-2xl text-center">{currUser.name}</h1>
            {!isFriend && (
              <button
                onClick={() => sendFriendRequest(currUser.user_id)}
                className="bg-blue-600 text-white px-3 py-2 rounded-md  ml-5"
              >
                Add Friend
              </button>
            )}
          </div>
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
