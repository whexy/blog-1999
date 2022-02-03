import type { NextApiRequest, NextApiResponse } from "next";
import { getRepoData } from "@/lib/github";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  const repo = query.repo as string;
  const data = await getRepoData(repo);

  if (data && "name" in data) {
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
