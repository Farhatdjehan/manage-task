import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    esmExternals: "loose", // or 'loose' for better compatibility
  },
  transpilePackages: ["@react-pdf/renderer"],
};

export default nextConfig;
