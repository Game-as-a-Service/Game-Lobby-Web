import { PropsWithChildren, useReducer, useCallback } from "react";
import RoomContext, { initRoomInfo } from "@/shared/contexts/RoomContext";
import { REDUCER_ACTION_TYPE, ReducerAction, RoomInfoType, User } from "./type";

const useRoomReducer = (
  state: RoomInfoType,
  action: ReducerAction
): RoomInfoType => {
  switch (action.type) {
    case REDUCER_ACTION_TYPE.INITIALIZE_ROOM: {
      return action.payload;
    }

    case REDUCER_ACTION_TYPE.ADD_PLAYER: {
      const { payload } = action;
      const nextPlayers: RoomInfoType["players"] = [
        ...state.players,
        { ...payload, isReady: false },
      ];
      return {
        ...state,
        players: nextPlayers,
        currentPlayers: state.currentPlayers + 1,
      };
    }

    case REDUCER_ACTION_TYPE.REMOVE_PLAYER: {
      const { payload } = action;
      const nextPlayers: RoomInfoType["players"] = state.players.filter(
        (player) => player.id !== payload.id
      );
      return {
        ...state,
        players: nextPlayers,
        currentPlayers: state.currentPlayers - 1,
      };
    }

    case REDUCER_ACTION_TYPE.UPDATE_HOST: {
      const { payload } = action;
      const nextHost = state.players.find((player) => player.id === payload.id);
      if (!nextHost)
        throw new Error("Recived invalid user id when updating host");
      return { ...state, host: nextHost };
    }

    case REDUCER_ACTION_TYPE.TOGGLE_USER_READY_STATUS: {
      const { payload } = action;
      const nextPlayers = [...state.players];
      const userIndex = nextPlayers.findIndex(
        (player) => player.id === payload.id
      );

      if (userIndex === -1)
        throw new Error("Recived invalid user id when toggling ready status.");

      nextPlayers[userIndex].isReady = !nextPlayers[userIndex].isReady;
      return {
        ...state,
        players: nextPlayers,
      };
    }

    case REDUCER_ACTION_TYPE.UPDATE_ROOM_STATUS: {
      const { payload } = action;
      return { ...state, status: payload.status };
    }

    case REDUCER_ACTION_TYPE.CLEAN_UP_ROOM: {
      return { ...initRoomInfo };
    }
    default:
      throw new Error("Invalid action type");
  }
};

function useRoomCore(initState: RoomInfoType) {
  const [roomInfo, dispatch] = useReducer(useRoomReducer, initState);

  const initializeRoom = useCallback((roomInfo: RoomInfoType) => {
    dispatch({ type: REDUCER_ACTION_TYPE.INITIALIZE_ROOM, payload: roomInfo });
  }, []);

  const addPlayer = useCallback((payload: Omit<User, "isReady">) => {
    dispatch({ type: REDUCER_ACTION_TYPE.ADD_PLAYER, payload });
  }, []);

  const removePlayer = useCallback((userId: User["id"]) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.REMOVE_PLAYER,
      payload: { id: userId },
    });
  }, []);

  const updateHost = useCallback((userId: User["id"]) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.UPDATE_HOST,
      payload: { id: userId },
    });
  }, []);

  const updateRoomStatus = useCallback((status: RoomInfoType["status"]) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.UPDATE_ROOM_STATUS,
      payload: { status },
    });
  }, []);

  const toggleUserReadyStatus = useCallback((userId: User["id"]) => {
    dispatch({
      type: REDUCER_ACTION_TYPE.TOGGLE_USER_READY_STATUS,
      payload: { id: userId },
    });
  }, []);

  const cleanUpRoom = useCallback(() => {
    dispatch({ type: REDUCER_ACTION_TYPE.CLEAN_UP_ROOM });
  }, []);

  return {
    roomInfo,
    initializeRoom,
    addPlayer,
    removePlayer,
    updateHost,
    updateRoomStatus,
    toggleUserReadyStatus,
    cleanUpRoom,
  };
}

export type UseRoomContextType = ReturnType<typeof useRoomCore>;

const RoomContextProvider = ({ children }: PropsWithChildren) => {
  const RoomContextValue = useRoomCore(initRoomInfo);
  return (
    <RoomContext.Provider value={RoomContextValue}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomContextProvider;
