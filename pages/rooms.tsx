import { useState, ReactElement, useEffect, useCallback } from "react";

import { cn } from "@/lib/utils";
import { Room, RoomType } from "@/requests/rooms";
import RoomsListView from "@/containers/room/RoomListView";

const Rooms = () => {
  return (
    <>
      <div
        className={cn(
          "bg-[#292A2D] rounded-[10px] py-[34px] px-[24px] m-[16px] h-[calc(100vh-34px)]"
        )}
      >
        <RoomsListView status={RoomType.WAITING} />
        <RoomsListView status={RoomType.PLAYING} />
      </div>
    </>
  );
};

Rooms.getLayout = (page: ReactElement) => page;
export default Rooms;
