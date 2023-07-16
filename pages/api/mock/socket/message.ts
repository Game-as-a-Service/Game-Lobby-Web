import { NextApiRequest, NextApiResponse } from "next";
import { Server as NetServer, Socket } from "net";
import { Server as SocketIOServer } from "socket.io";
import { MessageType } from "@/components/rooms/RoomChatroom";
import { SOCKET_EVENT } from "@/containers/provider/SocketProvider";

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

const message = (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (req.method === "POST") {
    const message: MessageType = req.body;

    if (
      !message.from ||
      !message.content ||
      !message.timestamp ||
      !message.to
    ) {
      res.status(400).json({ error: "Invalid message format" });
      return;
    }

    res?.socket?.server?.io?.emit(SOCKET_EVENT.CHAT_MESSAGE, message);

    res.status(201).json(message);
  }
};

export default message;
