import type { NextApiRequest, NextApiResponse } from "next";

import { mock_user } from "@/mocks/auth";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    return res.json(mock_user);
  }

  throw new Error("Invalid method!");
}
