"use client";

import Image from "next/image";
import { UserResource } from "@clerk/types";
import { useEffect, useState } from "react";

const UserHeader = ({ user, coverUrl }: { user: UserResource; coverUrl?: string }) => {
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    setImageLoaded(false);
  }, [coverUrl]);

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <div className="relative h-68 w-full">
        {!imageLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
            <span className="text-gray-500 text-sm">Loading cover...</span>
          </div>
        )}

        <Image
          src={coverUrl || "/white.jpg"}
          alt="Cover"
          fill
          sizes="100vw"
          className="rounded-md object-cover transition-all duration-300"
          onLoad={() => {
            setImageLoaded(true);
          }}
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
    </div>
  );
};

export default UserHeader;
