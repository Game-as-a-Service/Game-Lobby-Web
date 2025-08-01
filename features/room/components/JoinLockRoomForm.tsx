import { FormEvent, PropsWithChildren, useState } from "react";
import { useTranslation } from "react-i18next";
import Button from "@/components/shared/Button";
import Icon from "@/components/shared/Icon";
import InputOTP from "@/components/shared/InputOTP";
import { useJoinRoom } from "../hooks";

interface JoinLockRoomFormProps extends PropsWithChildren {
  id: string;
}

function JoinLockRoomForm({ id, children }: Readonly<JoinLockRoomFormProps>) {
  const { t } = useTranslation();
  const { joinRoom } = useJoinRoom();
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (value: string) => {
    setErrorMessage("");
    setPassword(value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setErrorMessage("");
    try {
      await joinRoom(id, { password });
    } catch (error: unknown) {
      if (error instanceof Error) {
        const msg = error.message || "加入房間失敗";
        setErrorMessage(t(msg.replaceAll(" ", "_")));
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col items-center">
      {children}

      <InputOTP
        value={password}
        onChange={handleChange}
        length={4}
        hintText={errorMessage}
        error={!!errorMessage}
        autoFocus
      />

      <Button
        type="submit"
        className="mt-8 flex w-36 py-2.5"
        variant="highlight"
      >
        <Icon name="Gamepad" className="w-6 h-6" />
        即刻遊戲
      </Button>
    </form>
  );
}

export default JoinLockRoomForm;
