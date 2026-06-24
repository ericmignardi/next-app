import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image.mux.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
