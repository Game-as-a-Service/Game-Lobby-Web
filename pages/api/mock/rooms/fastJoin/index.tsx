import type { NextApiRequest, NextApiResponse } from "next";
import { wait } from "@/lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    if (req.method === "POST") {
      await wait(1000);
      return res.status(200).json({ roomId: "123" });
    }
  } catch (error) {
    return res.status(500).json({ message: error });
  }

  throw new Error("Invalid method!");
}
