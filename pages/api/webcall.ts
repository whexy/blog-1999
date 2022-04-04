import { sendMessage } from "@/lib/telegram";
import type { NextApiRequest, NextApiResponse } from "next";

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query;
  const msg = query.msg as string;

  const response = await sendMessage(msg);
  if (response.status === 200) {
    return res.status(200).json({ status: "ok" });
  } else {
    return res.status(500).json({ status: "error" });
  }
};

export default handle;
