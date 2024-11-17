import { useState } from "react";
import { useRouter } from "next/router";
import { AxiosError } from "axios";
import { useTranslation } from "next-i18next";

import { postRoomEntry, getRoomInfoEndpoint } from "@/requests/rooms";
import useRequest from "@/hooks/useRequest";
import useUser from "@/hooks/useUser";
import { useToast } from "@/components/shared/Toast";

function useJoinRoom(id: string) {
  const { t } = useTranslation();
  const { fetch } = useRequest();
  const { updateRoomId } = useUser();
  const toast = useToast();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleJoinRoom = async (password: string | null = null) => {
    if (isLoading) return;

    setIsLoading(true);

    // Automatically enter the room if room information is accessible,
    // indicating the user is already in the room
    if (await fetch(getRoomInfoEndpoint(id)).catch(() => {})) {
      router.push(`/rooms/${id}`);
      updateRoomId(id);
      return;
    }

    try {
      await fetch(postRoomEntry(id, password));
      router.push(`/rooms/${id}`);
      updateRoomId(id);
    } catch (err) {
      if (err instanceof AxiosError) {
        const msg = err.response?.data.message.replaceAll(" ", "_");
        if (!msg) return toast({ children: "error!", state: "error" });
        toast({ children: t(msg), state: "error" });
        throw err;
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { handleJoinRoom };
}

export default useJoinRoom;
