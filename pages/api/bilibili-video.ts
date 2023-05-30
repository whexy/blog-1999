import type { NextApiRequest, NextApiResponse } from "next";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  const bvid = query.bvid as string;
  const REPO_ENDPOINT = `https://api.bilibili.com/x/web-interface/view?bvid=`;
  const response = await fetch(`${REPO_ENDPOINT}${bvid}`);
  if (response.status !== 200) {
    return res.status(404).json({ error: "API Error" });
  }
  const data = await response.json();

  if (data && "data" in data) {
    // Backend server refresh status every 10 minutes,
    // while the cache is valid for 20 minutes.
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=1200, stale-while-revalidate=600",
    );
    return res.status(200).json(data);
  } else {
    return res.status(404).json({ error: "API Error" });
  }
};
export default handle;
