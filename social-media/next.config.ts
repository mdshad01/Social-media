import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "img.clerk.com", // ✅ Clerk avatars
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com", // ✅ default Cloudinary domain
      },
      {
        protocol: "https",
        hostname: "images.pexels.com", // if still used as fallback
      },
    ],
  },
};

export default nextConfig;
