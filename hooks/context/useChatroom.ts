import ChatroomContext from "@/contexts/ChatroomContext";
import { useContext } from "react";

const useChatroom = () => {
  return useContext(ChatroomContext);
};

export default useChatroom;
