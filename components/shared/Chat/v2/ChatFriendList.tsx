import Avatar from "../../Avatar";

export type FriendType = {
  target: string;
  lastUser: string | null;
  lastContent: string | null;
  isRead: boolean;
};

type ChatFriendListProps = {
  userId: string;
  friendList: FriendType[];
  onToggle: (target: FriendType["target"]) => void;
};

export const getTargetUser = (target: FriendType["target"], userId: string) => {
  const [userA, userB] = target.split("___");
  return userA === userId ? userB : userA;
};

export default function ChatFriendList({
  userId,
  friendList,
  onToggle,
}: Readonly<ChatFriendListProps>) {
  const goTo = (target: FriendType["target"]) => () => onToggle(target);

  return (
    <div className="min-h-full max-h-[calc(var(--chat-height)-120px)]">
      <div className="overflow-y-scroll scrollbar">
        <div className="p-4 pt-2 pr-0">
          {friendList.map(({ target, lastUser, lastContent, isRead }) => {
            const targetUser = getTargetUser(target, userId);
            const isMe = lastUser === userId;

            return (
              <div
                key={target}
                className="relative flex items-center gap-4 text-primary-100 p-2 pr-8 fz-14 border-b border-gradient-purple cursor-pointer"
                tabIndex={0}
                onClick={goTo(target)}
                onKeyDown={goTo(target)}
              >
                <Avatar type="image" size="small" src="" />
                <div>
                  <div>{targetUser}</div>
                  {lastContent && (
                    <div className="mt-1">
                      {isMe ? `你：${lastContent}` : lastContent}
                    </div>
                  )}
                  {!isRead && (
                    <div className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-secondary-500 w-2 h-2"></div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
