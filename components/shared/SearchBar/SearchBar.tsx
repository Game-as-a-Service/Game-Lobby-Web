import type { ClassValue } from "clsx";
import { FormEvent, ForwardedRef } from "react";
import { cn } from "@/lib/utils";

import Button from "../Button";
import Input, { ChangeHandler } from "../Input";

type SubmitHandler = (value: string, event: FormEvent<HTMLFormElement>) => void;

interface SearchBarProps {
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
}: SearchBarProps) => {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit?.(value, e);
  };

  const rootClassName = cn(
    "group flex rounded-[10px] border border-[#2D2D2E] shadow focus-within:border-[#2F88FF]/80 focus-within:shadow-[#2F88FF]/40 transition-[box-shadow,border]",
    className
  );

  const inputWrapperClassName = cn("flex-1", inputWrapperClassNameProps);

  const inputClassName = cn("rounded-r-none border-0", inputClassNameProps);

  const buttonClassName = cn(
    "leading-none bg-[#2D2D2E] rounded-l-none rounded-r shadow-none group-focus-within:bg-[#2F88FF]/80 active:group-focus-within:bg-[#2173DD]",
    buttonClassNameProps
  );

  return (
    <form onSubmit={handleSubmit} className={rootClassName}>
      <Input
        ref={inputRef}
        role="search"
        value={value}
        placeholder={placeholder}
        autoFocus={autoFocus}
        className={inputWrapperClassName}
        inputClassName={inputClassName}
        onChange={onChange}
      />
      <Button ref={buttonRef} className={buttonClassName} loading={loading}>
        {buttonText}
      </Button>
    </form>
  );
};
