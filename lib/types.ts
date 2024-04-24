import React from "react";

type ComponentProp<C extends React.ElementType> = { component?: C };
type PropsToOmit<C extends React.ElementType, P> = keyof (ComponentProp<C> & P);

// to add polymorphic component prop to a component
export type PolymorphicComponentProp<
  C extends React.ElementType,
  Props = {},
> = React.PropsWithChildren<Props & ComponentProp<C>> &
  Omit<React.ComponentPropsWithoutRef<C>, PropsToOmit<C, Props>>;
// for ref prop in polymorphic component
export type PolymorphicRef<C extends React.ElementType> =
  React.ComponentPropsWithRef<C>["ref"];
