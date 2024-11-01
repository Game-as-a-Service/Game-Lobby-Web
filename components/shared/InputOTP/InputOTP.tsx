import { useRef, KeyboardEvent, useId, useState, useEffect } from "react";
import Input from "@/components/shared/Input";
import { cn } from "@/lib/utils";

type InputOTPProps = {
  length: number;
  value?: string;
  defaultValue?: string;
  label?: string;
  error?: boolean;
  labelClassName?: string;
  onChange?: (value: string) => void;
};

function InputOTP({
  length,
  value,
  defaultValue = "",
  label,
  error,
  labelClassName,
  onChange,
}: InputOTPProps) {
  const reactId = useId();
  const inputOPTId = `input_opt_${reactId}`;
  const [chars, setChars] = useState(() => (value || defaultValue).split(""));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);
  const inputIds = Array.from({ length }, (_, i) => `${inputOPTId}_${i}`);

  const updateChars = (newChars: string[]) => {
    setChars(newChars);
    onChange?.(newChars.join(""));
  };

  const handleChange = (value: string, index: number) => {
    const newChars = [...chars];
    newChars[index] = value;
    updateChars(newChars);
  };

  const shiftCharsLeftByIndex = (index: number) => {
    updateChars([...chars.slice(0, index), "", ...chars.slice(index + 2)]);
  };

  const focusNextInput = (index: number) => {
    if (index < length - 1) inputsRef.current[index + 1]?.focus();
  };

  const focusPreviousInput = (index: number) => {
    if (index > 0) inputsRef.current[index - 1]?.focus();
  };

  const handleKeyUp = (index: number) => (e: KeyboardEvent) => {
    const isArrowLeft = e.key === "ArrowLeft";
    const isArrowRight = e.key === "ArrowRight";
    const isBackspace = e.key === "Backspace";
    const isDelete = e.key === "Delete";
    const isNumeric = /\d/.test(e.key);

    if (isArrowLeft) {
      focusPreviousInput(index);
    } else if (isArrowRight) {
      focusNextInput(index);
    } else if ((isDelete || isBackspace) && chars[index]) {
      handleChange("", index);
    } else if (isBackspace) {
      focusPreviousInput(index);
      handleChange("", index - 1);
    } else if (isDelete) {
      shiftCharsLeftByIndex(index);
    } else if (isNumeric) {
      handleChange(e.key, index);
      focusNextInput(index);
    }
  };

  useEffect(() => {
    if (value) {
      setChars(value.split(""));
    }
  }, [value]);

  return (
    <div>
      {label && (
        <label
          htmlFor={inputOPTId}
          className={cn(
            "block mb-1 font-medium text-primary-200",
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      <div className="flex gap-2">
        {inputIds.map((id, index) => (
          <Input
            key={id}
            id={index === 0 ? inputOPTId : undefined}
            ref={(element) => (inputsRef.current[index] = element)}
            inputClassName="w-10 px-3 py-2.5 text-center"
            maxLength={1}
            error={error}
            value={chars[index] || ""}
            onKeyUp={handleKeyUp(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default InputOTP;
