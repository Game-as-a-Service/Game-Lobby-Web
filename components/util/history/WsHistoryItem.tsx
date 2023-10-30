import {
  WebSocketHistory,
  WebSocketHistoryType,
} from "@/contexts/HistoryContext";
import Icon from "@/components/shared/Icon";
import { cn } from "@/lib/utils";
const WsHistoryItem = (props: WebSocketHistory) => {
  let color = "";
  switch (props.type) {
    case WebSocketHistoryType.SEND:
      color = "text-orange-500";
      break;
    case WebSocketHistoryType.RECEIVE:
      color = "text-green-500";
      break;
    default:
      color = "text-yellow-500";
  }
  const arrowIcon = {
    [WebSocketHistoryType.SEND]: (
      <Icon
        name="sendDiagonal"
        className={cn(
          "w-6 h-6 absolute left-0 z-1 [&_path]:stroke-orange-500",
          color
        )}
      />
    ),
    [WebSocketHistoryType.RECEIVE]: (
      <Icon
        name="edit"
        className={cn(
          "w-6 h-6 absolute left-0 z-1 [&_path]:stroke-green-500",
          color
        )}
      />
    ),
    [WebSocketHistoryType.CONNECTION]: (
      <Icon
        name="globe"
        className={cn(
          "w-6 h-6 absolute left-0 z-1 [&_path]:stroke-yellow-500",
          color
        )}
      />
    ),
  };
  return (
    <div
      key={props.id}
      className={`flex  relative justify-end items-center gap-4 px-2 py-1 border-b border-zinc-400  ${color} cursor-pointer`}
      onClick={() => alert(JSON.stringify(props, null, 2))}
    >
      {arrowIcon[props.type]}
      <div>{props.type}</div>
    </div>
  );
};

export default WsHistoryItem;
