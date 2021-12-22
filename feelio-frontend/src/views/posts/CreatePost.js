import React, { useState } from "react";
import { PostsApi } from "../../api";
import { Button } from "../../components";

const CreatePost = ({ refresh }) => {
  const [post, setPost] = useState("");

  function handleSubmit(ev) {
    ev.preventDefault();

    PostsApi.create({ body: post }).then(({ data }) => {
      if (data.headers.error.toString() === "0") {
        alert("Post Created!");
        setPost("");
        refresh();
      }
    });
  }

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="flex overflow-hidden rounded-md focus-within:shadow-lg">
          <input
            className="rounded-l-md rounded-r-none flex-1"
            type="text"
            name="post"
            autoComplete="off"
            value={post}
            onChange={(e) => setPost(e.target.value)}
          />
          <Button className="bg-blue-500 text-white">Create Post</Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePost;
