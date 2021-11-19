import React, { useState } from "react";
import { Input } from ".";
import { PostsApi } from "../../api";
import { useIsOwner } from "../../hooks";
import moment from "moment";

const Post = ({ post, refresh }) => {
  const { user_id, name, posted_at, post_id, image, body } = post;
  console.log(user_id);
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
    <div className="shadow-md">
      <div className="flex justify-between  p-5">
        <div>
          <h5 className="text-blue-600 font-semibold">{name}</h5>
          <p>{moment(posted_at).fromNow()}</p>
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
        {image ? (
          <image src={image} alt="image" width="300" height="200" />
        ) : null}
      </div>
    </div>
  );
};

export default Post;
