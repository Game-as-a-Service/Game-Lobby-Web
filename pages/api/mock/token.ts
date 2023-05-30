import type { NextApiRequest, NextApiResponse } from "next";

import { mock_loginToken } from "@/mocks/auth";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    return res.json({
      token: mock_loginToken,
    });
  }

  throw new Error("Invalid method!");
}
