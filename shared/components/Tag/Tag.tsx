import { PropsWithChildren } from 'react';

type TagProps = { 
  color: string,
};

export const COLOR = {
  COLOR1: "bg-indigo-500",
  COLOR2: "bg-green-500",
};

const Tag = ({ children, color }: PropsWithChildren<TagProps>) => {
  return <span className={`inline-block box-border h-27 rounded px-2 text-white ${color}`}>{children}</span>;
}

export default Tag;