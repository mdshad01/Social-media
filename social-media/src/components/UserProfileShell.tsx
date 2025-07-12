"use client";

import { useUser } from "@clerk/nextjs";
import { useEffect } from "react";
import UserHeader from "@/src/components/UserHeader";

const UserProfileShell = ({ setUserId }: { setUserId: (id: string) => void }) => {
  const { user, isLoaded } = useUser();

  useEffect(() => {
    console.log("🟡 useEffect running...");
    console.log("Clerk Loaded:", isLoaded, "User:", user);

    const syncUserToBackend = async () => {
      if (!user) return;

      console.log("🟢 Sending POST to /api/users with:", user);

      try {
        const res = await fetch("http://localhost:5000/api/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            clerkId: user.id,
            username: user.username || user.id,
            name: user.fullName,
            avatar: user.imageUrl,
            cover: "",
            description: "",
            city: "",
            school: "",
            work: "",
            website: "",
          }),
        });

        if (!res.ok) {
          console.error("❌ Request failed:", await res.text());
        } else {
          console.log("✅ User synced to backend!");
        }
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

  return <UserHeader user={user} />;
};

export default UserProfileShell;
