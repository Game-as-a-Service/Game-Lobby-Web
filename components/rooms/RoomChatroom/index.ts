import { RoomInfo } from "@/requests/rooms";
import { UserInfo } from "@/requests/users";
import RoomChatroom from "./RoomChatroom";

type User = Pick<UserInfo, "id" | "nickname">;

export type MessageType = {
  /**
   * The source of the message (always "USER" for user messages).
   */
  from: "USER" | "SYSTEM";
  /**
   * The user who sent the message.
   */
  user?: User;
  /**
   * The content of the user message.
   */
  content: string;
  /**
   * The timestamp of the message.
   */
  timestamp: string;
  /**
   * {"ALL" | "LOBBY" | User["id"] | RoomInfo.Room["id"]} to - The recipient of the message.
   */
  to: "ALL" | "LOBBY" | User["id"] | RoomInfo.Room["id"];
};

export default RoomChatroom;
