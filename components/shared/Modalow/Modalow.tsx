import React, {
  useState,
  useEffect,
  ForwardRefRenderFunction,
  forwardRef,
} from "react";
import { cn } from "@/lib/utils";
import Portal from "./Portal";
import styles from "./modal.module.css";
import Header from "./Header";
import Footer from "./Footer";
import Mask from "./Mask";
import Body from "./Body";

export enum ModalSizeVariant {
  small = "small",
  medium = "medium",
  large = "large",
  xLarge = "xLarge",
  extraLarge = "extraLarge",
}
export interface ModalProps {
  isOpen: boolean;
  size?: keyof typeof ModalSizeVariant;
  fullScreen?: boolean;
  title?: string;
  hideCloseIcon?: boolean;
  hasTitle?: boolean;
  hasMask?: boolean;
  maskClosable?: boolean;
  children: React.ReactNode;
  footer?: React.ReactNode;
  onClose: () => void;
}

const InternalModal: ForwardRefRenderFunction<HTMLDivElement, ModalProps> = (
  props,
  ref
) => {
  const {
    isOpen,
    size = "medium",
    fullScreen = false,
    title = "title",
    hideCloseIcon = false,
    hasTitle = true,
    hasMask = true,
    maskClosable = true,
    children,
    footer,
    onClose,
    ...restProps
  } = props;

  const [removeDOM, setRemoveDOM] = useState(!isOpen);

  useEffect(() => {
    if (isOpen) {
      setRemoveDOM(false);
    } else {
      setTimeout(() => {
        setRemoveDOM(true);
      }, 200);
    }
  }, [isOpen]);

  const sizeVariants: Record<ModalSizeVariant, string> = {
    small: "max-w-[320px]",
    medium: "max-w-[460px]",
    large: " max-w-[600px]",
    xLarge: "max-w-[960px]",
    extraLarge: "max-w-[1100px]",
  };

  const dialogContainerClassName = cn(
    "modal__container",
    fullScreen
      ? "fixed z-20 top-0 left-0"
      : "fixed z-20 top-1/2 left-1/2 transform -translate-x-1/2  -translate-y-1/2"
  );

  const dialogClassName = cn(
    "modal__container__dialog",
    "flex flex-col w-[90vw] drop-shadow-md",
    styles.modal__dialog, // manually style
    isOpen ? styles.showDialog : styles.hideDialog,
    fullScreen ? "w-screen h-screen" : sizeVariants[size]
  );

  return (
    <>
      {!removeDOM && (
        <Portal>
          <Mask
            data-testid="modal-mask"
            isOpen={isOpen}
            hasMask={hasMask}
            onClose={onClose}
            maskClosable={maskClosable}
          />
          <div
            className={dialogContainerClassName}
            data-testid="modal-container"
          >
            <div
              className={dialogClassName}
              ref={ref}
              {...restProps}
              data-testid="modal"
            >
              <Header
                title={title}
                hasTitle={hasTitle}
                onClose={onClose}
                hideCloseIcon={hideCloseIcon}
              />
              <Body>{children}</Body>
              <Footer footer={footer} />
            </div>
          </div>
        </Portal>
      )}
    </>
  );
};

export const Modalow = forwardRef<HTMLDivElement, ModalProps>(InternalModal);
export default Modalow;
