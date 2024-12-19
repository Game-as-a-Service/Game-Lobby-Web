import { cn } from "@/lib/utils";
import Icon, { IconName } from "@/components/shared/Icon";
import BoxFancy from "@/components/shared/BoxFancy";

interface UserCardProps {
  id?: string;
  nickname?: string;
  isSelf?: boolean;
  isHost?: boolean;
}

interface IUserRole {
  icon: IconName;
  text: string;
}

function UserCard({ id, nickname, isSelf, isHost }: Readonly<UserCardProps>) {
  if (!id) {
    return <BoxFancy className="h-28" borderGradientColor="cyberpunk" />;
  }

  const getUserRole = (): IUserRole | undefined => {
    if (isSelf && isHost) return { icon: "UserHost", text: "你 ( 房主 )" };
    if (isSelf) return { icon: "User", text: "你" };
    if (isHost) return { icon: "Host", text: "房主" };
  };

  const userRole = getUserRole();

  return (
    <div className="group relative h-28 rounded-lg bg-grey-400">
      <div
        className={cn(
          "absolute bottom-0 inset-x-0 px-3 py-2 rounded-lg bg-gray-800/60 font-bold text-sm text-white",
          "before:w-full before:h-full before:absolute before:top-0 before:left-0 before:pointer-events-none",
          "before:bg-gradient-to-t before:from-[#1d1823] before:to-black/0 before:rounded-lg"
        )}
      >
        <div className="relative">
          {/* <h3 className="truncate text-secondary-300">非凡之人</h3> */}
          <h4 className="truncate">{nickname}</h4>
        </div>
      </div>
      {userRole && (
        <div className="absolute top-1/2 -translate-y-1/2 right-2 w-6 h-6">
          <div
            className={cn(
              "absolute bottom-full left-1/2 -translate-x-1/2 px-2 py-1 mb-1",
              "w-max text-xs bg-primary-800/80 rounded-lg",
              "opacity-0 group-hover:opacity-100 transition-opacity"
            )}
          >
            {userRole.text}
          </div>
          <Icon
            name={userRole.icon}
            className="w-full h-full text-secondary-100 drop-shadow-secondary"
          />
        </div>
      )}
    </div>
  );
}

export default UserCard;
