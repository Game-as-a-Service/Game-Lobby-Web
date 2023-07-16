import { NextApiRequest, NextApiResponse } from "next";
import { Server as NetServer, Socket } from "net";
import { Server as SocketIOServer, Server as ServerIO } from "socket.io";
import { Server as HttpServer } from "http";
import { SOCKET_EVENT, SOCKET_URL } from "@/contexts/SocketContext";

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

const onlineUsers = new Map<string, string>();
let isEmitting = false;
let sendOnlineUsers: NodeJS.Timeout;

const socketio = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    // eslint-disable-next-line no-console
    console.log("First connect on socket.io");
    const httpServer: HttpServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: SOCKET_URL,
      addTrailingSlash: false,
    });

    io.on(SOCKET_EVENT.CONNECT, (socket) => {
      // eslint-disable-next-line no-console
      console.log("SOCKET CONNECTED IN SERVER! ", socket.id);
      onlineUsers.set(socket.id, socket.id);

      socket.on(SOCKET_EVENT.CHAT_MESSAGE, (message) => {
        // eslint-disable-next-line no-console
        console.log("Message received in server: ", message);
        io.emit(SOCKET_EVENT.CHAT_MESSAGE, message);
      });
      socket.on(SOCKET_EVENT.DISCONNECT, () => {
        onlineUsers.delete(socket.id);
        // eslint-disable-next-line no-console
        console.log("SOCKET DISCONNECTED IN SERVER! ", socket.id);
        if (isEmitting && onlineUsers.size === 0) {
          clearInterval(sendOnlineUsers);
          isEmitting = false;
        }
        // avoid memory leak
        if (!isEmitting) {
          sendOnlineUsers = setInterval(
            () => console.log("Online users: ", onlineUsers),
            5000
          );
          isEmitting = true;
        }
      });
    });

    res.socket.server.io = io;
  } else {
    // eslint-disable-next-line no-console
    console.log("Socket.io already running");
  }
  res.end();
};

export default socketio;
