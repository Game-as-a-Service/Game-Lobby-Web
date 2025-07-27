import { useState, FormEvent, useRef } from "react";

import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import { useUpdateUser } from "@/contexts/auth/useAuth";
import type { User } from "@/api";
import { useToast } from "@/components/shared/Toast";
import { useAuth } from "@/contexts/auth/useAuth";

interface UserInfoFormProps {
  userInfo: User;
  onSuccess: () => void;
  onCancel: () => void;
}

type UserInfoFormErrors = Partial<Record<keyof User, string>>;

function UserInfoForm({
  userInfo,
  onSuccess,
  onCancel,
}: Readonly<UserInfoFormProps>) {
  const { trigger: updateUser, isMutating } = useUpdateUser();
  const toast = useToast();
  const { setCurrentUser } = useAuth();
  const [data, setData] = useState<User>(userInfo);
  const [errors, setErrors] = useState<UserInfoFormErrors>({});
  const nicknameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (Object.values(errors).some(Boolean)) {
      nicknameInputRef.current?.focus();
      return;
    }

    try {
      const result = await updateUser({
        nickname: data.nickname.trim(),
        avatar: data.avatar,
      });
      toast({ state: "success", children: "修改成功" });
      setCurrentUser(result);
      onSuccess();
    } catch (error: any) {
      if (error instanceof Error) {
        const message = error.message || "請求失敗";
        toast(
          { state: "error", children: message },
          {
            position: "bottom-left",
          }
        );
      } else {
        toast(
          { state: "error", children: `無法預期的錯誤： ${error}` },
          {
            position: "bottom-left",
          }
        );
      }
    }
  };

  const handleNicknameChange = (nickname: string) => {
    // Regex pattern for special characters. Allow only alphanumeric and spaces
    const validNameRegex = /^[a-zA-Z0-9\u4E00-\u9FFF ]+$/;

    setData((prev) => ({ ...prev, nickname }));

    if (nickname.trim().length === 0) {
      setErrors((pre) => ({ ...pre, nickname: "不可空白" }));
    } else if (!validNameRegex.test(nickname)) {
      setErrors((pre) => ({
        ...pre,
        nickname: "僅允許英文、中文、數字和空格",
      }));
    } else if (nickname.length < 4) {
      setErrors((pre) => ({ ...pre, nickname: "暱稱長度過短" }));
      return;
    } else if (nickname.length > 16) {
      setErrors((pre) => ({ ...pre, nickname: "暱稱長度過長" }));
    } else {
      setErrors((pre) => ({ ...pre, nickname: "" }));
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-8 flex flex-col gap-4">
        <Input
          ref={nicknameInputRef}
          label="暱稱"
          placeholder="為你取一個暱稱"
          inputWrapperClassName="w-full"
          onChange={handleNicknameChange}
          hintText={errors.nickname}
          error={!!errors.nickname}
          value={data.nickname}
          autoFocus
        />
      </div>
      <footer className="flex justify-center gap-6">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="w-36 py-2.5"
          disabled={isMutating}
        >
          取消修改
        </Button>
        <Button type="submit" className="w-36 py-2.5" disabled={isMutating}>
          儲存修改
        </Button>
      </footer>
    </form>
  );
}

export default UserInfoForm;
