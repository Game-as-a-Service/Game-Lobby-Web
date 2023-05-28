import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.json([
    {
      id: "string",
      displayName: "string",
      imageUrl: "/undefined",
      minPlayers: 3,
      maxPlayers: 5,
      category: "戰略",
    },
    {
      id: "string2",
      displayName: "string2",
      imageUrl: "/undefined",
      minPlayers: 2,
      maxPlayers: 7,
    },
    {
      id: "string3",
      displayName: "string3",
      imageUrl: "/undefined",
      minPlayers: 1,
      maxPlayers: 9,
    },
    {
      id: "string4",
      displayName: "string4",
      imageUrl: "/undefined",
      minPlayers: 7,
      maxPlayers: 8,
    },
    {
      id: "string5",
      displayName: "string5",
      imageUrl: "/undefined",
      minPlayers: 1,
      maxPlayers: 1,
    },
    {
      id: "string6",
      displayName: "string6",
      imageUrl: "/undefined",
      minPlayers: 1,
      maxPlayers: 10,
    },
    {
      id: "string7",
      displayName: "string7",
      imageUrl: "/undefined",
      minPlayers: 2,
      maxPlayers: 6,
    },
    {
      id: "string8",
      displayName: "string8",
      imageUrl: "/undefined",
      minPlayers: 5,
      maxPlayers: 9,
    },
    {
      id: "string9",
      displayName: "string9",
      imageUrl: "/undefined",
      minPlayers: 4,
      maxPlayers: 9,
    },
  ]);
}
