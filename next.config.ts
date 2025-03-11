import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [{ hostname: 'github.com' }, { hostname: 'i.pravatar.cc' }]
  },
};

export default nextConfig;
