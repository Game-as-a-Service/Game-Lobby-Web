import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const { nickname } = req.body;
    if (nickname.toLowerCase().match(/error|null/i))
      return res.status(500).json({ message: "Mock Server Error" });
    return res.json({
      ...req.body,
      nickname,
    });
  } else if (req.method === "PUT") {
    const { nickname } = req.body;
    if (nickname === "error")
      return res.status(500).json({ message: "Mock Server Error" });
    return res.json({
      ...req.body,
      nickname,
    });
  } else {
    throw new Error("Invalid method!");
  }
}
