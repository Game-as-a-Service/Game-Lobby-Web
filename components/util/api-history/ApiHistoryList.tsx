import { ApiHistory, Status } from "@/contexts/ApiHistoryContext";
import ApiHistoryItem from "./ApiHistoryItem";
import useApiHistory from "@/hooks/context/useApiHistory";

const ApiHistoryList = () => {
  const { history, clear, isHidden, setIsHidden } = useApiHistory();

  return (
    <div className="fixed z-10 w-32 top-20 right-0 text-white bg-[rgba(0,0,0,0.2)] rounded border border-zinc-400">
      {!isHidden ? (
        history.map((props: ApiHistory) => (
          <ApiHistoryItem key={props.id} {...props} />
        ))
      ) : (
        <></>
      )}
      <div className="flex justify-center items-center py-1 text-zinc-400">
        <div className="w-1/2 border-r border-zinc-400 text-center">
          <span className="cursor-pointer px-4 py-2" onClick={clear}>
            C
          </span>
        </div>
        <div className="w-1/2 text-center">
          <span
            className="cursor-pointer px-4 py-2"
            onClick={() => setIsHidden(!isHidden)}
          >
            {isHidden ? "S" : "H"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ApiHistoryList;
