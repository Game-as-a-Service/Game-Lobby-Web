import { ApiHistory, Status } from "@/contexts/history";
import Icon, { IconName } from "@/components/shared/Icon";

const ApiHistoryItem = (props: ApiHistory) => {
  let color = "";
  let iconName: IconName;
  switch (props.status) {
    case Status.RESOLVED:
      iconName = "Check";
      color = "text-green-500";
      break;
    case Status.REJECTED:
      iconName = "X";
      color = "text-red-500";
      break;
    default:
      iconName = "Nonpublic";
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
