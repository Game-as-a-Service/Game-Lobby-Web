import { cn } from "@/lib/utils";

export interface UserCardProps {
  userName?: string;
  isReady?: boolean;
  isSelf?: boolean;
  isHost?: boolean;
  disabled?: boolean;
}

function UserCard({
  isReady,
  isSelf,
  isHost,
  disabled,
  userName,
}: UserCardProps) {
  const hostClass = "border-[4px] border-[#23A55A]";

  const disabledClass = "opacity-30 bg-black";

  const readyContent = (
    <div className="w-full max-w-[166px] h-[40px] rounded-[21px] bg-[#2F88FF] font-normal text-[15px] text-white leading-[22px] flex items-center justify-center cursor-default absolute bottom-[5px] left-[50%] translate-x-[-50%]">
      已準備
    </div>
  );

  function getNameText() {
    if (disabled) return "";
    if (!userName) return "等待中...";
    const suffix = isHost ? "(房主)" : "";
    const name = isSelf ? "你" : userName;
    return name + suffix;
  }
  const nameText = getNameText();

  return (
    <div className="max-w-[200px] aspect-square w-full rounded-[10px] ">
      <div
        className={cn(
          "relative w-full h-[170px] rounded-[10px] border ",
          isHost && hostClass,
          disabled && disabledClass
        )}
      >
        {isReady && readyContent}
      </div>
      <span className="mt-[10px] block font-bold text-base text-white">
        {nameText}
      </span>
    </div>
  );
}

export default UserCard;
