import type { NextApiRequest, NextApiResponse } from "next";
import { mock_lobbyGames } from "@/mocks/lobby-games";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "GET") {
    const { page: reqPage = 1, perPage = 10 } = req.query;
    const games = mock_lobbyGames();

    const pageOpt = {
      page: Number(reqPage),
      perPage: Number(perPage),
      total: games.length,
    };

    const data = games.slice(
      (Number(reqPage) - 1) * Number(perPage),
      Number(reqPage) * Number(perPage)
    );

    return res.json({ data, page: pageOpt });
  }
}
