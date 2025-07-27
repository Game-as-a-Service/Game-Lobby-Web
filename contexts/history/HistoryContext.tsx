import { createContext } from "react";
import { SOCKET_EVENT } from "../socket/SocketContext";

// HttpMethod enum replacement
type HttpMethod = "GET" | "POST" | "PUT" | "DELETE" | "PATCH";

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

interface IHistoryContext<T = unknown> {
  apiHistory: ApiHistory[];
  addApiHistory: (data: ApiHistory) => void;
  removeApiHistory: (id: string) => void;
  updateApiHistory: (data: ApiHistory) => void;
  wsHistory: WebSocketHistory[];
  addWsHistory: (data: Omit<WebSocketHistory, "id">) => void;
  clearAllHistory: () => void;
  isHidden: boolean;
  setIsHidden: (isHidden: boolean) => void;
}

const HistoryContext = createContext<IHistoryContext>({
  apiHistory: [],
  addApiHistory: () => {},
  removeApiHistory: () => {},
  updateApiHistory: () => {},
  wsHistory: [],
  addWsHistory: () => {},
  clearAllHistory: () => {},
  isHidden: false,
  setIsHidden: () => {},
});

export default HistoryContext;
