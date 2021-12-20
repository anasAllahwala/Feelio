import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FriendsApi } from "../../api";
import { Button } from "../../components";

const Chats = ({ title }) => {
  const [friends, setFriends] = useState([]);
  let navigate = useNavigate();

  useEffect(() => {
    FriendsApi.fetchFriends()
      .then(({ data }) => {
        if (data.headers.error.toString() === "0") {
          setFriends(Object.values(data.body));
        }
      })
      .catch((e) => console.log(e));

    
  }, []);

  function startChat(friend_request_id) {
    navigate("/chats/" + friend_request_id);
  }

  return (
    <div>
      {friends.map((friend, key) => (
        <div key={key}>
          <p>{friend.friend_name}</p>
          <Button onClick={() => startChat(friend.friend_id)}>Message</Button>
        </div>
      ))}
    </div>
  );
};

export default Chats;
