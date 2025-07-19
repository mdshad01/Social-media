import Image from "next/image";
import React from "react";

const CreatePost = () => {
  return (
    <div className="flex top-0 bottom-0 left-0 right-0 bg-black/50">
      <form action="">
        <textarea name="" id=""></textarea>
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
      </form>
    </div>
  );
};

export default CreatePost;
