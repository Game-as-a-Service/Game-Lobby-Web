import ApiHistoryContext, {
  ApiHistory,
  WebSocketHistory,
} from "@/contexts/ApiHistoryContext";
import { FC, ReactNode, useState, useCallback } from "react";

type Props = {
  children: ReactNode;
};

const ApiHistoryProvider: FC<Props> = ({ children }) => {
  const [history, setHistory] = useState<ApiHistory[]>([]);
  const [wsHistory, setWsHistory] = useState<WebSocketHistory[]>([]);
  const [isHidden, setIsHidden] = useState<boolean>(false);

  const addHistory = useCallback((data: ApiHistory) => {
    setHistory((prev) => [...prev, data]);
  }, []);

  const removeHistory = useCallback((id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateHistory = useCallback((data: ApiHistory) => {
    setHistory((prev) =>
      prev.map((item) => (item.id === data.id ? data : item))
    );
  }, []);

  const clearAllHistory = useCallback(() => {
    setHistory([]);
    setWsHistory([]);
  }, []);

  const addWsHistory = useCallback((data: Omit<WebSocketHistory, "id">) => {
    setWsHistory((prev) => [...prev, { id: crypto.randomUUID(), ...data }]);
  }, []);

  return (
    <ApiHistoryContext.Provider
      value={{
        history,
        addHistory,
        removeHistory,
        updateHistory,
        wsHistory,
        addWsHistory,
        clearAllHistory,
        isHidden,
        setIsHidden,
      }}
    >
      {children}
    </ApiHistoryContext.Provider>
  );
};

export default ApiHistoryProvider;
