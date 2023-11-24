import { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import Avatar from "../../Avatar";

export type MessageType = {
  from: string;
  target: string;
  content: string;
};

type ChatMessageProps = {
  userId: string;
  messages: MessageType[];
};

export default function ChatMessages({
  userId,
  messages,
}: Readonly<ChatMessageProps>) {
  const messagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesRef.current?.scrollTo({
      top: messagesRef.current.scrollHeight,
      behavior: "smooth",
    });
  }, [messages]);

  return (
    <div className="flex flex-col justify-end min-h-full max-h-[calc(var(--chat-height)-120px)]">
      <div ref={messagesRef} className="overflow-y-scroll scrollbar">
        <div className="p-4 pr-0">
          {messages.map(({ from, content }, index) => {
            const isSystem = from === "System";
            const isMe = from === userId;
            const isSameUser = from === messages[index + 1]?.from;

            return (
              <div
                key={from + content}
                className={cn(
                  "flex items-end mb-6 last-of-type:mb-0",
                  isSameUser && "mb-2",
                  isMe && "flex-row-reverse"
                )}
              >
                {isSystem ? (
                  <div className="fz-14 text-primary-100">{content}</div>
                ) : (
                  <>
                    <div className={cn("p-2", isMe ? "pr-0" : "pl-0")}>
                      {isSameUser ? (
                        <div className="w-6"></div>
                      ) : (
                        <Avatar type="image" size="small" src="" />
                      )}
                    </div>
                    <div>
                      <div
                        className={cn(
                          "inline-block fz-14 max-w-[224px] py-[5px] pl-4 pe-3 text-primary-700 bg-primary-100 rounded-[24px_24px_24px_0]",
                          isMe && "rounded-[24px_24px_0_24px]"
                        )}
                      >
                        {content}
                      </div>
                      <div
                        className={cn(
                          "text-primary-100 fz-12 mt-2",
                          isSameUser && "hidden",
                          isMe && "text-right mt-1"
                        )}
                      >
                        {isMe ? "我" : from}
                      </div>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
