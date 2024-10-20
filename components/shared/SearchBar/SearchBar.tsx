import { ReactNode, useState } from "react";
import Icon from "@/components/shared/Icon/v3";

interface SearchBarProps {
  /** The placeholder text displayed in the search bar when it is empty */
  placeholder?: string;

  /** An optional React node that will be rendered on the left side of the input field */
  leftSlot?: ReactNode;

  /** An optional React node that will be rendered on the submit button */
  buttonSlot?: ReactNode;

  /**
   * Callback function triggered when the user submits the search.
   * @param value - The current input value of the search bar.
   */
  onSubmit?: (value: string) => void;
}

export const SearchBar = ({
  placeholder = "在此輸入今天想玩的遊戲",
  leftSlot,
  buttonSlot = (
    <Icon
      name="Search"
      className="stroke-primary-100 w-6 h-6 pointer-events-none"
    />
  ),
  onSubmit,
}: SearchBarProps) => {
  const [value, setValue] = useState("");

  return (
    <div className="p-px gradient-purple rounded-full max-w-lg w-full">
      <div className="body-bg rounded-full">
        <div className="relative flex p-1 bg-white/8 rounded-full w-full">
          {leftSlot}
          <input
            role="search"
            className="py-2.5 px-4 leading-normal rounded-full bg-white/8 flex-1 text-primary-200 focus-within:outline-0"
            placeholder={placeholder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
          />
          <button
            type="button"
            className="absolute right-3 p-2.5"
            onClick={() => onSubmit?.(value)}
          >
            {buttonSlot}
          </button>
        </div>
      </div>
    </div>
  );
};
