import { ApiHistory, Status } from "@/contexts/HistoryContext";
import Icon from "@/components/shared/Icon";
import { IconName } from "@/components/shared/Icon/icons";

const ApiHistoryItem = (props: ApiHistory) => {
  let color = "";
  let iconName: IconName;
  switch (props.status) {
    case Status.RESOLVED:
      iconName = "check";
      color = "text-green-500";
      break;
    case Status.REJECTED:
      iconName = "error";
      color = "text-red-500";
      break;
    default:
      iconName = "pending";
      color = "text-zinc-400";
  }

  return (
    <div
      key={props.id}
      className={`flex justify-between items-center gap-4 px-2 py-1 border-b border-zinc-400 ${color} cursor-pointer`}
      onClick={() => alert(JSON.stringify(props, null, 2))}
    >
      <Icon name={iconName} className="w-4 h-4" />
      <div>{props.time + "ms"}</div>
    </div>
  );
};

export default ApiHistoryItem;
