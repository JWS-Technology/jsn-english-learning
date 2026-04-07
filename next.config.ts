import type { NextConfig } from "next";

const nextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb", // Set your desired limit here
    },
  },
};
export default nextConfig;
