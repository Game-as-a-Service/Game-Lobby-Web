import type { ClassValue } from "clsx";
import {
  ChangeEvent,
  ForwardedRef,
  ForwardRefRenderFunction,
  InputHTMLAttributes,
  ReactNode,
  forwardRef,
  useId,
} from "react";
import { cn } from "@/lib/utils";

export type ChangeHandler = (
  value: string,
  event: ChangeEvent<HTMLInputElement>
) => void;

export interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "maxLength" | "prefix" | "className" | "onChange"
  > {
  /** The current value of the input */
  value?: string;

  /** The default value of the input */
  defaultValue?: string;

  /** The label text */
  label?: string;

  /** The ref object used to access the underlying HTMLInputElement */
  inputRef?: ForwardedRef<HTMLInputElement>;

  /** If `true`, the input will be in disabled mode */
  disabled?: boolean;

  /** If `true`, the input will be in read only mode */
  readOnly?: boolean;

  /** If `true`, the input will be in required mode */
  required?: boolean;

  /** If `true`, the input will display an error style */
  error?: boolean;

  /** Display error message */
  errorMessage?: string | string[];

  /** Display the current length of the value and the maximum length */
  maxLength?: string | number;

  /** Input prefix */
  prefix?: ReactNode;

  /** Input suffix */
  suffix?: ReactNode;

  /** For root class name */
  className?: ClassValue;

  /** For label class name */
  labelClassName?: ClassValue;

  /** For input class name */
  inputClassName?: ClassValue;

  /** For error message class name */
  errorClassName?: ClassValue;

  /** For error message class name */
  maxLengthClassName?: ClassValue;

  /**
   * Callback function that is called when the value of the input changes.
   * @param value - The new value of the input.
   * @param event - The event object associated with the change event.
   */
  onChange?: ChangeHandler;
}

const InteralInput: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    value,
    label,
    inputRef,
    disabled,
    readOnly,
    required,
    error,
    errorMessage,
    maxLength,
    prefix,
    suffix,
    className,
    labelClassName: labelClassNameProp,
    inputClassName: inputClassNameProp,
    errorClassName: errorClassNameProp,
    maxLengthClassName: maxLengthClassNameProp,
    onChange,
    ...attributes
  },
  ref
) => {
  const reactId = useId();

  const inputAttributes: InputHTMLAttributes<HTMLInputElement> = {
    value,
    disabled,
    readOnly,
    required,
    "aria-disabled": disabled,
    "aria-readonly": readOnly,
    "aria-required": required,
    ...attributes,
  };

  const inputId = inputAttributes.id || `input_${reactId}`;

  const rootClassName = cn(
    "relative flex items-center gap-2 text-white/90",
    error && "border-red-500 outline-red-500/20",
    disabled && "opacity-50 pointer-events-none",
    className
  );

  const inputClassName = cn(
    "px-3 py-0.5 flex-[3] box-border bg-[#1E1F22] border-2 border-[#1E1F22] rounded-[10px] transition-[border] duration-200 ease-in focus:border-[#2F88FF]/60 focus:outline-none",
    error && "border-[#CC2431]",
    inputClassNameProp
  );

  const labelClassName = cn(
    "pl-1 flex-1 border-l-4 border-l-[#2F88FF] font-black leading-tight select-none transition-[border] duration-200 ease-in",
    error && "border-l-[#CC2431]",
    labelClassNameProp
  );

  const errorClassName = cn(
    "ml-2 text-white/90 text-sm",
    error && "text-[#CC2431]",
    errorClassNameProp
  );

  const maxLengthClassName = cn(
    "absolute bottom-0.5 right-1.5 text-xs text-white/60",
    value && value.length > Number(maxLength) && "text-[#CC2431]/80",
    maxLengthClassNameProp
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    onChange?.(value, e);
  };

  return (
    <>
      <div ref={ref} className={rootClassName}>
        {label && (
          <label htmlFor={inputId} className={labelClassName}>
            {label}
          </label>
        )}
        {prefix}
        <input
          ref={inputRef}
          id={inputId}
          className={inputClassName}
          onChange={handleChange}
          {...inputAttributes}
        />
        {suffix}
        {value && maxLength && (
          <div className={maxLengthClassName}>
            {value.length} / {maxLength}
          </div>
        )}
      </div>
      {errorMessage && (
        <div className={errorClassName}>
          {Array.isArray(errorMessage)
            ? errorMessage.map((message) => (
                <div key={message} className="leading-tight">
                  {message}
                </div>
              ))
            : errorMessage}
        </div>
      )}
    </>
  );
};

export const Input = forwardRef(InteralInput);

export default Input;
