import type { MessageType } from "../ChatMessages";
import type { FriendType } from "../ChatFriendList";

const user1 = { id: "玩家名字1", nickname: "玩家名字1" };
const user2 = { id: "玩家名字2", nickname: "玩家名字2" };
const user3 = { id: "玩家名字3", nickname: "玩家名字3" };
const system = { id: "SYSTEM", nickname: "SYSTEM" };

export const mockLobbyMessages: MessageType[] = [
  {
    from: user2,
    target: "lobby",
    content: "文字文字文字文字",
    timestamp: "",
  },
  {
    from: user1,
    target: "lobby",
    content: "文字文字文字文字文字文字文字",
    timestamp: "",
  },
  {
    from: user3,
    target: "lobby",
    content: "文字文字文字文字",
    timestamp: "",
  },
  {
    from: user3,
    target: "lobby",
    content: "文字文字文字文字文字文字文字",
    timestamp: "",
  },
  {
    from: user1,
    target: "lobby",
    content: "文字",
    timestamp: "",
  },
  {
    from: user1,
    target: "lobby",
    content:
      "文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字",
    timestamp: "",
  },
];

export const mockRoomMessages: MessageType[] = [
  {
    from: system,
    target: "ABC_ROOM",
    content: "小王子的花、白日做夢、黑月幻貓、90年代社畜 已加入遊戲房聊天室",
    timestamp: "",
  },
];

export const mockFriendList: FriendType[] = [
  {
    lastUser: user1,
    target: "玩家名字1___玩家名字5",
    lastContent: "玩家A送出的最後一句話",
    isRead: false,
  },
  {
    lastUser: user3,
    target: "玩家名字3___玩家名字5",
    lastContent: "你送出的最後一句話",
    isRead: true,
  },
  {
    lastUser: user2,
    target: "玩家名字2___玩家名字5",
    lastContent: "玩家C送出的最後一句話",
    isRead: false,
  },
  {
    lastUser: null,
    target: "玩家名字4___玩家名字5",
    lastContent: null,
    isRead: true,
  },
];

export const createMockFriendMessages = ({
  target,
  lastUser,
  lastContent,
}: FriendType): MessageType[] => {
  if (!lastUser || !lastContent) return [];
  return [{ from: lastUser, target, content: lastContent, timestamp: "" }];
};
