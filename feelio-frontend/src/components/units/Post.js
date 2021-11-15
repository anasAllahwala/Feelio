const Post = ({ owner, post, image }) => {
  return (
    <div>
      <h5>{owner}</h5>
      <p>{post}</p>
      <image src={image} alt="image" width="300" height="200" />
    </div>
  );
};

export default Post;
