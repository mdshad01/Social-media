import Post from "./Post"; // This will be a client component
import { PostType } from "@/types/post"; // define this type properly or inline it

const Feed = async () => {
  const res = await fetch("http://localhost:5000/api/posts", {
    cache: "no-store",
  });
  const posts: PostType[] = await res.json();

  if (!posts.length) return <div>No posts yet.</div>;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default Feed;
