import React, { useState } from "react";
import { PostsApi } from "../../api";
import { Button, Input } from "../../components";

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
        <div className="flex">
          <Input
            parentClass="flex-1"
            className="w-full h-full"
            type="text"
            name="post"
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
