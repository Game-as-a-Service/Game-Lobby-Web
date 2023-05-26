import React, { ForwardRefRenderFunction } from "react";
import { cn } from "@/lib/utils";
import { CloseIcon } from "./Icon";

export interface HeaderProps {
  title: string;
  hasTitle?: boolean;
  hideCloseIcon?: boolean;
  onClose: () => void;
}

const InternalHeader: ForwardRefRenderFunction<HTMLDivElement, HeaderProps> = (
  props,
  ref
) => {
  const {
    title,
    onClose,
    hasTitle = false,
    hideCloseIcon = false,
    ...restProps
  } = props;
  const dialogHeaderClassName = cn(
    "modal__container__dialog__header",
    "px-8 py-3 flex justify-between items-center text-white"
  );

  return (
    <>
      {hasTitle && (
        <>
          <div className={dialogHeaderClassName} ref={ref} {...restProps}>
            {title}
            {!hideCloseIcon && (
              <div
                className="cursor-pointer h-3 w-3"
                onClick={onClose}
                data-testid="close-icon"
              >
                <CloseIcon />
              </div>
            )}
          </div>
          <hr className="border-black" />
        </>
      )}
    </>
  );
};

export const Header = React.forwardRef<HTMLDivElement, HeaderProps>(
  InternalHeader
);
export default Header;
