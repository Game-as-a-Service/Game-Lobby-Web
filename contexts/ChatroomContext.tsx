import { createContext } from "react";
import { ChatroomContextType } from "@/containers/provider/ChatroomProvider";

const defaultValue: ChatroomContextType = {
  lastMessage: undefined,
  sendChatMessage: () => {},
  joinChatroom: () => {},
  leaveChatroom: () => {},
  readyState: 0,
};

const ChatroomContext = createContext<ChatroomContextType>(defaultValue);

export default ChatroomContext;
