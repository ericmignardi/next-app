import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "thispersondoesnotexist.com", // Replace with your target domain name
        port: "",
        pathname: "/**", // Matches all nested folder paths
      },
    ],
  },
};

export default nextConfig;
