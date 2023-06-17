import Avatar from "../Avatar";
import { cn } from "@/lib/utils";

type ChatMessageProps = {
  isMe?: boolean;
  src?: string;
  nickname?: string;
  message?: string;
};

const ChatMessage: React.FC<ChatMessageProps> = ({
  isMe,
  src = "/images/profile.jpg",
  nickname,
  message,
}) => {
  return (
    <div className="flex gap-2.5 text-white">
      <Avatar
        isOnline
        onClick={() => {}}
        src={{
          blurDataURL: src,
          height: 34,
          src,
          width: 34,
        }}
        type="button"
      />
      <div className="text-sm">
        <h3
          className={cn("text-blue58", {
            "text-green23": isMe,
          })}
        >
          {nickname}
        </h3>
        <p className="whitespace-pre">{message}</p>
      </div>
    </div>
  );
};

export default ChatMessage;
