import { cn } from "@/lib/utils";
import Link from "next/link";
import { useRouter } from "next/router";

export interface BreadcrumbItemProps {
  /** The displayed text of the breadcrumb item */
  text: string;
  /** The href of the breadcrumb item */
  href: string;
  /** A CSS class name for styling the breadcrumb item */
  className?: string;
}

const BreadcrumbItem = ({ text, href, className }: BreadcrumbItemProps) => {
  const router = useRouter();
  const isActive = href === router.pathname;
  const baseClass = `text-base`;
  const activeClass = !isActive && `hover:text-gray-500`;
  const itemClass = cn(baseClass, activeClass, className);

  return href ? (
    <Link href={href} className={itemClass}>
      {text}
    </Link>
  ) : (
    <span className={itemClass}>{text}</span>
  );
};

export default BreadcrumbItem;
