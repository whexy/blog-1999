module.exports = {
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ["@svgr/webpack"],
    });
    config.resolve.fallback = { fs: false, path: false, child_process: false };
    return config;
  },
  images: {
    domains: [
      "i.loli.net",
      "whexy-1251112473.cos.ap-shenzhen-fsi.myqcloud.com",
      "avatars.githubusercontent.com",
      "i.scdn.co",
    ],
  },
};
