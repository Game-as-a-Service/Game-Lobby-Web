import { useEffect, useRef, useState } from "react";
import {
  SOCKET_EVENT,
  useSocketCore,
} from "../containers/provider/SocketProvider";
import { MessageType } from "../components/rooms/RoomChatroom";

export default function Home() {
  const { socket, emit } = useSocketCore();

  const inputRef = useRef<HTMLInputElement>(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<MessageType[]>([]);

  const sendMessage = () => {
    if (emit) {
      emit("message", message);
      setMessage("");
      inputRef.current?.focus();
    }
  };

  useEffect(() => {
    socket?.on(SOCKET_EVENT.CHAT_MESSAGE, (data: any) => {
      setMessages((prevMessages) => [...prevMessages, data]);

      console.log("SOCKET_EVENT.CHAT_MESSAGE", data);
    });
    return () => {
      socket?.off(SOCKET_EVENT.CHAT_MESSAGE);
    };
  }, [socket]);

  return (
    <>
      <div className="text-red-200">
        <p>Socket ID: {socket?.id}</p>
      </div>

      <div className="text-blue-200">
        {messages.map((message, index) => (
          <p key={index}>{message.content}</p>
        ))}
      </div>

      <input
        ref={inputRef}
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type something..."
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            sendMessage();
          }
        }}
      />
    </>
  );
}
