import React, { ForwardRefRenderFunction } from "react";
import { cn } from "@/lib/utils";
import styles from "./modal.module.css";

export interface MaskProps {
  isOpen: boolean;
  hasMask?: boolean;
  maskClosable?: boolean;
  onClose: () => void;
}

const InternalMask: ForwardRefRenderFunction<HTMLDivElement, MaskProps> = (
  props,
  ref
) => {
  const {
    isOpen,
    hasMask = true,
    maskClosable = true,
    onClose,
    ...restProps
  } = props;

  const maskClassName = cn(
    "modal__mask",
    isOpen ? styles.showMask : styles.hideMask,
    hasMask
      ? "fixed top-0 left-0 w-screen h-screen bg-black bg-opacity-60 z-10"
      : "fixed top-0 left-0 w-screen h-screen z-10"
  );

  return (
    <div
      ref={ref}
      className={maskClassName}
      onClick={maskClosable ? onClose : undefined}
      {...restProps}
    />
  );
};

export const Mask = React.forwardRef<HTMLDivElement, MaskProps>(InternalMask);
export default Mask;
