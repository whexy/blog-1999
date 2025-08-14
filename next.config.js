// eslint-disable-next-line @typescript-eslint/no-var-requires
/**
 * @type {import('next').NextConfig}
 */
module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      new URL('https://avatars.githubusercontent.com/**'),
      new URL('https://opengraph.githubassets.com/**'),
      new URL('https://i.scdn.co/**'),
      new URL('https://img.foreverblog.cn/**'),
      new URL('https://img.cdn.whexy.com/**'),
      new URL('https://is1-ssl.mzstatic.com/**'),
      new URL('https://is2-ssl.mzstatic.com/**'),
      new URL('https://is3-ssl.mzstatic.com/**'),
      new URL('https://is4-ssl.mzstatic.com/**'),
      new URL('https://is5-ssl.mzstatic.com/**'),
      new URL('https://i1.hdslb.com/**'),
      new URL('http://i1.hdslb.com/**'),
    ],
  },
};
