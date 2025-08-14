// eslint-disable-next-line @typescript-eslint/no-var-requires
/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com", // Github Avatars
      },
      {
        protocol: "https",
        hostname: "opengraph.githubassets.com", // Github OpenGraph
      },
      {
        protocol: "https",
        hostname: "i.scdn.co", // Spotify Album Art
      },
      {
        protocol: "https",
        hostname: "img.foreverblog.cn", // Forever Blog
      },
      {
        protocol: "https",
        hostname: "img.cdn.whexy.com", // gallery
      },
      {
        protocol: "https",
        hostname: "**.mzstatic.com", // Apple music
      },
      {
        protocol: "https",
        hostname: "**.hdslb.com", // bilibili
      },
    ],
  },
};
