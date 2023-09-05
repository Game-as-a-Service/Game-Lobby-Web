import { UserInfo } from "@/requests/users";
import RoomChatroom from "./RoomChatroom";

type User = Pick<UserInfo, "id" | "nickname">;

export type MessageType = {
  /** The source of the message. */
  from: "SYSTEM" | User;
  /** The content of the user message. */
  content: string;
  /** The recipient of the message.
   * @ "LOBBY" | "ROOM_[:roomId]"  -
   */
  target: string;
  /** The timestamp of the message. */
  timestamp: string;
};

export default RoomChatroom;
