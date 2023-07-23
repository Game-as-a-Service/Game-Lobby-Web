import type { NextApiRequest, NextApiResponse } from "next";
import { WebSocket, WebSocketServer } from "ws";
import { MessageType } from "@/components/rooms/RoomChatroom";
import { SOCKET_EVENT } from "../../../containers/provider/SocketProvider";

type NextApiResponseServer = NextApiResponse & {
  socket: {
    server: WebSocketServer & {
      mockServer: WebSocketServer;
    };
  };
};

type User = NonNullable<MessageType["user"]>;

type ConnectionType = Record<string, { user: User; ws: WebSocket }[]>;

type Socket_DispatchActionType = {
  type: keyof typeof SOCKET_EVENT;
  payload: Record<string, any>;
};

type Response = Socket_DispatchActionType & { payload: MessageType };

export default function handler(
  req: NextApiRequest,
  res: NextApiResponseServer
) {
  if (res.socket.server.mockServer) {
    // prevent duplicate server
    res.end();
  } else {
    const wss = new WebSocketServer({ port: 3000 });
    res.socket.server.mockServer = wss;
    const connections: ConnectionType = { LOBBY: [] };

    //當 WebSocket 從外部連結時執行
    wss.on("connection", (ws, req) => {
      ws.on("message", (data: string) => {
        const jsonData = JSON.parse(data) as any;
        const messageType = jsonData.type as Socket_DispatchActionType["type"];

        switch (messageType) {
          // case "CONNECTION_OPEN": {
          //   // register the user to LOBBY chatroom
          //   const user: User = jsonData.payload.user;
          //   connections.LOBBY.push({ user, ws });

          //   // produce response
          //   const response: Response = {
          //     type: "CHAT_MESSAGE",
          //     payload: {
          //       from: "SYSTEM",
          //       content: `聊天室伺服器連線成功，加入大廳聊天室`,
          //       timestamp: new Date().toISOString(),
          //       to: "LOBBY",
          //     },
          //   };

          //   // broadcast the message to LOBBY chatroom
          //   connections.LOBBY.forEach((connection) => {
          //     connection.ws.send(JSON.stringify(response));
          //   });
          //   break;
          // }
          case "CHAT_MESSAGE": {
            // produce response
            const {
              content,
              user,
              timestamp,
              to: chatroomId,
            } = jsonData.payload;
            const response: Response = {
              type: "CHAT_MESSAGE",
              payload: {
                from: "USER",
                content,
                user,
                timestamp,
                to: chatroomId,
              },
            };
            // broadcast the message to specfic chatroom
            const targetConnections = connections[chatroomId];
            if (targetConnections) {
              targetConnections.forEach((connection) => {
                connection.ws.send(JSON.stringify(response));
              });
            } else {
              throw new Error("聊天室未建立");
            }
            break;
          }

          case "CHATROOM_JOIN": {
            const { user, chatroomId }: { user: User; chatroomId: string } =
              jsonData.payload;
            // produce response
            const response: Response = {
              type: "CHAT_MESSAGE",
              payload: {
                from: "SYSTEM",
                content: `玩家 ${user?.nickname} 已加入${chatroomId}聊天室`,
                timestamp: new Date().toISOString(),
                to: chatroomId,
              },
            };

            const targetConnections = connections[chatroomId];
            if (!targetConnections) {
              // add new chatroom by roomId
              connections[chatroomId] = [];
            }
            // register the user to specfic chatroom, then broadcast message
            connections[chatroomId].push({ user, ws });
            connections[chatroomId].forEach((connection) => {
              connection.ws.send(JSON.stringify(response));
            });
            break;
          }

          case "CHATROOM_LEAVE": {
            const { user, chatroomId }: { user: User; chatroomId: string } =
              jsonData.payload;
            // produce response
            const response: Response = {
              type: "CHAT_MESSAGE",
              payload: {
                from: "SYSTEM",
                content: `玩家 ${user?.nickname} 已離開聊天室`,
                timestamp: new Date().toISOString(),
                to: chatroomId,
              },
            };
            const targetConnections = connections[chatroomId];
            if (targetConnections) {
              // remove user
              targetConnections.filter(
                (connetion) => connetion.user.id === user.id
              );
              // boradcast
              targetConnections.forEach((connection) => {
                connection.ws.send(JSON.stringify(response));
              });
            } else {
              throw new Error("未預期的情形，玩家離開了一個不存在的聊天室");
            }
            break;
          }

          // case "CONNECTION_CLOSE": {
          //   break;
          // }
          default:
            throw new Error(`未預期的 type: ${messageType}`);
        }
      });

      //當 WebSocket 的連線關閉時執行
      ws.on("close", () => {
        // unregister user here
      });
    });
    res.end();
  }
}
