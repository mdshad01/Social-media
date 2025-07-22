"use client";

import Image from "next/image";
import React, { useState } from "react";
import Comments from "./Comments";
import { PostTypeWithAuthor } from "../types/post";

const Post = ({ post }: { post: PostTypeWithAuthor }) => {
  const { description, mediaUrl, type, authorInfo } = post;
  const [like, setLike] = useState(false);

  // console.log("📸 mediaUrl:", mediaUrl, "type:", type);

  return (
    <div className="flex flex-col gap-4">
      {/* USER INFO */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Image
            src={authorInfo?.avatar || "/white.jpg"}
            alt="avatar"
            width={40}
            height={40}
            className="w-10 h-10 rounded-full object-cover"
          />
          <span className="font-medium">{authorInfo?.name || "Unknown User"}</span>
        </div>
        <Image src="/more.png" alt="more" width={16} height={16} />
      </div>

      {/* MEDIA AND TEXT */}
      <div className="flex flex-col gap-4">
        {type === "photo" && mediaUrl?.startsWith("https") && (
          <div className="relative w-full aspect-[1/1] rounded-md overflow-hidden">
            <Image
              src={mediaUrl}
              alt="post image"
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 800px"
            />
          </div>
        )}

        {type === "video" && mediaUrl && <video controls src={mediaUrl} className="w-full rounded-md max-h-[500px]" />}

        {(type === "photo" || type === "video") && !mediaUrl && (
          <p className="text-sm text-red-400">⚠️ Media failed to upload</p>
        )}

        {description && <p className="text-sm text-gray-700">{description}</p>}
      </div>

      {/* ACTION BUTTONS */}
      <div className="flex items-center justify-between text-sm mb-4">
        <div className="flex gap-8">
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
            <div onClick={() => setLike(!like)} className="cursor-pointer">
              {like ? (
                <Image src="/liked.png" alt="like" width={16} height={16} />
              ) : (
                <Image src="/like.png" alt="like" width={16} height={16} />
              )}
            </div>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">0 Likes</span>
          </div>
          <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
            <Image src="/comment.png" alt="comment" width={16} height={16} />
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">0 Comments</span>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-slate-50 p-2 rounded-xl">
          <Image src="/share.png" alt="share" width={16} height={16} />
          <span className="text-gray-300">|</span>
          <span className="text-gray-500">0 Shares</span>
        </div>
      </div>

      {/* COMMENTS */}
      <Comments />
    </div>
  );
};

export default Post;
