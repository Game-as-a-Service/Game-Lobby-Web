import React, {
  useState,
  useEffect,
  ForwardRefRenderFunction,
  forwardRef,
  KeyboardEventHandler,
} from "react";
import { cn } from "@/lib/utils";
import Portal from "../Portal/Portal";
import BoxFancy from "../BoxFancy";
import { Button, ButtonSize } from "../Button/v2";
import Icon from "../Icon";

enum ModalSizeVariant {
  small = "small",
  medium = "medium",
}

const containerSizeMap: Record<ModalSizeVariant, string> = {
  small: "top-[180px]",
  medium: "top-[120px]",
};

const dialogSize: Record<ModalSizeVariant, string> = {
  small: "w-[398px]",
  medium: "w-[564px]",
};

export interface ModalProps {
  isOpen?: boolean;
  size?: keyof typeof ModalSizeVariant;
  title?: string;
  hideCloseIcon?: boolean;
  maskClosable?: boolean;
  children?: React.ReactNode;
  onClose?: () => void;
}

const InternalModal: ForwardRefRenderFunction<HTMLDivElement, ModalProps> = (
  props,
  ref
) => {
  const {
    isOpen,
    title,
    size = "medium",
    hideCloseIcon = false,
    maskClosable = true,
    children,
    onClose,
    ...restProps
  } = props;

  const [removeDOM, setRemoveDOM] = useState(!isOpen);

  const handleKeyUp: KeyboardEventHandler = (e) => {
    if (maskClosable && e.key === "Enter") {
      onClose?.();
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isOpen) {
      document.body.classList.add("overflow-y-hidden");
      setRemoveDOM(false);
    } else {
      timer = setTimeout(() => {
        setRemoveDOM(true);
      }, 200);
    }

    return () => {
      document.body.classList.remove("overflow-y-hidden");
      clearTimeout(timer);
    };
  }, [isOpen]);

  useEffect(() => {
    const handleWindowKeyUp = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose?.();
      }
    };
    window.addEventListener("keyup", handleWindowKeyUp);

    return () => window.removeEventListener("keyup", handleWindowKeyUp);
  }, [onClose]);

  return (
    !removeDOM && (
      <Portal>
        <button
          className={cn(
            "cursor-auto duration-200",
            "fixed top-0 left-0 w-screen h-screen bg-basic-black/60 z-10",
            isOpen ? "opacity-100" : "opacity-0"
          )}
          data-testid="modal-mask"
          tabIndex={maskClosable ? 0 : -1}
          onClick={maskClosable ? onClose : undefined}
          onKeyUp={handleKeyUp}
        />
        <div
          className={cn(
            "fixed z-20 left-1/2 -translate-x-1/2 duration-200",
            containerSizeMap[size],
            isOpen ? "opacity-100" : "opacity-0"
          )}
        >
          <BoxFancy
            ref={ref}
            component="dialog"
            className={cn(
              "px-10 py-12 flex flex-col gap-8",
              "text-primary-100 bg-primary-700/40 rounded-2xl drop-shadow-md",
              dialogSize[size]
            )}
            {...restProps}
          >
            <header className="text-[22px] text-center">{title}</header>
            <div>{children}</div>
          </BoxFancy>
          {!hideCloseIcon && (
            <Button
              variant="secondary"
              size={ButtonSize.Icon}
              className="absolute top-0 right-0 translate-x-1/2 -translate-y-1/2"
              data-testid="close-icon"
              aria-label={`close ${title} modal`}
              onClick={onClose}
            >
              <Icon name="X" className="w-6 h-6" />
            </Button>
          )}
        </div>
      </Portal>
    )
  );
};

const Modal = forwardRef<HTMLDivElement, ModalProps>(InternalModal);

export default Modal;
