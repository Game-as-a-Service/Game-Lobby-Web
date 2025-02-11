import { createContext } from "react";
import { ChatroomContextType } from "@/containers/provider/ChatroomProvider";

const defaultValue: ChatroomContextType = {
  lastMessage: null,
  sendChatMessage: () => {},
  joinChatroom: () => {},
  leaveChatroom: () => {},
};

const ChatroomContext = createContext<ChatroomContextType>(defaultValue);

export default ChatroomContext;
