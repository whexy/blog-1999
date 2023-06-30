export const getBilibiliData = async (bvid: string) => {
  const REPO_ENDPOINT = `https://api.bilibili.com/x/web-interface/view?bvid=`;
  const response = await fetch(`${REPO_ENDPOINT}${bvid}`);
  if (response.status !== 200) {
    return null;
  }
  return response.json();
};
