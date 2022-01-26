// eslint-disable-next-line @typescript-eslint/no-var-requires
const { withContentlayer } = require("next-contentlayer");

/**
 * @type {import('next').NextConfig}
 */
module.exports = withContentlayer()({
  reactStrictMode: true,
  images: {
    domains: [
      "avatars.githubusercontent.com", // Github Avatars
      "i.scdn.co", // Spotify Album Art
    ],
  },
  webpack: (config) => {
    // Turn SVGs to components
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    config.resolve.fallback = { fs: false, path: false, child_process: false };
    return config;
  },
});
