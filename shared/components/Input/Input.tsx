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
    "prefix" | "className" | "onChange"
  > {
  /** The current value of the input */
  value: string;

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
  errorMessage?: string;

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
    prefix,
    suffix,
    className,
    labelClassName: labelClassNameProp,
    inputClassName: inputClassNameProp,
    errorClassName: errorClassNameProp,
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
    "group m-1 flex items-center bg-gray-950 text-white/90 border border-indigo-500 focus-within:outline outline-indigo-500/20",
    error && "border-red-500 outline-red-500/20",
    disabled && "opacity-50 pointer-events-none",
    className
  );

  const inputClassName = cn(
    "px-4 py-1.5 bg-gray-950 focus:outline-none",
    inputClassNameProp
  );
  
  const labelClassName = cn("select-none", labelClassNameProp);

  const errorClassName = cn("ml-3 text-red-500", errorClassNameProp);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    onChange?.(value, e);
  };

  return (
    <>
      <div ref={ref} className={rootClassName}>
        {prefix}
        {label && (
          <label htmlFor={inputId} className={labelClassName}>
            {label}
          </label>
        )}
        <input
          ref={inputRef}
          id={inputId}
          className={inputClassName}
          onChange={handleChange}
          {...inputAttributes}
        />
        {suffix}
      </div>
      {errorMessage && <span className={errorClassName}>{errorMessage}</span>}
    </>
  );
};

export const Input = forwardRef(InteralInput);

export default Input;
