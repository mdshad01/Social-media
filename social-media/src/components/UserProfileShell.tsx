"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";
import UserHeader from "./UserHeader";

const UserProfileShell = ({ setUserId }: { setUserId: (id: string) => void }) => {
  const { user, isLoaded } = useUser();
  const [coverUrl, setCoverUrl] = useState<string>("");

  useEffect(() => {
    const syncUserToBackend = async () => {
      if (!user) return;

      try {
        const check = await fetch(`http://localhost:5000/api/users/${user.id}`);
        const existing = check.ok ? await check.json() : null;

        setCoverUrl(existing?.cover || "");

        const payload = {
          clerkId: user.id,
          username: user.username || user.id,
          name: user.fullName,
          avatar: user.imageUrl,
          cover: existing?.cover || "",
          description: existing?.description || "",
          city: existing?.city || "",
          school: existing?.school || "",
          work: existing?.work || "",
          website: existing?.website || "",
        };

        await fetch("http://localhost:5000/api/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.error("❌ Request error:", err);
      }
    };

    if (isLoaded && user) {
      setUserId(user.id);
      syncUserToBackend();
    }
  }, [isLoaded, user, setUserId]);

  if (!isLoaded || !user) return <div>Loading...</div>;

  return (
    <div className="relative">
      <UserHeader user={user} coverUrl={coverUrl} />
    </div>
  );
};

export default UserProfileShell;
