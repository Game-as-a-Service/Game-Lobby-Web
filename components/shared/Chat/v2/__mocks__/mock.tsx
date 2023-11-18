import type { MessageType } from "../ChatMessages";
import type { FriendType } from "../ChatFriendList";

export const mockLobbyMessages: MessageType[] = [
  { from: "玩家名字2", target: "lobby", content: "文字文字文字文字" },
  { from: "玩家名字1", target: "lobby", content: "文字文字文字文字文字" },
  {
    from: "玩家名字1",
    target: "lobby",
    content: "文字文字文字文字文字文字文字",
  },
  { from: "我", target: "lobby", content: "文字文字文字文字" },
  { from: "我", target: "lobby", content: "文字文字文字文字文字文字文字" },
  { from: "玩家名字1", target: "lobby", content: "文字" },
  {
    from: "玩家名字1",
    target: "lobby",
    content:
      "文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字文字",
  },
];

export const mockRoomMessages: MessageType[] = [
  {
    from: "System",
    target: "ABC_ROOM",
    content: "小王子的花、白日做夢、黑月幻貓、90年代社畜 已加入遊戲房聊天室",
  },
];

export const mockFriendList: FriendType[] = [
  {
    lastUser: "玩家A",
    target: "玩家A___我",
    lastContent: "玩家A送出的最後一句話",
    isRead: false,
  },
  {
    lastUser: "我",
    target: "玩家B___我",
    lastContent: "你送出的最後一句話",
    isRead: true,
  },
  {
    lastUser: "玩家C",
    target: "玩家C___我",
    lastContent: "玩家C送出的最後一句話",
    isRead: false,
  },
  { lastUser: null, target: "玩家D___我", lastContent: null, isRead: true },
];

export const createMockFriendMessages = ({
  target,
  lastUser,
  lastContent,
}: FriendType): MessageType[] => {
  if (!lastUser || !lastContent) return [];
  return [{ from: lastUser, target, content: lastContent }];
};
