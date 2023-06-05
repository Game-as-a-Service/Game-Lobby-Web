import { HttpMethod } from "@/requests/request";
import { createContext } from "react";

export enum Status {
  RESOLVED = "RESOLVED",
  REJECTED = "REJECTED",
  PENDING = "PENDING",
}

export interface ApiHistory<T = unknown> {
  id: string;
  url: string;
  method: HttpMethod;
  status: Status;
  statusCode?: number;
  response?: T;
  body?: unknown;
  time: number;
  error?: Error;
}

interface IApiHistoryContext<T = unknown> {
  history: ApiHistory[];
  addHistory: (data: ApiHistory) => void;
  removeHistory: (id: string) => void;
  updateHistory: (data: ApiHistory) => void;
  clear: () => void;
  isHidden: boolean;
  setIsHidden: (isHidden: boolean) => void;
}

const ApiHistoryContext = createContext<IApiHistoryContext>({
  history: [],
  addHistory: () => {},
  removeHistory: () => {},
  updateHistory: () => {},
  clear: () => {},
  isHidden: false,
  setIsHidden: () => {},
});

export default ApiHistoryContext;
