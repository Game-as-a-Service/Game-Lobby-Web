import { createContext } from "react";
import type useChatroomService from "./useChatroomService";

export type ChatroomContextType = ReturnType<typeof useChatroomService>;

const defaultValue: ChatroomContextType = {
  lastMessage: null,
  sendChatMessage: () => {},
  joinChatroom: () => {},
  leaveChatroom: () => {},
};

const ChatroomContext = createContext<ChatroomContextType>(defaultValue);

export default ChatroomContext;
