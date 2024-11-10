import Link from "next/link";

export interface BreadcrumbItemProps {
  /** The displayed text of the breadcrumb item */
  text: string;
  /** The href of the breadcrumb item */
  href?: string;
  /** A CSS class name for styling the breadcrumb item */
  className?: string;
}

const BreadcrumbItem = ({ text, href, className }: BreadcrumbItemProps) => {
  return href ? (
    <Link href={href} className={className}>
      {text}
    </Link>
  ) : (
    <span className={className}>{text}</span>
  );
};

export default BreadcrumbItem;
