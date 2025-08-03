import { NextApiRequest, NextApiResponse } from "next";
import { Server as NetServer, Socket } from "net";
import { Server as SocketIOServer, Server as ServerIO } from "socket.io";
import { Server as HttpServer } from "http";
import { SOCKET_EVENT, SOCKET_URL } from "@/contexts/socket";

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

function registeringMiddleware(io: ServerIO) {
  io.use((socket, next) => {
    const token = socket.handshake.query.token;
    if (token == undefined) {
      next(new Error("not authorized"));
    } else {
      next();
    }
  });
}

const socketio = async (req: NextApiRequest, res: NextApiResponseServerIO) => {
  if (!res.socket.server.io) {
    // eslint-disable-next-line no-console
    console.log("First connect on socket.io");
    const httpServer: HttpServer = res.socket.server as any;
    const io = new ServerIO(httpServer, {
      path: SOCKET_URL,
      addTrailingSlash: false,
    });

    registeringMiddleware(io);

    io.on(SOCKET_EVENT.CONNECT, (socket) => {
      // eslint-disable-next-line no-console
      console.log("SOCKET CONNECTED IN SERVER! ", socket.id);
      onlineUsers.set(socket.id, socket.id);

      // avoid memory leak
      if (!isEmitting) {
        sendOnlineUsers = setInterval(
          // eslint-disable-next-line no-console
          () => console.log("Online users: ", onlineUsers),
          5000
        );
        isEmitting = true;
      }

      socket.on(SOCKET_EVENT.CHAT_MESSAGE, (message) => {
        switch (message.content) {
          case SOCKET_EVENT.USER_JOINED:
            socket.emit(SOCKET_EVENT.USER_JOINED, {
              user: {
                id: "mock_user_id",
                nickname: "mock_user",
              },
              roomId: message.to,
            });
            break;
          case SOCKET_EVENT.USER_LEFT:
            socket.emit(SOCKET_EVENT.USER_LEFT, {
              user: {
                id: "mock_user_id",
                nickname: "mock_user",
              },
              roomId: message.to,
            });
            break;
          case "KICK_ME":
            socket.emit(SOCKET_EVENT.USER_LEFT, {
              user: {
                id: "mock-currentUser-uid",
                nickname: "mock currentUser",
              },
              roomId: message.to,
            });
            break;
          case SOCKET_EVENT.HOST_CHANGED:
            socket.emit(SOCKET_EVENT.HOST_CHANGED, {
              user: {
                id: "mock-currentUser-uid-c",
                nickname: "mock user C",
              },
              roomId: message.to,
            });
            break;
          case SOCKET_EVENT.GAME_STARTED:
            socket.emit(SOCKET_EVENT.GAME_STARTED, {
              gameUrl: "https://example.com/game",
              roomId: message.to,
            });
            break;
          case SOCKET_EVENT.GAME_ENDED:
            socket.emit(SOCKET_EVENT.GAME_ENDED, {
              roomId: message.to,
            });
            break;
          case SOCKET_EVENT.ROOM_CLOSED:
            socket.emit(SOCKET_EVENT.ROOM_CLOSED, {
              roomId: message.to,
            });
            break;
          default:
            break;
        }
        io.emit(SOCKET_EVENT.CHAT_MESSAGE, {
          ...message,
          timestamp: new Date().toISOString(),
        });
      });
      socket.on(SOCKET_EVENT.DISCONNECT, () => {
        // eslint-disable-next-line no-console
        console.log("SOCKET DISCONNECTED FROM SERVER! ", socket.id);
        onlineUsers.delete(socket.id);
        if (isEmitting && onlineUsers.size === 0) {
          clearInterval(sendOnlineUsers);
          isEmitting = false;
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
