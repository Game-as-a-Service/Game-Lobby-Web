import { ReactNode, ForwardRefRenderFunction, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface BodyProps {
  children: ReactNode;
}
const InternalBody: ForwardRefRenderFunction<HTMLDivElement, BodyProps> = (
  props,
  ref
) => {
  const { children, ...restProps } = props;

  const dialogContentClassName = cn(
    "modal__container__dialog__content",
    "px-8 py-3 text-white"
  );

  return (
    <div className={dialogContentClassName} ref={ref} {...restProps}>
      {children}
    </div>
  );
};

export const Body = forwardRef<HTMLDivElement, BodyProps>(InternalBody);
export default Body;
