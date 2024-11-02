import { useState, FormEvent, useRef } from "react";
import { AxiosError } from "axios";

import Button from "@/components/shared/Button/v2";
import Input from "@/components/shared/Input";
import useRequest from "@/hooks/useRequest";
import { UserInfo, putUserinfoEndpoint } from "@/requests/users";
import { useToast } from "@/components/shared/Toast";

interface UserInfoFormProps extends UserInfo {
  onCancel: () => void;
}

type UserInfoFormErrors = Partial<Record<keyof UserInfo, string>>;

function UserInfoForm({
  onCancel,
  ...userInfoProps
}: Readonly<UserInfoFormProps>) {
  const { fetch } = useRequest();
  const toast = useToast();
  const [userInfo, setUserInfo] = useState<UserInfo>(userInfoProps);
  const [errors, setErrors] = useState<UserInfoFormErrors>({});
  const nicknameInputRef = useRef<HTMLInputElement>(null);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    if (Object.keys(errors).length) {
      nicknameInputRef.current?.focus();
      return;
    }

    try {
      await fetch(
        putUserinfoEndpoint({
          ...userInfo,
          nickname: userInfo.nickname.trim(),
        }),
        { toast: { show: false } }
      );
    } catch (error) {
      if (error instanceof AxiosError) {
        toast(
          { state: "error", children: error.response?.data.message },
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

    setUserInfo((prev) => ({ ...prev, nickname }));

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
          value={userInfo.nickname}
          autoFocus
        />
      </div>
      <footer className="flex justify-center gap-6">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          className="w-36 py-2.5"
        >
          取消修改
        </Button>
        <Button type="submit" className="w-36 py-2.5">
          儲存修改
        </Button>
      </footer>
    </form>
  );
}

export default UserInfoForm;
