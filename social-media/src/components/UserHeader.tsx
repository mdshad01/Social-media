"use client";

import Image from "next/image";
import { UserResource } from "@clerk/types";
import UserInfoCart from "./UserInfoCart";
import { useEffect } from "react";

const UserHeader = ({
  user,
  coverUrl,
  onCoverChange,
}: {
  user: UserResource;
  coverUrl?: string;
  onCoverChange?: (newUrl: string) => void;
}) => {
  useEffect(() => {
    console.log("🔄 UserHeader received updated coverUrl:", coverUrl);
  }, [coverUrl]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative h-60 w-full">
        <Image
          src={coverUrl || "https://images.pexels.com/photos/32637548/pexels-photo-32637548.jpeg"}
          alt="Cover"
          fill
          sizes="100vw"
          className="rounded-md object-cover transition-all duration-300"
        />
        <Image
          src={user.imageUrl}
          alt="Avatar"
          width={128}
          height={128}
          className="rounded-full object-cover w-32 h-32 absolute left-0 right-0 m-auto -bottom-16 ring-4 ring-white z-10"
        />
      </div>
      <span className="text-2xl font-semibold mt-16 mb-2">{user.fullName}</span>

      <UserInfoCart userId={user.id} currentUserId={user.id} onCoverChange={onCoverChange} />
    </div>
  );
};

export default UserHeader;
