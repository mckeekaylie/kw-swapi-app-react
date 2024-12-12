import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    formats: ["image/avif", "image/webp"],
    loader: "default",
    minimumCacheTTL: 60,
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  webpack: (config) => {
    config.optimization.minimize = true;

    return config;
  },
};

export default nextConfig;
