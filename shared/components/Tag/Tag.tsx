import { PropsWithChildren } from "react"

export enum TagColor {
  INDIGO = "indigo",
  GREEN = "green",
  RED = "red",
}

export interface TagProps extends React.ComponentPropsWithoutRef<"span"> {
  /**
   * The color of Tag, defined in TagColor
   */
  color?: TagColor
}

const Tag = ({
  children,
  color: colorProps = TagColor.INDIGO,
}: PropsWithChildren<TagProps>) => {
  const color = `bg-${colorProps}-500`

  return (
    <span
      className={`inline-block box-border h-6 rounded px-2 text-white ${color}`}
    >
      {children}
    </span>
  )
}

export default Tag
