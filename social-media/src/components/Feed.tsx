"use client";

import { useEffect, useState } from "react";
import Post from "./Post";
import { PostType } from "../types/post";

interface FeedProps {
  posts?: PostType[]; // Make posts optional
}

const Feed = ({ posts: propPosts }: FeedProps) => {
  const [posts, setPosts] = useState<PostType[]>(propPosts || []);
  const [loading, setLoading] = useState(!propPosts); // Only show loading if no props provided

  useEffect(() => {
    // Only fetch if no posts were provided as props
    if (!propPosts) {
      const fetchPosts = async () => {
        try {
          const res = await fetch("http://localhost:5000/api/posts");
          const data: PostType[] = await res.json();
          setPosts(data);
        } catch (error) {
          console.error("Failed to fetch posts:", error);
          setPosts([]);
        } finally {
          setLoading(false);
        }
      };

      fetchPosts();
    }
  }, [propPosts]);

  if (loading) return <div>Loading posts...</div>;
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
