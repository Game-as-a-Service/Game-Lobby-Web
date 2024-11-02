import {
  ChangeEvent,
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

interface InputProps
  extends Omit<
    InputHTMLAttributes<HTMLInputElement>,
    "prefix" | "className" | "onChange"
  > {
  /** The current value of the input */
  value?: string;

  /** The default value of the input */
  defaultValue?: string;

  /** The label text */
  label?: string;

  /** If `true`, the input will be in disabled mode */
  disabled?: boolean;

  /** If `true`, the input will be in required mode */
  required?: boolean;

  /** If `true`, the input will display an error style */
  error?: boolean;

  /** Display hint text */
  hintText?: string;

  /** Input prefix */
  prefix?: ReactNode;

  /** Input suffix */
  suffix?: ReactNode;

  /** For root class name */
  className?: string;

  /** For label class name */
  labelClassName?: string;

  /** For input class name */
  inputClassName?: string;

  /** For input wrapper class name */
  inputWrapperClassName?: string;

  /** For hint text message class name */
  hintTextClassName?: string;

  /**
   * Callback function that is called when the value of the input changes.
   * @param value - The new value of the input.
   * @param event - The event object associated with the change event.
   */
  onChange?: ChangeHandler;
}

const InternalInput: ForwardRefRenderFunction<HTMLInputElement, InputProps> = (
  {
    value,
    label,
    disabled,
    required,
    error,
    hintText,
    prefix,
    suffix,
    className,
    labelClassName,
    inputClassName,
    inputWrapperClassName,
    hintTextClassName,
    onChange,
    ...attributes
  },
  ref
) => {
  const reactId = useId();

  const inputId = attributes.id || `input_${reactId}`;

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;

    onChange?.(value, e);
  };

  return (
    <div className={cn(disabled && "pointer-events-none", className)}>
      {label && (
        <label
          htmlFor={inputId}
          className={cn(
            "block mb-1 font-medium text-primary-200",
            labelClassName
          )}
        >
          {label}
        </label>
      )}
      <div
        className={cn(
          "mb-1 inline-flex items-center gap-2.5 rounded-lg",
          "leading-tight bg-primary-200/20 placeholder:text-primary-300",
          "outline outline-2 -outline-offset-2 outline-transparent focus-within:outline-primary-200",
          prefix && "pl-4",
          suffix && "pr-4",
          disabled && "bg-grey-800",
          error && "outline-error-300",
          inputWrapperClassName
        )}
      >
        {prefix}
        <input
          ref={ref}
          id={inputId}
          className={cn(
            "grow px-4 py-2 bg-transparent border-2 border-transparent focus:outline-none",
            "disabled:text-grey-400 disabled:placeholder:text-grey-400",
            prefix && "pl-0",
            suffix && "pr-0",
            error && "text-error-300 placeholder:text-error-300",
            inputClassName
          )}
          onChange={handleChange}
          value={value}
          disabled={disabled}
          required={required}
          {...attributes}
        />
        {suffix}
      </div>
      {hintText && (
        <div
          className={cn(
            "text-grey-500 text-sm",
            error && "text-error-300",
            hintTextClassName
          )}
        >
          {hintText}
        </div>
      )}
    </div>
  );
};

const Input = forwardRef(InternalInput);

export default Input;
