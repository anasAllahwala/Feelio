import React, { useState } from "react";
import { Input } from ".";
import { PostsApi } from "../../api";
import { useIsOwner } from "../../hooks";
import moment from "moment";
import { Link } from "react-router-dom";
import { API } from "../../constants";

const Post = ({ post, refresh }) => {
  const { user_id, name, posted_at, post_id, image_url, body } = post;
  const isOwner = useIsOwner(user_id);

  const [editing, setEditing] = useState(false);
  const [editedBody, setEditedBody] = useState(body);

  function deletePost() {
    PostsApi.destroy({ post_id }).then(({ data }) => {
      if (data.headers.error.toString() === "0") {
        alert("Post deleted!");
        refresh();
      }
    });
  }

  function editPost() {
    setEditing(true);
  }

  function cancelEdit() {
    setEditing(false);
  }

  function saveEdit() {
    PostsApi.edit({ post_id, body: editedBody })
      .then(({ data }) => {
        if (data.headers.error.toString() === "0") {
          alert("Post edited");
          refresh();
        }
      })
      .catch((e) => console.error(e))
      .finally(() => setEditing(false));
  }

  return (
    <div className="shadow-md rounded-lg my-5 border">
      <div className="flex items-center justify-between  p-5">
        <div className="flex items-center">
          <img
            src={API.BASE_URL + image_url}
            alt=""
            className="h-12 w-12 rounded-full shadow-md object-cover mr-2"
          />
          <div>
            <Link to={"/profile/" + user_id}>
              <h5 className="text-blue-600 font-semibold">{name}</h5>
            </Link>
            <p>{moment(posted_at).fromNow()}</p>
          </div>
        </div>
        {isOwner ? (
          <div>
            {editing ? (
              <div>
                <button
                  className="text-blue-500 mr-5"
                  onClick={() => saveEdit()}
                >
                  Save
                </button>{" "}
                <button
                  className="text-red-500 mr-5"
                  onClick={() => cancelEdit()}
                >
                  Cancel
                </button>
              </div>
            ) : (
              <div>
                <button
                  className="text-blue-500 mr-5"
                  onClick={() => editPost(post_id)}
                >
                  Edit
                </button>
                <button
                  className="text-red-500"
                  onClick={() => deletePost(post_id)}
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ) : null}
      </div>
      <hr />
      <div className=" p-5">
        {editing ? (
          <Input
            type="text"
            className="w-full"
            value={editedBody}
            onChange={(e) => setEditedBody(e.target.value)}
          />
        ) : (
          <p>{body}</p>
        )}
        {/* {image ? (
          <image src={image} alt="image" width="300" height="200" />
        ) : null} */}
      </div>
    </div>
  );
};

export default Post;
