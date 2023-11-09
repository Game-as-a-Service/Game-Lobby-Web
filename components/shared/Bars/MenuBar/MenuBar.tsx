import { PropsWithChildren } from "react";
import Icon from "@/components/shared/Icon";

interface TagProps extends React.ComponentPropsWithoutRef<"div"> {}

const NavBar = ({}: PropsWithChildren<TagProps>) => {
  return (
    <div
      className={
        "flex items-start justify-center w-[72px] h-[648px] px-1 pt-6 pb-14 rounded-[16px] gradient-black"
      }
    >
      <div id={"btn-group"} className={"flex flex-col"}>
        <div className={"w-12 h-12 p-3"}>
          <Icon name="chat" className="w-6 h-6 [&_*]:stroke-gray-500" />
        </div>
        <div className={"w-12 h-12 p-3 mt-4"}>
          <Icon name="notification" className="w-6 h-6 [&_*]:stroke-gray-500" />
        </div>
      </div>
    </div>
  );
};

export default NavBar;
