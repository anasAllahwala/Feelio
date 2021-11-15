import { PostsApi } from "../../api";

const Post = ({ post_id, owner, post, image }) => {
  function deletePost(post_id) {
    PostsApi.destroy({ post_id }).then(({ data }) => {
      if (data.headers.error.toString() === "0") {
        alert("Post deleted!");
      }
    });
  }

  return (
    <div>
      <div className="flex justify-between">
        <h5>{owner}</h5>
        <button onClick={() => deletePost(post_id)}>Delete</button>
      </div>
      <p>{post}</p>
      <image src={image} alt="image" width="300" height="200" />
    </div>
  );
};

export default Post;
