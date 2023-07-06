import { useEffect, FC, useState, ReactNode } from "react";
import { createPortal } from "react-dom";

/* Props for the Portal component.*/
interface PortalProps {
  /** The children to be rendered inside the Portal. */
  children: ReactNode;
  /**
   * If an element with this ID already exists in the DOM,it will be used as the root element.
   * Otherwise, a new element will be created with the ID.
   */
  rootId?: string;
}

const Portal: FC<PortalProps> = ({ children, rootId = "portal-root" }) => {
  const [targetRoot, setTargetRoot] = useState<HTMLElement | null>(null);
  useEffect(() => {
    const existingRoot = document.getElementById(rootId);
    let root: HTMLElement;
    if (existingRoot) {
      root = existingRoot;
    } else {
      root = document.createElement("div");
      root.id = rootId;
      document.body.appendChild(root);
    }
    setTargetRoot(root);

    return () => {
      if (!existingRoot) {
        document.body.removeChild(root);
      }
    };
  }, [rootId]);

  if (!targetRoot) return null;
  return createPortal(children, targetRoot);
};

export default Portal;
