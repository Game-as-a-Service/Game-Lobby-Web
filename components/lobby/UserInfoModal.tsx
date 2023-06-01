import { useState } from "react";
import { AxiosError } from "axios";

import { cn } from "@/lib/utils";
import Button from "@/components/shared/Button";
import Input from "@/components/shared/Input";
import Modal from "@/components/shared/Modalow/Modalow";
import useRequest from "@/hooks/useRequest";

// TODO: Would be UpdateUserInfoEndpoint
import { createNicknameEndpoint } from "@/requests/users";

// TODO: Replace w/ real user info
const mockUserInfo = {
  id: "1",
  nickname: "",
  email: "123@gmail.com",
};

// TODO: Update Style when design is ready
const UserInfoModal = ({ isOpen }: { isOpen: boolean }) => {
  const [errorMsg, setErrorMsg] = useState("");
  const [nickname, setNickname] = useState("");
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
      const body = { ...mockUserInfo, nickname };

      const response = await fetch(createNicknameEndpoint(body));

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
        hideCloseIcon={true}
        maskClosable={false}
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
        <Input
          // TODO: For Consistent Design System, className should be in shared/components/Input
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
        />
      </Modal>
    </>
  );
};

export default UserInfoModal;
