import { useState, useEffect } from "react";
import { useRouter } from "next/router";

import Modalow from "@/components/shared/Modalow";
import PasswordField from "@/components/shared/PasswordField";
import useRequest from "@/hooks/useRequest";
import { postRoomEntry } from "@/requests/rooms";

type EnterPrivateRoomModalProps = {
  roomId: string;
  onClose: () => void;
};

const INIT_PASSWORD = ["", "", "", ""];

export default function EnterPrivateRoomModal({
  roomId,
  onClose,
}: EnterPrivateRoomModalProps) {
  const [passwordValues, setPasswordValues] = useState(INIT_PASSWORD);
  const [isLoading, setIsLoading] = useState(false);
  const { fetch } = useRequest();
  const router = useRouter();

  useEffect(() => {
    async function fetchRoomEntry() {
      setIsLoading(true);

      try {
        const { message } = await fetch(
          postRoomEntry(roomId, passwordValues.join(""))
        );

        if (message === "success") {
          onClose();
          router.push(`/rooms/${roomId}`);
        }
      } catch (err) {
        // TODO: 錯誤處理
      } finally {
        setIsLoading(false);
        setPasswordValues(INIT_PASSWORD);
      }
    }

    if (isLoading) return;
    if (passwordValues.every((char) => char !== "")) {
      fetchRoomEntry();
    }
  }, [roomId, passwordValues, isLoading, onClose, fetch, router]);

  return (
    <Modalow hasTitle={false} isOpen={!!roomId} onClose={onClose} size="small">
      <div className="p-3 m-[26px] border-2 border-blue rounded-[10px] flex justify-center text-center">
        <PasswordField
          title={"私人房間"}
          subTitle={"請輸入此房間密碼"}
          passwordValues={passwordValues}
          setPasswordValues={setPasswordValues}
          disabled={isLoading}
          active
        />
      </div>
      {isLoading && (
        <div className="fixed inset-0 grid place-items-center bg-black/30">
          <div className="border-4 border-white/40 border-t-white/10 w-6 h-6 rounded-full animate-spin"></div>
        </div>
      )}
    </Modalow>
  );
}
