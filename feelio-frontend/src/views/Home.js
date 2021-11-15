import { Post } from "../components";

const Posts = [
  {
    id: 1,
    owner: "Hello",
    image: "image.jpg",
    post: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore veniam pariatur vero magnam officia dolor fugiat porro cumque. Tempora, suscipit.",
  },
  {
    id: 2,
    owner: "Hello",
    image: "image.jpg",
    post: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore veniam pariatur vero magnam officia dolor fugiat porro cumque. Tempora, suscipit.",
  },
  {
    id: 3,
    owner: "Hello",
    image: "image.jpg",
    post: "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore veniam pariatur vero magnam officia dolor fugiat porro cumque. Tempora, suscipit.",
  },
];

const Home = () => {
  return (
    <div>
      {Posts.length ? (
        Posts.map((post) => (
          <Post owner={post.owner} post={post.post} image={post.image} />
        ))
      ) : (
        <p>No Posts found!</p>
      )}
    </div>
  );
};

export default Home;
