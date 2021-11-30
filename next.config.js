module.exports = {
  reactStrictMode: true,
  webpack5: true,
  webpack: (config) => {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  },
  images: {
    domains: ["i.loli.net", "whexy-1251112473.cos.ap-shenzhen-fsi.myqcloud.com"],
  },
};
