import ApiHistoryContext, { ApiHistory } from "@/contexts/ApiHistoryContext";
import { FC, ReactNode, useState } from "react";

type Props = {
  children: ReactNode;
};

const ApiHistoryProvider: FC<Props> = ({ children }) => {
  const [history, setHistory] = useState<ApiHistory[]>([]);
  const [isHidden, setIsHidden] = useState<boolean>(false);

  const addHistory = (data: ApiHistory) => {
    setHistory((prev) => [...prev, data]);
  };

  const removeHistory = (id: string) => {
    setHistory((prev) => prev.filter((item) => item.id !== id));
  };

  const updateHistory = (data: ApiHistory) => {
    setHistory((prev) =>
      prev.map((item) => (item.id === data.id ? data : item))
    );
  };

  const clear = () => {
    setHistory([]);
  };

  return (
    <ApiHistoryContext.Provider
      value={{
        history,
        addHistory,
        removeHistory,
        updateHistory,
        clear,
        isHidden,
        setIsHidden,
      }}
    >
      {children}
    </ApiHistoryContext.Provider>
  );
};

export default ApiHistoryProvider;
