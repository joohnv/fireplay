import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true, // Activa el modo estricto de React
  eslint: {
    ignoreDuringBuilds: true, 
  },
};

export default nextConfig;
