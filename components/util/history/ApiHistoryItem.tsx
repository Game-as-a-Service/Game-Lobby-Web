import { ApiHistory, Status } from "@/contexts/HistoryContext";
import Check from "public/images/check.svg";
import Error from "public/images/error.svg";
import Pending from "public/images/pending.svg";

const ApiHistoryItem = (props: ApiHistory) => {
  let color = "";
  let Icon;
  switch (props.status) {
    case Status.RESOLVED:
      Icon = Check;
      color = "text-green-500";
      break;
    case Status.REJECTED:
      Icon = Error;
      color = "text-red-500";
      break;
    default:
      Icon = Pending;
      color = "text-zinc-400";
  }

  return (
    <div
      key={props.id}
      className={`flex justify-between items-center gap-4 px-2 py-1 border-b border-zinc-400 ${color} cursor-pointer`}
      onClick={() => alert(JSON.stringify(props, null, 2))}
    >
      <Icon className="w-4 h-4" />
      <div>{props.time + "ms"}</div>
    </div>
  );
};

export default ApiHistoryItem;
