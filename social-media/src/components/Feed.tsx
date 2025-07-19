// app/components/Feed.tsx
import FeedClient from "./FeedClient"; // this will be the Client Component
import { PostType } from "@/types/post";

const Feed = async () => {
  const res = await fetch("http://localhost:5000/api/posts", {
    cache: "no-store",
  });

  const posts: PostType[] = await res.json();

  if (!posts.length) return <div>No posts yet.</div>;

  return <FeedClient posts={posts} />;
};

export default Feed;
