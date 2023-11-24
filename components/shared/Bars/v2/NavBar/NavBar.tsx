import { PropsWithChildren } from "react";
import Icon from "@/components/shared/Icon";

interface TagProps extends React.ComponentPropsWithoutRef<"div"> {}

const NavBar = ({}: PropsWithChildren<TagProps>) => {
  return (
    <div
      className={
        "flex items-center justify-between h-14 pl-2 pr-4 py-1 gradient-black"
      }
    >
      <div id={"logo"} className={"flex px-2.5 items-center"}>
        <div
          id={"leading-icon"}
          className={"flex flex-col w-12 h-12 p-2 items-center justify-center"}
        >
          <Icon name="logo" className="w-6 h-6" />
        </div>
        <div className={"ml-1 text-primary-100"}>遊戲微服務大平台</div>
      </div>
      <div id={"btn-group"} className={"flex"}>
        <div className={"w-12 h-12 p-3"}>
          <Icon name="chat" className="w-6 h-6 stroke-gray-500" />
        </div>
        <div className={"w-12 h-12 p-3 ml-3"}>
          <Icon name="notification" className="w-6 h-6 stroke-gray-500" />
        </div>
        <div className={"w-12 h-12 p-3 ml-3"}>
          <Icon name="player" className="w-6 h-6 stroke-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
