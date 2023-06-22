import { cn } from "@/lib/utils";
import Icon from "@/components/shared/Icon";
import { ReactElement } from "react";
import { RoomInfo } from "@/requests/rooms";
export interface UserCardProps {
  id: string;
  nickname: string;
  isReady: boolean;
  isSelf: boolean;
  isHost: boolean;
  onKickUser?: (User: Omit<RoomInfo.User, "isReady">) => void;
}
export interface WatingUserCardProp {
  isWating: boolean;
}
export interface DisabledUserCardProp {
  disabled: boolean;
}
function UserCard(props: WatingUserCardProp): ReactElement;
function UserCard(props: DisabledUserCardProp): ReactElement;
function UserCard(props: UserCardProps): ReactElement;
function UserCard(props: any) {
  const { id, nickname, isReady, isSelf, isHost, onKickUser }: UserCardProps =
    props;
  const { isWating }: WatingUserCardProp = props;
  const { disabled }: DisabledUserCardProp = props;

  const hostClass = "border-[4px] border-[#23A55A]";

  const disabledClass = "opacity-30 bg-black";

  const readyContent = (
    <div className="w-full max-w-[166px] h-[40px] rounded-[21px] bg-[#2F88FF] font-normal text-[15px] text-white leading-[22px] flex items-center justify-center cursor-default absolute bottom-[5px] left-[50%] translate-x-[-50%]">
      已準備
    </div>
  );

  function getNameText() {
    if (disabled) return "";
    if (isWating) return "等待中...";
    const suffix = isHost ? "(房主)" : "";
    const name = isSelf ? "你" : nickname;
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
        {onKickUser && (
          <div
            onClick={() => onKickUser({ id, nickname })}
            data-testid="kick-user-svg"
            className={"absolute top-[5px] right-[6px] cursor-pointer"}
          >
            <Icon name="kickUser" />
          </div>
        )}

        {isReady && readyContent}
      </div>
      <span className="mt-[10px] block font-bold text-base text-white">
        {nameText}
      </span>
    </div>
  );
}

export default UserCard;
