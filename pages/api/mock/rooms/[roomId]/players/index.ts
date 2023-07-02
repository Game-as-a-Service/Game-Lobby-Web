import type { NextApiRequest, NextApiResponse } from "next";
import { wait } from "@/lib/utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "POST") {
    await wait(800);

    if (req.body.password === "1234") {
      return res.json({ message: "success" });
    }

    return res.status(400).json({ message: "wrong password" });
  }
}
