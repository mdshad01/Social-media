"use client";

import { useState } from "react";
import Feed from "@/components/Feed";
import LeftMenu from "@/components/LeftMenu";
import UserProfileShell from "@/components/UserProfileShell";
import RightMenu from "@/components/RightMenu";

const ProfilePage = () => {
  const [userId, setUserId] = useState<string>("");

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="profile" />
      </div>

      <div className="w-full lg:w-[70%] xl:w-[50%]">
        <div className="flex flex-col gap-6">
          <UserProfileShell setUserId={setUserId} />
          <Feed />
        </div>
      </div>

      <div className="hidden xl:block w-[30%]">
        <RightMenu userId={userId} />
      </div>
    </div>
  );
};

export default ProfilePage;
