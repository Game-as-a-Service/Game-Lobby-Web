import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return res.json({
      token: `refresh_jwt_token-${Math.floor(Math.random() * (100 - 1) + 1)}`,
    });
  }

  throw new Error("Invalid method!");
}
