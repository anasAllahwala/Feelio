import React, { useState } from "react";
import { Input } from ".";
import { PostsApi } from "../../api";
import { useIsOwner } from "../../hooks";
import moment from "moment";
import { Link } from "react-router-dom";
import { Avatar } from "..";
import { ICONS } from "../../constants";

const Post = ({ post, refresh }) => {
  const {
    user_id,
    name,
    posted_at,
    post_id,
    image_url,
    body,
    reacts,
    comments,
  } = post;
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
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center">
          <Avatar className="mr-2" name={name} image_url={image_url} />
          <div>
            <Link to={"/profile/" + user_id}>
              <h5 className="text-blue-600 font-semibold">{name}</h5>
            </Link>
            <p>{moment(posted_at).fromNow()}</p>
          </div>
        </div>
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="22"
            height="22"
            fill="currentColor"
            className="bi bi-three-dots-vertical"
            viewBox="0 0 16 16"
          >
            <path d="M9.5 13a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0zm0-5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
          </svg>
        </div>
        {/* {isOwner ? (
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
        ) : null} */}
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
        <div className="flex justify-end text-gray-800 text-sm">
          <p className="mr-2">{reacts} likes</p>
          <p>{comments} comments</p>
        </div>
      </div>
      <div className="flex items-center border-t-2">
        <button className="px-4 py-3 w-1/3 font-semibold text-gray-600 flex justify-center items-center transition-colors hover:bg-gray-100 duration-300">
          <ICONS.LikeIcon size={18} className="mr-1" />
          Like
        </button>
        <button className="px-4 py-3 w-1/3 font-semibold text-gray-600 flex justify-center items-center transition-colors hover:bg-gray-100 duration-300">
          <ICONS.CommentIcon size={16} className="self-end mr-2" />
          Comment
        </button>
        <button className="px-4 py-3 w-1/3 font-semibold text-gray-600 flex justify-center items-center transition-colors hover:bg-gray-100 duration-300">
          <ICONS.ShareIcon
            size={22}
            className="mr-1"
            style={{ transform: "rotateY(180deg)" }}
          />
          Share
        </button>
      </div>
    </div>
  );
};

export default Post;
