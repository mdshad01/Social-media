"use client";

import React from "react";
import { useUser } from "@clerk/nextjs";
import FriendRequests from "./FriendRequests";
import Birthdays from "./Birthdays";
import Ad from "./Ad";
import UserInfoCart from "./UserInfoCart";
import UserMediaCart from "./UserMediaCart";

const RightMenu = ({ userId }: { userId?: string }) => {
  const { user: clerkUser, isLoaded } = useUser();

  if (!isLoaded || !clerkUser) return null;

  return (
    <div className="flex flex-col gap-6">
      {userId ? (
        <>
          <UserInfoCart userId={userId} currentUserId={clerkUser.id} />
          <UserMediaCart userId={userId} />
        </>
      ) : null}
      <FriendRequests />
      <Birthdays />
      <Ad size="md" />
    </div>
  );
};

export default RightMenu;
