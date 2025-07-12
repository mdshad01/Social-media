"use client";

import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

interface User {
  username: string;
  name: string;
  avatar?: string;
  description?: string;
  city?: string;
  school?: string;
  work?: string;
  website?: string;
  createdAt?: string;
}

const UserInfoCart = ({ userId }: { userId: string }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${userId}`);
        const data = await res.json();
        setUser(data);
      } catch (err) {
        console.error("Failed to load user info", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  if (loading) return <div className="p-4 bg-white rounded-lg shadow-md">Loading user info...</div>;
  if (!user) return <div className="p-4 bg-white rounded-lg shadow-md">User not found.</div>;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-2">
      {/* TOP */}
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-500">User Information</span>
        <Link href="/" className="text-blue-500 text-xs">
          See all
        </Link>
      </div>

      {/* NAME */}
      <div className="flex gap-2 items-center mt-2">
        <span className="text-xl font-medium">{user.name}</span>
        <span className="text-gray-500 font-medium">@{user.username}</span>
      </div>

      {user.description && <p>{user.description}</p>}

      <div className="flex flex-col gap-4">
        {user.city && (
          <div className="flex gap-2 items-center">
            <Image src="/map.png" alt="" width={16} height={16} className="w-4 h-4" />
            <span className="text-gray-500">
              Living in <b>{user.city}</b>
            </span>
          </div>
        )}

        {user.school && (
          <div className="flex gap-2 items-center">
            <Image src="/school.png" alt="" width={16} height={16} className="w-4 h-4" />
            <span className="text-gray-500">
              Went to <b>{user.school}</b>
            </span>
          </div>
        )}

        {user.work && (
          <div className="flex gap-2 items-center">
            <Image src="/work.png" alt="" width={16} height={16} className="w-4 h-4" />
            <span className="text-gray-500">
              Works at <b>{user.work}</b>
            </span>
          </div>
        )}

        <div className="flex items-center justify-between">
          {user.website && (
            <div className="flex gap-1 items-center">
              <Image src="/link.png" alt="" width={16} height={16} className="w-4 h-4" />
              <span className="text-blue-500 font-medium cursor-pointer">
                {user.website.replace(/^https?:\/\//, "")}
              </span>
            </div>
          )}

          {user.createdAt && (
            <div className="flex gap-1 items-center">
              <Image src="/date.png" alt="" width={16} height={16} className="w-4 h-4" />
              <span className="text-gray-500 font-medium">
                Joined{" "}
                {new Date(user.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          )}
        </div>

        <button className="bg-blue-500 text-white w-full p-2 font-medium rounded-md cursor-pointer">Following</button>
        <button className="text-red-400 text-xs self-end font-medium cursor-pointer">Block User</button>
      </div>
    </div>
  );
};

export default UserInfoCart;
