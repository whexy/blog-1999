import type { NextApiRequest, NextApiResponse } from "next";
import { getRepoData } from "@/lib/github";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  const repo = query.repo as string;
  const data = await getRepoData(repo);

  if ("name" in data) {
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=600, stale-while-revalidate=60",
    );
    return res.status(200).json(data);
  } else {
    return res.status(404).json({ error: "API Error" });
  }
};
export default handle;
