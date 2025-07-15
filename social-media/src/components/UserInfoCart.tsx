"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";

interface User {
  clerkId: string;
  username: string;
  name: string;
  avatar?: string;
  cover?: string;
  description?: string;
  city?: string;
  school?: string;
  work?: string;
  website?: string;
  createdAt?: string;
  followers?: string[];
}

const UserInfoCart = ({
  userId,
  currentUserId,
  onCoverChange,
}: {
  userId: string;
  currentUserId: string;
  onCoverChange?: (newUrl: string) => void;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState<Partial<User>>({});
  const [loading, setLoading] = useState(true);

  const isOwnProfile = userId === currentUserId;

  useEffect(() => {
    console.log("🧩 onCoverChange in UserInfoCart is:", typeof onCoverChange);
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${userId}`);
        const data = await res.json();
        setUser(data);
        setFormData(data);
      } catch (err) {
        console.error("❌ Failed to fetch user", err);
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/users/${user?.clerkId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const updated = await res.json();
      setUser(updated);
      setEditMode(false);

      console.log("✅ Cover in DB:", updated.cover);
      console.log("📤 onCoverChange firing:", !!onCoverChange);

      // Ensure we force update cover
      if (onCoverChange && updated.cover) {
        console.log("📤 Triggering cover update:", updated.cover);
        onCoverChange(updated.cover); // ← this updates the header image
      }
    } catch (err) {
      console.error("❌ Failed to update user", err);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formDataImg = new FormData();
    formDataImg.append("file", file);
    formDataImg.append("upload_preset", "socialmedia_unsigned");

    try {
      const res = await fetch("https://api.cloudinary.com/v1_1/dqnwkn9rl/image/upload", {
        method: "POST",
        body: formDataImg,
      });

      const data = await res.json();
      if (data.secure_url) {
        setFormData((prev) => ({ ...prev, cover: data.secure_url }));
      }
    } catch (err) {
      console.error("❌ Cloudinary error", err);
    }
  };

  if (loading) return <div className="p-4 bg-white rounded-lg shadow-md">Loading...</div>;
  if (!user) return <div className="p-4 bg-white rounded-lg shadow-md">User not found</div>;

  return (
    <div className="p-4 bg-white rounded-lg shadow-md text-sm flex flex-col gap-2">
      <div className="flex items-center justify-between font-medium">
        <span className="text-gray-500">User Information</span>
        {isOwnProfile && !editMode && (
          <button onClick={() => setEditMode(true)} className="text-blue-500 text-xs">
            Edit Profile
          </button>
        )}
      </div>

      {/* {!editMode && user.cover && (
        <Image src={user.cover} alt="Banner" width={600} height={150} className="rounded-md object-cover mb-4" />
      )} */}

      {editMode ? (
        <div className="flex flex-col gap-2">
          <input
            name="name"
            value={formData.name || ""}
            onChange={handleChange}
            placeholder="Full Name"
            className="border p-1 rounded"
          />
          <input
            name="username"
            value={formData.username || ""}
            onChange={handleChange}
            placeholder="Username"
            className="border p-1 rounded"
          />
          <label className="text-xs text-gray-600">Cover Image</label>
          <input type="file" accept="image/*" onChange={handleImageUpload} className="border p-1 rounded" />

          {formData.cover && (
            <Image
              src={formData.cover}
              alt="Cover preview"
              width={400}
              height={100}
              className="rounded-md object-cover my-2"
            />
          )}

          <textarea
            name="description"
            value={formData.description || ""}
            onChange={handleChange}
            placeholder="Description"
            className="border p-1 rounded"
          />
          <input
            name="city"
            value={formData.city || ""}
            onChange={handleChange}
            placeholder="City"
            className="border p-1 rounded"
          />
          <input
            name="school"
            value={formData.school || ""}
            onChange={handleChange}
            placeholder="School"
            className="border p-1 rounded"
          />
          <input
            name="work"
            value={formData.work || ""}
            onChange={handleChange}
            placeholder="Workplace"
            className="border p-1 rounded"
          />
          <input
            name="website"
            value={formData.website || ""}
            onChange={handleChange}
            placeholder="Website"
            className="border p-1 rounded"
          />

          <div className="flex gap-2 mt-2">
            <button onClick={handleSave} className="bg-blue-500 text-white p-2 rounded">
              Save
            </button>
            <button onClick={() => setEditMode(false)} className="bg-gray-300 text-black p-2 rounded">
              Cancel
            </button>
          </div>
        </div>
      ) : (
        <>
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
            {(user.website || user.createdAt) && (
              <div className="flex justify-between">
                {user.website && (
                  <div className="flex gap-1 items-center">
                    <Image src="/link.png" alt="" width={16} height={16} className="w-4 h-4" />
                    <span className="text-blue-500">{user.website.replace(/^https?:\/\//, "")}</span>
                  </div>
                )}
                {user.createdAt && (
                  <div className="flex gap-1 items-center">
                    <Image src="/date.png" alt="" width={16} height={16} className="w-4 h-4" />
                    <span className="text-gray-500">
                      Joined {new Date(user.createdAt).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
                    </span>
                  </div>
                )}
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default UserInfoCart;
