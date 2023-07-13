import { ApiHistory, WebSocketHistory } from "@/contexts/ApiHistoryContext";
import ApiHistoryItem from "./ApiHistoryItem";
import WsHistoryItem from "./WsHistoryItem";
import useApiHistory from "@/hooks/context/useApiHistory";
import { useState } from "react";
import { cn } from "@/lib/utils";

const ApiHistoryList = () => {
  const { history, wsHistory, clearAllHistory, isHidden, setIsHidden } =
    useApiHistory();
  const [historyType, setHistoryType] = useState<"API" | "WebSocket">("API");

  function handleChangeHistoryType() {
    setHistoryType(historyType === "API" ? "WebSocket" : "API");
  }

  return (
    <div className="fixed z-10 w-32 top-20 right-0 text-white bg-[rgba(0,0,0,0.2)] rounded border border-zinc-400">
      <div
        className="flex justify-center items-center py-1 text-zinc-400 border-b border-zinc-400 cursor-pointer  hover:font-bold"
        onClick={handleChangeHistoryType}
      >
        {historyType}
      </div>
      <div className="grid grid-cols-2  justify-between items-center py-1 text-zinc-400 border-b border-zinc-400 ">
        <div className="border-r border-zinc-400 text-center">
          <span className="cursor-pointer" onClick={clearAllHistory}>
            Clean
          </span>
        </div>
        <div className="text-center">
          <span
            className="cursor-pointer"
            onClick={() => setIsHidden(!isHidden)}
          >
            {isHidden ? "Show" : "Hide"}
          </span>
        </div>
      </div>
      <div className={cn([(isHidden || historyType !== "API") && "hidden"])}>
        {history.map((props: ApiHistory) => (
          <ApiHistoryItem key={props.id} {...props} />
        ))}
      </div>
      <div
        className={cn([(isHidden || historyType !== "WebSocket") && "hidden"])}
      >
        {wsHistory.map((props: WebSocketHistory) => (
          <WsHistoryItem key={props.id} {...props} />
        ))}
      </div>
    </div>
  );
};

export default ApiHistoryList;
