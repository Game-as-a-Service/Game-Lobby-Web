import { mock_currentUser } from "@/mocks/auth";
import type { NextApiRequest, NextApiResponse } from "next";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method === "GET") {
    return res.json(mock_currentUser);
  } else if (req.method === "POST") {
    const { nickname } = req.body;
    if (nickname.toLowerCase().match(/error|null/i))
      return res.status(500).json({ message: "Mock Server Error" });
    return res.json({
      ...req.body,
      nickname,
    });
  } else if (req.method === "PUT") {
    const { nickname, email } = req.body;
    if (nickname === "error" || email === "test@error")
      return res.status(500).json({ message: "Mock Server Error" });
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return res.json({ ...req.body });
  } else {
    throw new Error("Invalid method!");
  }
}
