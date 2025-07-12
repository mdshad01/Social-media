import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["img.clerk.com", "images.pexels.com", "www.pexels.com"], // ✅ all together
  },
};

export default nextConfig;
