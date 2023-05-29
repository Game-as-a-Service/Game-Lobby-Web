import type { NextApiRequest, NextApiResponse } from "next";

import { mock_loginEndpoint } from "@/mocks/auth";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.json({
      url: mock_loginEndpoint,
    });
  }

  throw new Error("Invalid method!");
}
