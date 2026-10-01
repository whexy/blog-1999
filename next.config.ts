import type { NextConfig } from "next";

const config: NextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
        pathname: "/u/**",
      },
      // Bilibili video thumbnails (URLs come from API data at runtime).
      new URL("https://i1.hdslb.com/**"),
      new URL("http://i1.hdslb.com/**"),
    ],
  },
};

export default config;
