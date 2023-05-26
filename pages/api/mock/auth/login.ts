import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.json({
      url: "/auth/login",
    });
  }

  throw new Error("Invalid method!");
}
