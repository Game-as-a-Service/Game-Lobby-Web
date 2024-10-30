import { useRef, FC, KeyboardEvent, useEffect } from "react";
import Input from "@/components/shared/Input";

type PasswordFieldProps = {
  active: boolean;
  title: string;
  subTitle: string;
  passwordValues: string[];
  disabled?: boolean;
  setPasswordValues: (values: string[]) => void;
  onInputClick?: (e: React.MouseEvent<HTMLElement>) => void;
};

const PasswordField: FC<PasswordFieldProps> = ({
  active,
  title,
  subTitle,
  passwordValues,
  disabled,
  setPasswordValues,
  onInputClick,
}) => {
  const passwordRefs = useRef<(HTMLInputElement | null)[]>([]);

  const isNumeric = (value: string) => /[\d]/.test(value);

  const handlePasswordFocus = (index: number) => {
    passwordRefs.current[index]?.focus();
  };

  const handlePasswordChange = (value: string, index: number) => {
    if (!isNumeric(value) && value !== "") return;
    if (value.length > 1) return;
    const nextPasswords = [...passwordValues];
    nextPasswords[index] = value;
    setPasswordValues(nextPasswords);
  };

  const moveValuesForward = (index: number) => {
    const nextPasswords = [...passwordValues];
    for (let i = index; i < nextPasswords.length - 1; i++) {
      nextPasswords[i] = nextPasswords[i + 1];
    }
    nextPasswords[index] = "";
    nextPasswords[nextPasswords.length - 1] = "";
    setPasswordValues(nextPasswords);
  };

  const handlePasswordKeyUp = (e: KeyboardEvent, index: number) => {
    const previousIndex = index - 1;
    const nextIndex = index + 1;
    const currentPassword = passwordValues[index];
    const isArrowLeft = e.key === "ArrowLeft";
    const isArrowRight = e.key === "ArrowRight";
    const isDelete = e.key === "Delete";
    const isBackspace = e.key === "Backspace";
    const isNumericKey = isNumeric(e.key);

    if (isArrowLeft) {
      handlePasswordFocus(previousIndex);
    } else if (isArrowRight) {
      handlePasswordFocus(nextIndex);
    } else if ((isDelete || isBackspace) && currentPassword !== "") {
      handlePasswordChange("", index);
    } else if (isBackspace) {
      handlePasswordFocus(previousIndex);
      handlePasswordChange("", previousIndex);
    } else if (isDelete) {
      moveValuesForward(index);
    } else if (isNumericKey) {
      handlePasswordChange(e.key, index);
      handlePasswordFocus(nextIndex);
    }
  };

  const setFocusedPasswordField = () => {
    if (active) {
      const index = passwordValues.findIndex((password) => password === "");
      handlePasswordFocus(index);
    }
  };

  useEffect(() => {
    if (!active) setPasswordValues(["", "", "", ""]);
    setFocusedPasswordField();
  }, [active]);

  return (
    <div onClick={setFocusedPasswordField}>
      {title}
      <div className="text-sm mt-[14px] flex flex-col">{subTitle}</div>
      <div className="flex gap-[5px] mt-[7px]">
        {passwordValues.map((password, index) => (
          <div key={index}>
            <Input
              id={`input-password-${index}`}
              ref={(element) => (passwordRefs.current[index] = element)}
              type="text"
              maxLength={1}
              inputClassName="w-[34px] aspect-square rounded-[10px] text-[#2F88FF] text-center cursor-default caret-transparent p-0"
              value={password}
              onKeyUp={(e) => handlePasswordKeyUp(e, index)}
              onClick={(event) => {
                event.stopPropagation(); // 防止冒泡到父層的onClick
                onInputClick && onInputClick(event);
              }}
              disabled={disabled}
              data-testid={`input-password-${index}`}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PasswordField;
