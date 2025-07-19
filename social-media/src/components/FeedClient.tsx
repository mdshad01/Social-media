// app/components/FeedClient.tsx
"use client";

import Post from "./Post"; // Client component
import { PostType } from "@/types/post";

const FeedClient = ({ posts }: { posts: PostType[] }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex flex-col gap-12">
      {posts.map((post) => (
        <Post key={post._id} post={post} />
      ))}
    </div>
  );
};

export default FeedClient;
