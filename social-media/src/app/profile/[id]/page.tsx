// src/app/profile/[id]/page.tsx

import ClientProfileContent from "@/src/components/ClientProfileContent";
import LeftMenu from "@/src/components/LeftMenu";
import { PostType } from "@/src/types/post";

const ProfilePage = async () => {
  // Fetch posts at the server level
  const res = await fetch("http://localhost:5000/api/posts", {
    cache: "no-store",
  });
  const posts: PostType[] = await res.json();

  return (
    <div className="flex gap-6 pt-6">
      <div className="hidden xl:block w-[20%]">
        <LeftMenu type="profile" />
      </div>

      <ClientProfileContent posts={posts} />
    </div>
  );
};

export default ProfilePage;
