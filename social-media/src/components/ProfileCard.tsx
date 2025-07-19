"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useClerkUser } from "./ClerkUserContext";
import Link from "next/link";

const fallbackCover = "/white.jpg";
const ProfileCard = () => {
  const user = useClerkUser();
  const [coverUrl, setCoverUrl] = useState<string>("");

  useEffect(() => {
    const fetchCoverUrl = async () => {
      if (!user) return;

      try {
        const res = await fetch(`http://localhost:5000/api/users/${user.id}`);
        if (!res.ok) throw new Error("User not found");

        const data = await res.json();
        setCoverUrl(data.cover || "");
      } catch (err) {
        console.error("❌ Failed to fetch cover URL:", err);
      }
    };

    fetchCoverUrl();
  }, [user]);

  if (!user) return null;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md flex flex-col gap-6">
      <div className="relative h-20">
        <Image src={coverUrl || fallbackCover} alt="cover" fill sizes="100vw" className="rounded-md object-cover" />
        <Image
          src={user.imageUrl || "/white.jpg"}
          alt="avatar"
          width={48}
          height={48}
          className="rounded-full object-cover w-12 h-12 absolute left-0 right-0 m-auto -bottom-6 ring-1 ring-white z-10"
        />
      </div>

      <div className="h-22 flex flex-col gap-2 items-center">
        <span className="text-xl font-semibold">{user.fullName}</span>
        <span className="text-sm text-gray-500">@{user.username || user.id}</span>
        <Link href={`/profile/${user.username || user.id}`}>
          <button className="bg-blue-500 text-white text-xs p-2 rounded-md">My Profile</button>
        </Link>
      </div>
    </div>
  );
};

export default ProfileCard;
