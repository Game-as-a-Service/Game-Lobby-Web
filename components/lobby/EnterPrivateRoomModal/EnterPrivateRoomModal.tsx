import type { ClipboardEvent } from "react";

import Modalow from "@/components/shared/Modalow";
import PasswordField from "@/components/shared/PasswordField";

type EnterPrivateRoomModalProps = {
  isOpen: boolean;
  loading?: boolean;
  passwordValues: string[];
  setPasswordValues: (values: string[]) => void;
  onClose: () => void;
  onPaste?: (e: ClipboardEvent<HTMLDivElement>) => void;
};

export default function EnterPrivateRoomModal({
  isOpen,
  loading,
  passwordValues,
  setPasswordValues,
  onClose,
  onPaste,
}: EnterPrivateRoomModalProps) {
  return (
    <Modalow hasTitle={false} isOpen={isOpen} onClose={onClose} size="small">
      <div
        className="p-3 m-[26px] border-2 border-blue2f rounded-[10px] flex justify-center text-center"
        onPaste={onPaste}
      >
        <PasswordField
          title={"私人房間"}
          subTitle={"請輸入此房間密碼"}
          passwordValues={passwordValues}
          setPasswordValues={setPasswordValues}
          disabled={loading}
          active
        />
      </div>
      {loading && (
        <div className="fixed inset-0 grid place-items-center bg-black/30">
          <div className="border-4 border-white/40 border-t-white/10 w-6 h-6 rounded-full animate-spin"></div>
        </div>
      )}
    </Modalow>
  );
}
