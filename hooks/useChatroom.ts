import { useCallback, useEffect, useRef, useState } from "react";
import useAuth from "@/hooks/context/useAuth";
import { MessageType } from "@/components/rooms/RoomChatroom";
import { Env, getEnv } from "@/lib/env";

export enum SOCKET_EVENT {
  CONNECTION_OPEN = "CONNECTION_OPEN",
  CONNECTION_CLOSE = "CONNECTION_CLOSE",
  CHATROOM_JOIN = "CHATROOM_JOIN",
  CHATROOM_LEAVE = "CHATROOM_LEAVE",
  CHAT_MESSAGE = "CHAT_MESSAGE",
}

export enum WS_ReadyState {
  CONNECTING = 0,
  OPEN,
  CLOSED,
}

export type Socket_DispatchActionType = {
  type: keyof typeof SOCKET_EVENT;
  payload: Record<string, any>;
};

function useChatroom() {
  const { currentUser } = useAuth();
  const webSocket = useRef<WebSocket | null>(null);
  const [lastMessage, setLastMessage] = useState<MessageType | undefined>(
    undefined
  );
  const [readyState, setReadyState] = useState<WS_ReadyState>(0);

  /**
   * Dispatches a socket event to the server.
   * @param {string} action.type - The type of the socket event.
   * @param {any} action.payload - The payload of the socket event.
   */
  function dispatchSocketEvent(action: Socket_DispatchActionType): void {
    // ChatGPT said to webSocket.current could be null when the page rendered and caused the error
    if (webSocket.current && webSocket.current.readyState === WebSocket.OPEN) {
      webSocket.current.send(JSON.stringify(action));
    }
  }

  // TODO delete the next useEffect: this is only for mock socket server
  useEffect(() => {
    if (getEnv().env === Env.DEV) {
      fetch("/api/internal/socket");
    }
  }, []);

  useEffect(() => {
    if (!currentUser) return;

    const user = {
      id: currentUser.id,
      nickname: currentUser.nickname,
    };

    // TODO switch to correct url
    webSocket.current = new WebSocket("ws://localhost:3000");

    const ws = webSocket.current;

    // trigger when connected, notify server to register user
    ws.onopen = () => {
      setReadyState(1);
      dispatchSocketEvent({
        type: SOCKET_EVENT.CONNECTION_OPEN,
        payload: { user },
      });
    };

    // trigger when received any message
    ws.onmessage = (event: MessageEvent) => {
      const data = JSON.parse(event.data) as any;
      if (data?.type === SOCKET_EVENT.CHAT_MESSAGE) {
        setLastMessage(data.payload);
      }
    };

    // trigger when server shutdown
    ws.onclose = () => {
      setReadyState(2);
      setLastMessage({
        from: "SYSTEM",
        content: "聊天室伺服器已關閉",
        timestamp: new Date().toISOString(),
        to: "ALL",
      });
    };

    // clean up: notify the server to handle user disconnected
    return () => {
      dispatchSocketEvent({
        type: SOCKET_EVENT.CONNECTION_CLOSE,
        payload: user,
      });
      ws.close();
    };
  }, [currentUser]);

  /**
   * Sends a chat message to the server.
   * @param {string} message.content - The content of the message.
   * @param {string} message.to - The target roomId of the message.
   */
  const sendChatMessage = useCallback(
    (message: Pick<MessageType, "content" | "to">) => {
      if (!currentUser || !webSocket.current) return;

      const payload: MessageType = {
        from: "USER",
        user: { id: currentUser.id, nickname: currentUser.nickname },
        timestamp: new Date().toISOString(),
        ...message,
      };

      dispatchSocketEvent({ type: SOCKET_EVENT.CHAT_MESSAGE, payload });
    },
    [currentUser]
  );

  const joinChatroom = useCallback(
    (chatroomId: string) => {
      if (!currentUser) return;
      dispatchSocketEvent({
        type: SOCKET_EVENT.CHATROOM_JOIN,
        payload: {
          user: {
            id: currentUser.id,
            nickname: currentUser.nickname,
          },
          chatroomId,
        },
      });
    },
    [currentUser]
  );

  const leaveChatroom = useCallback(
    (chatroomId: string) => {
      if (!currentUser) return;
      dispatchSocketEvent({
        type: SOCKET_EVENT.CHATROOM_LEAVE,
        payload: {
          user: {
            id: currentUser.id,
            nickname: currentUser.nickname,
          },
          chatroomId,
        },
      });
    },
    [currentUser]
  );

  return {
    lastMessage,
    sendChatMessage,
    joinChatroom,
    leaveChatroom,
    readyState,
  };
}

export default useChatroom;
