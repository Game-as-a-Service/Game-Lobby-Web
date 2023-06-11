import { PropsWithChildren, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

type ChatContentProps = {
  className?: string;
} & PropsWithChildren;

const ChatContent = ({ className, children }: ChatContentProps) => {
  const chatRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatRef.current?.scrollTo({ top: chatRef.current.scrollHeight });
  }, [children]);

  return (
    <div
      className={cn(
        "chat__body flex flex-col overflow-auto h-full p-4 gap-4",
        className
      )}
      ref={chatRef}
    >
      {children}
    </div>
  );
};

export default ChatContent;
