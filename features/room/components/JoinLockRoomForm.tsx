import { FormEvent, PropsWithChildren, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "@/components/shared/Button/v2";
import Icon from "@/components/shared/Icon";
import InputOTP from "@/components/shared/InputOTP";

interface JoinLockRoomFormProps extends PropsWithChildren {
  onSubmit: (password: string) => Promise<void>;
}

function JoinLockRoomForm({ children, onSubmit }: JoinLockRoomFormProps) {
  const { t } = useTranslation("rooms");
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
      await onSubmit(password);
    } catch (error) {
      if (typeof error === "string") {
        setErrorMessage(error);
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
