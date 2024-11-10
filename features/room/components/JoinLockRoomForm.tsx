import { AxiosError } from "axios";
import { FormEvent, PropsWithChildren, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/shared/Button/v2";
import Icon from "@/components/shared/Icon";
import InputOTP from "@/components/shared/InputOTP";
import { useJoinRoom } from "../hooks";

interface JoinLockRoomFormProps extends PropsWithChildren {
  id: string;
}

function JoinLockRoomForm({ id, children }: Readonly<JoinLockRoomFormProps>) {
  const { t } = useTranslation("rooms");
  const { handleJoinRoom } = useJoinRoom(id);
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
      await handleJoinRoom(password);
    } catch (error) {
      /// 待調整重構
      if (error instanceof AxiosError) {
        const msg = error.response?.data.message.replaceAll(" ", "_");
        if (!msg) return;
        setErrorMessage(t(msg));
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
