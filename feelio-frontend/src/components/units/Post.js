import { PostsApi } from "../../api";

const Post = ({ post }) => {
  const { owner, posted_at, post_id, image, body } = post;

  function deletePost(post_id) {
    PostsApi.destroy({ post_id }).then(({ data }) => {
      if (data.headers.error.toString() === "0") {
        console.log(data);
        alert("Post deleted!");
      }
    });
  }

  return (
    <div className="shadow-md">
      <div className="flex justify-between  p-5">
        <div>
          <h5>{owner}</h5>
          <p>{posted_at}</p>
        </div>
        <button className="text-red-500" onClick={() => deletePost(post_id)}>
          Delete
        </button>
      </div>
      <hr />
      <div className=" p-5">
        <p>{body}</p>
        {image ? (
          <image src={image} alt="image" width="300" height="200" />
        ) : null}
      </div>
    </div>
  );
};

export default Post;
