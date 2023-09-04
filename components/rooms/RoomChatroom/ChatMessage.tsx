import { MessageType } from ".";
import { cn } from "@/lib/utils";
import React, { JSX, ComponentProps } from "react";

export const TEXT_COLORS_CLASS = {
  SYSTEM: "text-[#2F88FF]",
  USER: "text-[#A8A8A8]",
};

function ChatMessage(props: MessageType): JSX.Element {
  const textColorClass =
    props.from === "SYSTEM" ? TEXT_COLORS_CLASS.SYSTEM : TEXT_COLORS_CLASS.USER;

  const senderText = props.from === "SYSTEM" ? "" : props.from.nickname + ": ";

  return (
    <div className={cn("text-sm text-left", textColorClass)}>
      <span>{senderText}</span>
      <span>{props.content}</span>
    </div>
  );
}
export type ChatMessageProps = ComponentProps<typeof ChatMessage>;

export default ChatMessage;
