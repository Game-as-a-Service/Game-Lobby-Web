import { ReactNode, ReactPortal, useEffect, useState } from "react";
import { createPortal } from "react-dom";

export interface UseToast {
  (props: { Component: ReactNode }): ReactPortal;
}

export const useToast: UseToast = ({ Component }) => {
  const [toasts, setToasts] = useState<ReactNode[]>([]);

  useEffect(() => {}, []);

  return createPortal(
    <div
      className={
        "fixed left-1/2 -translate-x-1/2 bottom-[11px] flex justify-center z-[1400]"
      }
    >
      {Component}
    </div>,
    document.body
  );
};
