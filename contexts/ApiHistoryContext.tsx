import { HttpMethod } from "@/requests/request";
import { createContext } from "react";
import { SOCKET_EVENT } from "@/contexts/SocketContext";

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

export enum WebSocketHistoryType {
  SEND = "Send",
  RECEIVE = "Receive",
  CONNECTION = "Connection",
}

export interface WebSocketHistory<T = unknown> {
  id: string;
  type: WebSocketHistoryType;
  event: keyof typeof SOCKET_EVENT;
  message: T;
}

interface IApiHistoryContext<T = unknown> {
  history: ApiHistory[];
  addHistory: (data: ApiHistory) => void;
  removeHistory: (id: string) => void;
  updateHistory: (data: ApiHistory) => void;
  wsHistory: WebSocketHistory[];
  addWsHistory: (data: Omit<WebSocketHistory, "id">) => void;
  clearAllHistory: () => void;
  isHidden: boolean;
  setIsHidden: (isHidden: boolean) => void;
}

const ApiHistoryContext = createContext<IApiHistoryContext>({
  history: [],
  addHistory: () => {},
  removeHistory: () => {},
  updateHistory: () => {},
  wsHistory: [],
  addWsHistory: () => {},
  clearAllHistory: () => {},
  isHidden: false,
  setIsHidden: () => {},
});

export default ApiHistoryContext;
