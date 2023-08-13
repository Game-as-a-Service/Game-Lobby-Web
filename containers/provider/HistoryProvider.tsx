import HistoryContext, {
  ApiHistory,
  WebSocketHistory,
} from "@/contexts/HistoryContext";
import { FC, ReactNode, useState, useCallback } from "react";

type Props = {
  children: ReactNode;
};

const HistoryProvider: FC<Props> = ({ children }) => {
  const [apiHistory, setApiHistory] = useState<ApiHistory[]>([]);
  const [wsHistory, setWsHistory] = useState<WebSocketHistory[]>([]);
  const [isHidden, setIsHidden] = useState<boolean>(false);

  const addApiHistory = useCallback((data: ApiHistory) => {
    setApiHistory((prev) => [...prev, data]);
  }, []);

  const removeApiHistory = useCallback((id: string) => {
    setApiHistory((prev) => prev.filter((item) => item.id !== id));
  }, []);

  const updateApiHistory = useCallback((data: ApiHistory) => {
    setApiHistory((prev) =>
      prev.map((item) => (item.id === data.id ? data : item))
    );
  }, []);

  const clearAllHistory = useCallback(() => {
    setApiHistory([]);
    setWsHistory([]);
  }, []);

  const addWsHistory = useCallback((data: Omit<WebSocketHistory, "id">) => {
    setWsHistory((prev) => [...prev, { id: crypto.randomUUID(), ...data }]);
  }, []);

  return (
    <HistoryContext.Provider
      value={{
        apiHistory,
        addApiHistory,
        removeApiHistory,
        updateApiHistory,
        wsHistory,
        addWsHistory,
        clearAllHistory,
        isHidden,
        setIsHidden,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export default HistoryProvider;
