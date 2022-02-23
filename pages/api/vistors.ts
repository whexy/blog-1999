import type { NextApiRequest, NextApiResponse } from "next";
import { getVisitors } from "@/lib/umami";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  const start = query.start as string;
  const end = query.end as string;
  const data = await getVisitors(start, end);

  if (data && "pageviews" in data) {
    res.setHeader(
      "Cache-Control",
      "public, s-maxage=300, stale-while-revalidate=120",
    );
    return res.status(200).json({ views: data.pageviews.value });
  } else {
    return res.status(404).json({ error: "API Error" });
  }
};

export default handle;
