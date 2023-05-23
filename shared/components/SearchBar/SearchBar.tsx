import type { ClassValue } from "clsx";
import { FormEvent, ForwardedRef, KeyboardEvent, useRef } from "react";
import { cn } from "@/lib/utils";

import Button from "../Button";
import Input, { ChangeHandler } from "../Input";

export type SubmitHandler = (
  value: string,
  event: FormEvent<HTMLFormElement>
) => void;

export interface SearchBarProps {
  /** The current value of the input */
  value: string;

  /** The placeholder text displayed in the search bar when it is empty */
  placeholder?: string;

  /** For button text content */
  buttonText?: string;

  /** If `true`, the button will be in loading mode  */
  loading?: boolean;

  /** If `true`, the input will receive autofocus when rendered.  */
  autoFocus?: boolean;

  /** The ref object used to access the underlying HTMLInputElement */
  inputRef?: ForwardedRef<HTMLInputElement>;

  /** The ref object used to access the underlying HTMLButtonElement */
  buttonRef?: ForwardedRef<HTMLButtonElement>;

  /** For root class name */
  className?: ClassValue;

  /** For input wrapper class name */
  inputWrapperClassName?: ClassValue;

  /** For input class name */
  inputClassName?: ClassValue;

  /** For button class name */
  buttonClassName?: ClassValue;

  /**
   * Callback function that is called when the value of the input changes.
   * @param value - The new value of the input.
   * @param event - The event object associated with the change event.
   */
  onChange?: ChangeHandler;

  /**
   * Callback function triggered when the user submits the search.
   * @param value - The current input value of the search bar.
   * @param event - The form submission event.
   */
  onSubmit?: SubmitHandler;

  /**
   * Callback function triggered when the Enter key is pressed.
   * @param value - The current value of the input.
   */
  onEnter?: (value: string) => void;
}

export const SearchBar = ({
  value,
  placeholder = "請輸入你想搜尋的遊戲,玩家名稱,帖子關鍵字...",
  buttonText = "搜索",
  loading,
  autoFocus,
  className,
  inputRef,
  buttonRef,
  inputWrapperClassName: inputWrapperClassNameProps,
  inputClassName: inputClassNameProps,
  buttonClassName: buttonClassNameProps,
  onChange,
  onSubmit,
  onEnter,
}: SearchBarProps) => {
  const isComposingRef = useRef(false);

  const setIsComposing = (value: boolean) => {
    isComposingRef.current = value;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(value, e);
  };

  const handleKeyUp = (e: KeyboardEvent<HTMLInputElement>) => {
    if (!isComposingRef.current && e.code === "Enter") {
      onEnter?.(value);
    }
  };

  const rootClassName = cn(
    "group m-2 flex rounded-lg border border-gray-800 shadow-lg outline-indigo-600 focus-within:outline focus-within:border-indigo-600 focus-within:shadow-indigo-500/40 transition-[box-shadow,outline]",
    className
  );

  const inputWrapperClassName = cn(
    "m-0 rounded-l-lg border-none focus-within:outline-none",
    inputWrapperClassNameProps
  );

  const inputClassName = cn("rounded-l-lg w-96", inputClassNameProps);

  const buttonClassName = cn(
    "bg-gray-800 rounded-l-none rounded-r shadow-none group-focus-within:bg-indigo-600 active:group-focus-within:bg-indigo-700",
    buttonClassNameProps
  );

  return (
    <form onSubmit={handleSubmit} className={rootClassName}>
      <Input
        ref={inputRef}
        value={value}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={inputWrapperClassName}
        inputClassName={inputClassName}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        onChange={onChange}
        onKeyUp={handleKeyUp}
      />
      <Button ref={buttonRef} className={buttonClassName} loading={loading}>
        {buttonText}
      </Button>
    </form>
  );
};

export default SearchBar;
