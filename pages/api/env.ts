import { NextApiRequest, NextApiResponse } from "next";

import { getEnv } from "@/lib/env";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // TODO: Remove in prod env
  return res.json(getEnv());
}
