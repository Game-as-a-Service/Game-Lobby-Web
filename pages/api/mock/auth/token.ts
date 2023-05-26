import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return res.json({
      token: "init_jwt_token",
    });
  }

  throw new Error("Invalid method!");
}
