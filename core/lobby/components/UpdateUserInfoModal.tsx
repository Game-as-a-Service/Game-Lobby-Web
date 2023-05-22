import { FC, useState } from "react";
import { AxiosError } from "axios";
import { cn } from "@/lib/utils";
import Button from "@/shared/components/Button";
import Input from "@/shared/components/Input";
import Modal from "@/shared/components/Modalow/Modalow";
import useRequest from "@/shared/hooks/useRequest";
import { UserInfo, putNicknameEndpoint } from "@/requests/users";

// TODO: Replace w/ real user info
const mockUserInfo = {
  id: "1",
  nickname: "test",
  email: "123@gmail.com",
};

type UpdateUserInfoModalProps = {
  isOpen: boolean;
};
const UpdateUserInfoModal: FC<UpdateUserInfoModalProps> = (props) => {
  const { isOpen } = props;
  const [userInfo, setUserInfo] = useState<UserInfo>(mockUserInfo);
  const [errorMsg, setErrorMsg] = useState("");
  const [nickname, setNickname] = useState(userInfo.nickname);
  const [isOpenModal, setIsOpenModal] = useState(isOpen);
  const { fetch } = useRequest();

  const hasError = errorMsg !== "";
  const invalid = nickname.length === 0 || hasError;

  const handleChange = (value: string) => {
    setNickname(value);

    // Regex pattern for special characters. Allow only alphanumeric and spaces
    const regex = /^[a-zA-Z0-9 ]*$/;

    if (value.length === 0) {
      setErrorMsg("暱稱欄位不可空白");
    } else if (!regex.test(value)) {
      setErrorMsg("暱稱不可輸入特殊字元");
    } else if (value.length < 4) {
      setErrorMsg("暱稱長度過短");
    } else if (value.length > 16) {
      setErrorMsg("暱稱長度過長");
    } else {
      setErrorMsg("");
    }
  };

  const onSubmit = async () => {
    if (invalid) return;
    try {
      const body = { ...userInfo, nickname };
      const { nickname: newNickname } = await fetch(putNicknameEndpoint(body));
      if (!newNickname) throw new Error("nickname not found");
      setUserInfo((prev) => ({ ...prev, nickname: newNickname }));
      setIsOpenModal((prev) => !prev);
      // TODO: Success Notification
    } catch (error) {
      if (error instanceof AxiosError) {
        setErrorMsg(error.response?.data.message);
      }
    }
  };

  return (
    <>
      <Modal
        hasTitle={false}
        isOpen={isOpenModal}
        onClose={() => {
          setIsOpenModal((prev) => !prev);
        }}
        size="xLarge"
        footer={
          <Button
            className="w-full flex justify-center"
            disabled={invalid}
            onClick={onSubmit}
          >
            送出
          </Button>
        }
      >
        <div className="flex items-baseline gap-4 flex-col mb-3">
          <span className={"border-blue-500 border-l-4 pl-1"}>
            目前暱稱：{userInfo.nickname}
          </span>
          <span className={"border-red-500 border-l-4 pl-1"}>
            測試報錯請輸入暱稱：error
          </span>
        </div>
        <Input
          className={cn(
            "w-full border-0 bg-transparent grid grid-cols-[auto_1fr] gap-[25px] outline-0"
          )}
          labelClassName={cn("border-l-2 border-blue pl-2")}
          inputClassName={cn(
            "rounded-[10px] w-full  border border-dark29",
            "focus:border-blue transition-[border-color] duration-300 ease-in-out"
          )}
          errorClassName={cn("flex justify-end")}
          label="輸入暱稱"
          value={nickname}
          onChange={handleChange}
          error={hasError}
          errorMessage={errorMsg}
          onKeyDown={(e) => {
            if (e.key === "Enter" && !invalid) onSubmit();
          }}
        />
      </Modal>
    </>
  );
};

export default UpdateUserInfoModal;
