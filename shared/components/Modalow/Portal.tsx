import { useEffect, forwardRef, FC } from "react";
import ReactDOM from "react-dom";

export interface PortalProps {
  children: React.ReactNode;
  customRootId?: string;
}

const Portal: FC<PortalProps> = (props) => {
  const { children, customRootId: rootId = "portal-root" } = props;
  let targetRoot: HTMLElement | null = null;
  if (document.getElementById(rootId)) {
    targetRoot = document.getElementById(rootId);
  } else {
    const newRoot = document.createElement("div");
    newRoot.id = "portal-root";
    document.body.appendChild(newRoot);
    targetRoot = newRoot;
  }
  useEffect(() => {
    return () => {
      targetRoot?.parentElement?.removeChild(targetRoot); // removed before react-portal will unmount
    };
  }, [targetRoot]);

  if (!targetRoot) return <>{children}</>;
  return ReactDOM.createPortal(children, targetRoot);
};

export default Portal;
