import React, { ReactNode } from "react";
import { cn } from "@/lib/utils";
import BreadcrumbItem, { BreadcrumbItemProps } from "./BreadcrumbItem";

export interface BreadcrumbProps {
  /** `Breadcrumb.Item` with text and href */
  children: React.ReactNode;
  /** The character or component separating the breadcrumb items */
  separator?: string | React.ReactNode;
  /** CSS class name for styling the breadcrumb */
  className?: string;
}

const Breadcrumb: React.FC<BreadcrumbProps> & {
  Item: React.ComponentType<BreadcrumbItemProps>;
} = ({ children, separator = ">", className }) => {
  const rootClass = cn(`flex space-x-2 text-base`, className);
  const childrenRender = React.Children.map(children, (child, index) => (
    <>
      {child}
      {index < React.Children.count(children) - 1 && (
        <span className={``}>{separator}</span>
      )}
    </>
  ));

  return (
    <nav className={rootClass} aria-label="breadcrumb">
      {childrenRender}
    </nav>
  );
};

Breadcrumb.Item = BreadcrumbItem;

export default Breadcrumb;
