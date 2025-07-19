import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // ✅ Cloudinary
      },
      {
        protocol: "https",
        hostname: "img.clerk.com", // ✅ Clerk avatars
      },
      {
        protocol: "https",
        hostname: "images.pexels.com", // optional
      },
    ],
  },
};

export default nextConfig;
