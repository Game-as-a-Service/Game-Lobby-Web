import ChatroomContext from "./ChatroomContext";
import { PropsWithChildren } from "react";
import useChatroomService from "./useChatroomService";

export type ChatroomContextType = ReturnType<typeof useChatroomService>;

/**
 * Provider component for chat room functionality
 * Uses the new socket service architecture instead of direct socket operations
 */
export default function ChatroomContextProvider({
  children,
}: PropsWithChildren) {
  // Use the new service-based hook
  const contextValue = useChatroomService();

  return (
    <ChatroomContext.Provider value={contextValue}>
      {children}
    </ChatroomContext.Provider>
  );
}
