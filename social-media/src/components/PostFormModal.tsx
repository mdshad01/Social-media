"use client";
import React, { useRef, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

const PostFormModal = ({ user, onClose }: { user: any; onClose: () => void }) => {
  const [type, setType] = useState<"text" | "photo" | "video" | "poll" | "event">("text");
  const [content, setContent] = useState("");
  const [media, setMedia] = useState<string | null>(null);
  const [poll, setPoll] = useState({ option1: "", option2: "" });
  const [event, setEvent] = useState({ title: "", date: "" });
  const router = useRouter();

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleMediaSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setMedia(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  // NEW: Function to trigger file input with reset
  const triggerFileInput = (mediaType: "photo" | "video") => {
    setType(mediaType);

    // Reset the file input value to ensure fresh file dialog
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    // Small delay to ensure the reset happens before click
    setTimeout(() => {
      fileInputRef.current?.click();
    }, 10);
  };

  const handleSubmit = async () => {
    const postData: any = {
      type,
      description: content,
      authorId: user.id,
    };

    const file = fileInputRef.current?.files?.[0];
    if ((type === "photo" || type === "video") && file) {
      try {
        const cloudUrl = await uploadToCloudinary(file);
        postData.mediaUrl = cloudUrl;
      } catch (error) {
        console.error("❌ Cloudinary upload failed", error);
        return;
      }
    }

    if (type === "poll") postData.poll = poll;
    if (type === "event") postData.event = event;

    try {
      const res = await fetch("http://localhost:5000/api/posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(postData),
      });

      if (!res.ok) throw new Error("❌ Post upload failed");
      console.log("✅ Post created!");
      onClose();
      router.refresh();
    } catch (err) {
      console.error("🚨 Error submitting post:", err);
    }
  };

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "socialmedia_unsigned");

    const res = await fetch("https://api.cloudinary.com/v1_1/dqnwkn9rl/upload", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) throw new Error("Cloudinary upload failed");
    const data = await res.json();
    return data.secure_url;
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 bg-opacity-30 flex items-center justify-center px-2 sm:px-4">
      <div className="bg-white w-full max-w-xl rounded sm:rounded-lg shadow-xl p-6 sm:p-6 md:p-8 md:h-[52vh] overflow-y-auto max-h-[90vh] relative">
        <button
          onClick={onClose}
          className="absolute md:right-3 md:top-1 top-0 right-2 text-gray-500 hover:text-black text-xl">
          &times;
        </button>

        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="What do you want to talk about?"
          className="w-full p-3 rounded-md border border-gray-300 md:h-[30vh] focus:outline-none resize-none min-h-[100px] text-sm"
        />

        {type === "photo" && media && (
          <Image src={media} alt="Preview" width={500} height={250} className="rounded-md mt-4" />
        )}

        {type === "video" && media && <video controls src={media} className="w-full rounded-md mt-4" />}

        {type === "poll" && (
          <div className="flex flex-col gap-2 mt-4">
            <input
              value={poll.option1}
              onChange={(e) => setPoll({ ...poll, option1: e.target.value })}
              placeholder="Poll Option 1"
              className="border p-2 rounded text-sm"
            />
            <input
              value={poll.option2}
              onChange={(e) => setPoll({ ...poll, option2: e.target.value })}
              placeholder="Poll Option 2"
              className="border p-2 rounded text-sm"
            />
          </div>
        )}

        {type === "event" && (
          <div className="flex flex-col gap-2 mt-4">
            <input
              value={event.title}
              onChange={(e) => setEvent({ ...event, title: e.target.value })}
              placeholder="Event Title"
              className="border p-2 rounded text-sm"
            />
            <input
              type="date"
              value={event.date}
              onChange={(e) => setEvent({ ...event, date: e.target.value })}
              className="border p-2 rounded text-sm"
            />
          </div>
        )}

        {/* FILE UPLOADER - Updated accept attribute */}
        <input
          type="file"
          accept={type === "photo" ? "image/*" : type === "video" ? "video/*" : "*"}
          hidden
          ref={fileInputRef}
          onChange={handleMediaSelect}
        />

        {/* ICONS + SUBMIT - Updated click handlers */}
        <div className="flex justify-between items-center mt-4 md:mt-6 lg:mt-6 border-t pt-3 lg:pt-6 flex-wrap gap-y-2">
          <div className="flex gap-8">
            {[
              { label: "Photo", icon: "/addimage.png", type: "photo" },
              { label: "Video", icon: "/addvideo.png", type: "video" },
              { label: "Poll", icon: "/poll.png", type: "poll" },
              { label: "Event", icon: "/addevent.png", type: "event" },
            ].map((item) => (
              <div
                key={item.type}
                onClick={() => {
                  if (item.type === "photo" || item.type === "video") {
                    triggerFileInput(item.type as "photo" | "video");
                  } else {
                    setType(item.type as any);
                  }
                }}
                className="relative cursor-pointer group">
                <Image src={item.icon} alt={item.label} width={28} height={28} className="w-7 h-7" />
                <div className="absolute bottom-[-1.8rem] left-1/2 transform -translate-x-1/2 scale-0 group-hover:scale-100 transition-all bg-gray-800 text-white text-xs px-2 py-1 rounded">
                  {item.label}
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-1 rounded text-sm md:px-6 md:py-2 md:font-medium lg:px-8 hover:bg-blue-600">
            Post
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostFormModal;
