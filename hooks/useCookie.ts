import { useMemo } from "react";
import cookie from "js-cookie";

enum CookieKey {
  TOKEN = "_token",
  ROOM_ID = "_room_id",
}

interface CookieOperator<T> {
  get: () => T | string | undefined;
  set: (value: T) => void;
  remove: () => void;
}

const generator = <T>(key: CookieKey): CookieOperator<T> => {
  return {
    get() {
      const data = cookie.get(key);
      if (data) {
        return JSON.parse(data) as T;
      }
      return data;
    },
    set(value) {
      cookie.set(
        key,
        value instanceof String ? (value as string) : JSON.stringify(value)
      );
    },
    remove() {
      cookie.remove(key);
    },
  };
};

const useCookie = () => {
  const tokenOperator = useMemo(() => {
    return generator<string>(CookieKey.TOKEN);
  }, []);

  const roomIdOperator = useMemo(() => {
    return generator<string>(CookieKey.ROOM_ID);
  }, []);

  return {
    token: tokenOperator,
    roomId: roomIdOperator,
  };
};

export default useCookie;
