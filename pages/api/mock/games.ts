import type { NextApiRequest, NextApiResponse } from "next";

export type GameType = {
  id: string;
  displayName: string;
  imageUrl: string;
  minPlayers: number;
  maxPlayers: number;
  category?: string;
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  return res.json([
    {
      id: "string",
      displayName: "string",
      imageUrl: "/undefined",
      minPlayers: 0,
      maxPlayers: 0,
      category: "戰略",
    },
    {
      id: "string2",
      displayName: "string",
      imageUrl: "/undefined",
      minPlayers: 0,
      maxPlayers: 0,
    },
    {
      id: "string3",
      displayName: "string",
      imageUrl: "/undefined",
      minPlayers: 0,
      maxPlayers: 0,
    },
    {
      id: "string4",
      displayName: "string",
      imageUrl: "/undefined",
      minPlayers: 0,
      maxPlayers: 0,
    },
    {
      id: "string5",
      displayName: "string",
      imageUrl: "/undefined",
      minPlayers: 0,
      maxPlayers: 0,
    },
    {
      id: "string6",
      displayName: "string",
      imageUrl: "/undefined",
      minPlayers: 0,
      maxPlayers: 0,
    },
    {
      id: "string7",
      displayName: "string",
      imageUrl: "/undefined",
      minPlayers: 0,
      maxPlayers: 0,
    },
    {
      id: "string8",
      displayName: "string",
      imageUrl: "/undefined",
      minPlayers: 0,
      maxPlayers: 0,
    },
    {
      id: "string9",
      displayName: "string",
      imageUrl: "/undefined",
      minPlayers: 0,
      maxPlayers: 0,
    },
  ]);
}
