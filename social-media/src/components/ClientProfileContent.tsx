"use client";

import { useState } from "react";
import UserProfileShell from "./UserProfileShell";
import Feed from "./Feed";
import RightMenu from "./RightMenu";
import { PostType } from "../types/post";

interface ClientProfileContentProps {
  posts: PostType[];
}

const ClientProfileContent = ({ posts }: ClientProfileContentProps) => {
  const [userId, setUserId] = useState<string>("");

  return (
    <>
      {/* Main content column */}
      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <UserProfileShell setUserId={setUserId} />
          <Feed posts={posts} />
        </div>
      </div>

      {/* Right sidebar - back to its original position */}
      <div className="hidden xl:block w-[30%]">
        <RightMenu userId={userId} />
      </div>
    </>
  );
};

export default ClientProfileContent;
