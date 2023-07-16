import { NextApiRequest, NextApiResponse } from "next";
import { Server as NetServer, Socket } from "net";
import { Server as SocketIOServer, Server as ServerIO } from "socket.io";
import { Server as HttpServer } from "http";
import { SOCKET_URL } from "../../../../contexts/SocketContext";
import { SOCKET_EVENT } from "../../../../containers/provider/SocketProvider";

export type NextApiResponseServerIO = NextApiResponse & {
  socket: Socket & {
    server: NetServer & {
      io: SocketIOServer;
    };
  };
};

export const config = {
  api: {
    bodyParser: false,
  },
};

const socketio = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    console.log("First connect on socket.io");
    const httpServer: HttpServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: SOCKET_URL,
      addTrailingSlash: false,
    });
    io.on(SOCKET_EVENT.CONNECTION_OPEN, () => {
      console.log("SOCKET CONNECTED!");
    });

    res.socket.server.io = io;
  } else {
    console.log("Socket.io already running");
  }
  res.end();
};

export default socketio;
