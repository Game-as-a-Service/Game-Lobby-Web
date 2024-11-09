import { useState, FormEvent, useRef, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import useRequest from "@/hooks/useRequest";
import Button from "@/components/shared/Button/v2";
import Input from "@/components/shared/Input";
import InputOTP, { InputOTPRef } from "@/components/shared/InputOTP";
import Icon from "@/components/shared/Icon";
import SelectBoxGroup from "@/components/shared/SelectBoxGroup";
import { createRoomEndpoint, CreateRoomFormType } from "@/requests/rooms";

const items = [
  {
    key: "Public",
    label: (
      <div className="px-2 py-1 flex gap-2.5 items-center justify-center whitespace-nowrap">
        <Icon name="House" className="w-8 h-8" />
        公開房間
      </div>
    ),
    value: false,
  },
  {
    key: "Private",
    label: (
      <div className="px-2 py-1 flex gap-2.5 items-center justify-center whitespace-nowrap">
        <Icon name="HouseLock" className="w-8 h-8" />
        私人房間
      </div>
    ),
    value: true,
  },
];

interface CreateRoomFormProps {
  gameId: string;
  minPlayers: number;
  maxPlayers: number;
  onCancel: () => void;
}

type CreateRoomFormErrors = Partial<Record<keyof CreateRoomFormType, string>>;

function CreateRoomForm({
  gameId,
  minPlayers,
  maxPlayers,
  onCancel,
}: Readonly<CreateRoomFormProps>) {
  const [roomForm, setRoomForm] = useState<CreateRoomFormType>({
    name: "",
    gameId,
    minPlayers,
    maxPlayers,
  });
  const { fetch } = useRequest();
  const router = useRouter();
  const { t } = useTranslation("rooms");
  const [isLockRoom, setIsLockRoom] = useState(false);
  const passwordInputRef = useRef<InputOTPRef>(null);
  const gameNameInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<CreateRoomFormErrors>({});

  const handleChange =
    <T extends keyof CreateRoomFormType>(key: T) =>
    (value: CreateRoomFormType[T]) => {
      setRoomForm((pre) => ({
        ...pre,
        [key]: value,
      }));
    };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setErrors({});

    const newErrors: CreateRoomFormErrors = {};

    if (isLockRoom && roomForm.password?.length !== 4) {
      passwordInputRef.current?.focus();
      newErrors.password = t("enter_game_password");
    }
    if (!roomForm.name) {
      gameNameInputRef.current?.focus();
      newErrors.name = "請輸入房間名稱";
    }

    if (Object.keys(newErrors).length) {
      setErrors(newErrors);
      return;
    }

    const result = await fetch(createRoomEndpoint(roomForm));
    router.push(`/rooms/${result.id}`);
  };

  useEffect(() => {
    if (isLockRoom) {
      passwordInputRef.current?.focus();
    } else {
      setRoomForm((pre) => ({ ...pre, password: undefined }));
    }
  }, [isLockRoom]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8 flex flex-col gap-4">
        <Input
          ref={gameNameInputRef}
          label="房間名稱"
          placeholder="為你的房間取一個名字"
          inputWrapperClassName="w-full"
          onChange={handleChange("name")}
          hintText={errors.name}
          error={!!errors.name}
          value={roomForm.name}
          autoFocus
        />
        <div>
          <div className="mb-1 text-sm font-medium text-primary-200">
            房間人數
          </div>
          <div className="mb-1 text-sm font-medium text-primary-300">
            {minPlayers}-{maxPlayers}人
          </div>
        </div>
        <SelectBoxGroup
          label="房間類型"
          items={items}
          labelClassName="text-sm"
          itemWrapperClassName="flex"
          itemClassName="grow"
          value={isLockRoom}
          onChange={setIsLockRoom}
        />
        {isLockRoom && (
          <InputOTP
            ref={passwordInputRef}
            label="房間密碼"
            labelClassName="text-sm"
            hintText={errors.password}
            error={!!errors.password}
            value={roomForm.password}
            onChange={handleChange("password")}
            length={4}
          />
        )}
      </div>
      <footer className="flex justify-center gap-6">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="w-36 py-2.5"
        >
          關閉
        </Button>
        <Button type="submit" className="flex w-36 py-2.5">
          <Icon name="Gamepad" className="w-6 h-6" />
          即刻遊戲
        </Button>
      </footer>
    </form>
  );
}

export default CreateRoomForm;
