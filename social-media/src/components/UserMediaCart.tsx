"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface Post {
  mediaUrl: string;
  _id: string;
}

const UserMediaCart = ({ userId }: { userId: string }) => {
  const [media, setMedia] = useState<Post[]>([]);

  useEffect(() => {
    const fetchMedia = async () => {
      const res = await fetch(`http://localhost:5000/api/posts?authorId=${userId}`);
      const data = await res.json();
      setMedia(data.filter((post: Post) => post.mediaUrl)); // only posts with media
    };

    if (userId) fetchMedia();
  }, [userId]);

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm">
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-500">User Media</span>
      </div>

      <div className="flex flex-wrap mt-4 justify-between gap-4">
        {media.slice(0, 8).map((post) => (
          <div key={post._id} className="relative w-1/5 h-24">
            <Image src={post.mediaUrl} alt="media" fill className="object-cover rounded-md" />
          </div>
        ))}
        {media.length === 0 && <span className="text-gray-400 text-sm mt-4">No media uploaded yet.</span>}
      </div>
    </div>
  );
};

export default UserMediaCart;
