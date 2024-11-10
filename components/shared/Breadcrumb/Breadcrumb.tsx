import { Children } from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";
import Icon from "../Icon";

export interface BreadcrumbItemProps {
  /** The displayed text of the breadcrumb item */
  text: string;
  /** The href of the breadcrumb item */
  href?: string;
  /** A CSS class name for styling the breadcrumb item */
  className?: string;
}

export const BreadcrumbItem = ({
  text,
  href,
  className,
}: BreadcrumbItemProps) => {
  return href ? (
    <Link href={href} className={className}>
      {text}
    </Link>
  ) : (
    <span className={className}>{text}</span>
  );
};

export interface BreadcrumbProps {
  /** `Breadcrumb.Item` with text and href */
  children: React.ReactNode;
  /** The character or component separating the breadcrumb items */
  separator?: string | React.ReactNode;
  /** CSS class name for styling the breadcrumb */
  className?: string;
}

const defaultSeparator = <Icon name="NavArrowRight" className="w-4 h-4" />;

const Breadcrumb: React.FC<BreadcrumbProps> & {
  Item: React.ComponentType<BreadcrumbItemProps>;
} = ({ children, separator = defaultSeparator, className }) => {
  return (
    <nav
      className={cn(`flex items-center gap-2`, className)}
      aria-label="breadcrumb"
    >
      {Children.map(children, (child, index) => (
        <>
          {child}
          {index < Children.count(children) - 1 && <span>{separator}</span>}
        </>
      ))}
    </nav>
  );
};

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
