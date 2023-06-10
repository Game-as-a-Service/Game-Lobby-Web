export interface IconVariants {
  name: string;
  definition: {
    svg?: {
      viewBox?: string;
      width?: string | number;
      height?: string | number;
      fill?: string;
      xmlns?: string;
    };
    path?: {
      d?: string;
      fill?: string;
      fillRule?: "nonzero" | "evenodd" | "inherit";
      stroke?: string;
      strokeWidth?: string | number;
      strokeLinejoin?: "inherit" | "round" | "miter" | "bevel" | undefined;
      strokeLinecap?: "inherit" | "round" | "butt" | "square" | undefined;
      transform?: string;
    }[];
  };
}
