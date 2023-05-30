import type { NextApiRequest, NextApiResponse } from "next";

import { mock_refreshToken } from "@/mocks/auth";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return res.json({
      token: mock_refreshToken(),
    });
  }

  throw new Error("Invalid method!");
}
