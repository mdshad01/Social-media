"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useClerkUser } from "./ClerkUserContext";
import Link from "next/link";
import CreatePost from "./CreatePost";
import PostFormModal from "./PostFormModal";

const Addpost = () => {
  const user = useClerkUser();
  const [showModal, setShowModal] = useState(false);
  if (!user) return;

  return (
    <div className="p-4 bg-white shadow-md rounded-lg flex gap-4 justify-between text-sm">
      {/* AVATAR */}
      <Link href={`/profile/${user.username || user.id}`}>
        <Image
          src={user.imageUrl || "/white.jpg"}
          alt=""
          height={48}
          width={48}
          className="w-12 h-12 object-cover rounded-full"
        />
      </Link>
      {/* POST */}
      <div className="flex-1">
        {/*  TEXT INPUT*/}
        <div className="flex gap-4" onClick={() => setShowModal(true)}>
          <textarea placeholder="What's on your mind?" className="bg-slate-100 rounded-lg flex-1 p-2"></textarea>
          <Image src="/emoji.png" alt="" height={20} width={20} className="w-5 h-5 cursor-pointer self-end" />
        </div>
        {/* POST OPTIONS */}
        <div className="flex items-center gap-4 mt-4 text-gray-400 flex-wrap">
          <div className="flex gap-2 items-center cursor-pointer">
            <Image src="/addimage.png" alt="" height={20} width={20} className="w-5 h-5 cursor-pointer self-end" />
            Photo
          </div>
          <div className="flex gap-2 items-center cursor-pointer">
            <Image src="/addvideo.png" alt="" height={20} width={20} className="w-5 h-5 cursor-pointer self-end" />
            Video
          </div>
          <div className="flex gap-2 items-center cursor-pointer">
            <Image src="/poll.png" alt="" height={20} width={20} className="w-5 h-5 cursor-pointer self-end" />
            Poll
          </div>
          <div className="flex gap-2 items-center cursor-pointer">
            <Image src="/addevent.png" alt="" height={20} width={20} className="w-5 h-5 cursor-pointer self-end" />
            Event
          </div>
        </div>
      </div>
      {/* Modal component */}
      {showModal && <PostFormModal user={user} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Addpost;
