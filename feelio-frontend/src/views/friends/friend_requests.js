import React, { useState, useEffect } from "react";
import { FriendsApi } from "../../api";
import { Button } from "../../components/units";

const FriendRequests = ({ title }) => {
  const [friendRequests, setFriendRequests] = useState([]);

  useEffect(() => {
    title("Friend Requests");

    fetchFriendRequests();
  }, [title]);

  function fetchFriendRequests() {
    FriendsApi.fetchPendingRequests()
      .then(({ data }) => {
        if (data.headers.error.toString() === "0") {
          setFriendRequests(Object.values(data.body));
        }
      })
      .catch((e) => console.error(e));
  }

  function acceptFriendRequest(data) {
    FriendsApi.acceptFriendRequest(data)
      .then(({ data }) => {
        if (data.headers.error.toString() === "0") alert(data.headers.message);
      })
      .catch((e) => console.error(e))
      .finally(() => {
        fetchFriendRequests();
      });
  }

  function rejectFriendRequest(data) {
    FriendsApi.rejectFriendRequest(data)
      .then(({ data }) => {
        if (data.headers.error.toString() === "0") alert(data.headers.message);
      })
      .catch((e) => console.error(e))
      .finally(() => {
        fetchFriendRequests();
      });
  }

  return friendRequests.length > 0 ? (
    friendRequests.map((request, key) => (
      <div className="flex justify-between mt-2 items-center" key={key}>
        <div>
          <p>{request.sender_name}</p>
        </div>
        <div>
          <Button
            onClick={() =>
              acceptFriendRequest({
                friend_request_id: request.friend_request_id,
              })
            }
          >
            Accept
          </Button>
          <Button
            onClick={() =>
              rejectFriendRequest({
                friend_request_id: request.friend_request_id,
              })
            }
          >
            Reject
          </Button>
        </div>
      </div>
    ))
  ) : (
    <div>You have no pending friend requests.</div>
  );
};

export default FriendRequests;
