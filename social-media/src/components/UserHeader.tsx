"use client";

import Image from "next/image";
import { UserResource } from "@clerk/types";

const UserHeader = ({ user }: { user: UserResource }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative h-60 w-full">
        <Image
          src="https://images.pexels.com/photos/32637548/pexels-photo-32637548.jpeg"
          alt="Cover"
          fill
          className="rounded-md object-cover"
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
      {/* follower/following etc. */}
    </div>
  );
};

export default UserHeader;
