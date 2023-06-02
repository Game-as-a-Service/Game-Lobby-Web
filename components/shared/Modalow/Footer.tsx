import { ReactNode, ForwardRefRenderFunction, forwardRef } from "react";
import { cn } from "@/lib/utils";

export interface FooterProps {
  footer?: ReactNode;
}

const InternalFooter: ForwardRefRenderFunction<HTMLDivElement, FooterProps> = (
  props,
  ref
) => {
  const { footer, ...restProps } = props;
  const dialogFooterClassName = cn(
    "modal__container__dialog__footer",
    "flex px-8 py-3 justify-center w-full gap-2 flex-nowrap"
  );

  return (
    <>
      {footer && (
        <div
          className={dialogFooterClassName}
          ref={ref}
          {...restProps}
          data-testid="footer"
        >
          {footer}
        </div>
      )}
    </>
  );
};

export const Footer = forwardRef<HTMLDivElement, FooterProps>(InternalFooter);
export default Footer;
